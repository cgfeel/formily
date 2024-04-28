import { LifeCycleTypes, createForm, onFieldValueChange } from "@formily/core";
import { batch, observable } from "@formily/reactive";
import { attach, sleep } from "./shared";

// 创建 form 对象并挂载
test('create form', () => {
    const form = attach(createForm());

    // form 对象不是 undefined
    expect(form).not.toBeUndefined();
});

// 测试创建字段
test('createField/createArrayField/createObjectField/createVoidField', () => {
    const form = attach(createForm());

    // 创建一个普通的字段并挂载
    const normal_ = attach(form.createField({ basePath: "parent", name: "normal" }));

    // 重复创建挂载一个字段名一样的普通字段
    const normal2_ = attach(form.createField({ basePath: "parent", name: "normal" }));

    // 创建一个数组字段并挂载
    const array_ = attach(form.createArrayField({ basePath: "parent", name: "array" }));

    // 重复创建挂载一个数组字段
    const array2_ = attach(form.createArrayField({ basePath: "parent", name: "array" }));

    // 创建一个对象字段并挂载
    const object_ = attach(form.createObjectField({ basePath: "parent", name: "object" }));

    // 重复创建挂载一个对象字段
    const object2_ = attach(form.createObjectField({ basePath: "parent", name: "object" }));

    // 创建一个虚拟字段并挂载
    const void_ = attach(form.createVoidField({ basePath: "parent", name: "void" }));

    // 重复创建挂载一个虚拟字段
    const void2_ = attach(form.createVoidField({ basePath: "parent", name: "void" }));

    // 在虚拟节点下创建并挂载一个普通字段
    const children_ = attach(form.createField({ basePath: "parent.void", name: "children" }));

    // 确认创建的字段不是 undefined
    expect(normal_).not.toBeUndefined();
    expect(array_).not.toBeUndefined();
    expect(object_).not.toBeUndefined();
    expect(void_).not.toBeUndefined();

    // 检查创建字段的 address 和 path
    expect(normal_.address.toString()).toEqual("parent.normal");
    expect(normal_.path.toString()).toEqual("parent.normal");
    expect(array_.address.toString()).toEqual("parent.array");
    expect(array_.path.toString()).toEqual("parent.array");
    expect(object_.address.toString()).toEqual("parent.object");
    expect(object_.path.toString()).toEqual("parent.object");
    expect(void_.address.toString()).toEqual("parent.void");
    expect(void_.path.toString()).toEqual("parent.void");

    // 虚拟节点下的字段 address 是完整的，path 不记录虚拟节点名
    expect(children_.address.toString()).toEqual("parent.void.children");
    expect(children_.path.toString()).toEqual("parent.children");

    // 字段名如果为空将不能创建字段，返回 undefined
    expect(form.createField({ name: "" })).toBeUndefined();
    expect(form.createArrayField({ name: "" })).toBeUndefined();
    expect(form.createObjectField({ name: "" })).toBeUndefined();
    expect(form.createVoidField({ name: "" })).toBeUndefined();

    // 对于不同的对象，但他们字段相同，返回的对象也完全相同
    expect(normal_ === normal2_).toBeTruthy();
    expect(array_ === array2_).toBeTruthy();
    expect(object_ === object2_).toBeTruthy();
    expect(void_ === void2_).toBeTruthy();
});

// 测试设置值、设置初始值，`setInitialValues` 可以覆盖 `value`，而 `setValues` 也可以覆盖 `initialVlaues`
test("setValues/setInitialValues", () => {
    const form = attach(createForm());
    form.setValues({
        aa: 123,
        cc: { kk: 321 }
    });

    // 添加 2 个字段并设置初始值
    const field = attach(form.createField({ initialValue: "ooo", name: "cc.mm" }));
    const field2 = attach(form.createField({ initialValue: "www", name: "cc.pp" }));

    // 验证表单的值
    expect(form.values.aa).toEqual(123);
    expect(form.values.cc.kk).toEqual(321);

    // 验证表单初始值，没有设置值的情况下，初始值也是表单值
    expect(form.values.cc.mm).toEqual("ooo");
    expect(form.initialValues.cc.mm).toEqual("ooo");
    expect(form.values.cc.pp).toEqual("www");
    expect(form.initialValues.cc.pp).toEqual("www");

    // 验证表单值
    expect(field.value).toEqual("ooo");
    expect(field2.value).toEqual("www");

    // 设置表单初始值，添加的值会深度合并
    form.setInitialValues({
        bb: "123",
        cc: {
            dd: "xxx",
            pp: "www2",
        }
    });

    // 之前定义的字段没有修改值也不变，其中 cc.kk 是之前设置的值，不会收到后续初始值修改而覆盖值
    expect(form.values.aa).toEqual(123);
    expect(form.values.cc.kk).toEqual(321);

    // 之前设置的初始值
    expect(form.values.cc.mm).toEqual("ooo");
    expect(form.initialValues.cc.mm).toEqual("ooo");
    expect(field.value).toEqual("ooo");

    // 之后添加新的初始值
    expect(form.values.bb).toEqual("123");
    expect(form.values.cc.dd).toEqual("xxx");
    expect(form.initialValues.bb).toEqual("123");
    expect(form.initialValues.cc.dd).toEqual("xxx");

    // 没有设置 cc.kk 初始值
    expect(form.initialValues.cc.kk).toBeUndefined();

    // 之后添加的初始值覆盖之前的初始值，即便是之前已获取到的 field2 也会更新值，因为他们引用对象是一个
    expect(form.values.cc.pp).toEqual("www2");
    expect(form.initialValues.cc.pp).toEqual("www2");
    expect(field2.value).toEqual("www2");

    // 重置覆盖初始值
    form.setInitialValues({}, 'overwrite');
    expect(form.initialValues?.cc?.pp).toBeUndefined();

    // 重置覆盖值
    form.setValues({}, 'overwrite');
    expect(form.values.aa).toBeUndefined();

    // 深度合并初始值
    form.setInitialValues({ aa: { bb: [{ cc: 123 }] } }, "deepMerge");
    expect(form.values).toEqual({ aa: { bb: [{ cc: 123 }] } });

    // 深度合并表单值，将得到 value + initialValue
    form.setValues({ bb: { bb: [{ cc: 123 }] } }, "deepMerge");
    expect(form.values).toEqual({
        aa: { bb: [{ cc: 123 }] },
        bb: { bb: [{ cc: 123 }] }
    });

    // 浅合并初始值，直接覆盖第一层初始值
    form.setInitialValues({ aa: [123] }, 'shallowMerge');
    expect(form.values).toEqual({
        aa: [123],
        bb: { bb: [{ cc: 123 }] }
    });

    // 浅合并表单值
    form.setValues({ bb: [123] }, "shallowMerge");
    expect(form.values).toEqual({
        aa: [123],
        bb: [123]
    });
});

// 不能覆盖初始值的字段，
test('no field initialValues merge', () => {
    const form = attach(createForm<{ aa: string, bb?: string }>({ 
        values: { aa: '123' }, 
        initialValues: { aa: "333", bb: "321" } 
    }));
    expect(form.values).toEqual({ aa: "123", bb: "321" });
});

// 设置表单加载状态
test("setLoading", async () => {
    // 初始挂载的表单，加载状态是 false 的
    const form = attach(createForm());
    expect(form.loading).toBeFalsy();

    // 设置加载状态将作为微任务处理，不会立即得到 true
    form.setLoading(true);
    expect(form.loading).toBeFalsy();

    // 阻塞 100 毫秒之后可以正常获取表单状态
    await sleep(100);
    expect(form.loading).toBeTruthy();
});

// 设置值为 null
test("setValues with null", () => {
    const form = attach(createForm());
    const data = {
        "object-1": { "array-1": null },
        "object-2": { "array-2": null }
    };

    form.setInitialValues(data);
    form.setValues(data);


    expect(form.values).toEqual(data);
});

// 响应式表单值
test("observable values/initialValues", () => {
    const values = observable<Record<string, number>>({ aa: 123, bb: 321 });
    const initialValues = observable({ cc: 321, dd: 456 });

    const form = attach(createForm<Record<string, number>>({ initialValues, values }));
    batch(() => {
        values.kk = 321;
    });

    expect(form.values.kk).toEqual(321);
});

// 删除表单值，删除初始值
test('deleteValuesIn/deleteInitialValuesIn', () => {
    const form = attach(createForm<Record<string, number>>({
        initialValues: { aa: 123 },
        values: { bb: 123 }
    }));

    expect(form.initialValues.aa).toEqual(123);
    expect(form.values.bb).toEqual(123);

    // 删除初始值和表单值
    form.deleteInitialValuesIn("aa");
    form.deleteValuesIn("bb");

    expect(form.existInitialValuesIn("aa")).toBeFalsy();
    expect(form.existValuesIn("bb")).toBeFalsy();
});

// 表单提交、验证
test("setSubmitting/setValidating",  async () => {
    const form = attach(createForm());

    // 设置表单提交状态将挂起一个微任务，不会立即修改表单状态
    form.setSubmitting(true);
    expect(form.submitting).toBeFalsy();

    // 阻塞后重新获取状态
    await sleep();
    expect(form.submitting).toBeTruthy();
    
    // 取消表单提交状态则会立即执行
    form.setSubmitting(false);
    expect(form.submitting).toBeFalsy();

    // 设置表单验证状态将挂起一个微任务，不会立即修改表单状态
    form.setValidating(true);
    expect(form.validating).toBeFalsy();

    // 阻塞后重新获取状态
    await sleep();
    expect(form.validating).toBeTruthy();

    // 取消表单验证状态会立即执行
    form.setValidating(false);
    expect(form.validating).toBeFalsy();
});

// 添加、删除、覆盖式更新副作用
test("addEffects/removeEffects/setEffects", () => {
    const form = attach(createForm());

    // 设置两个测试函数
    const valueChange = jest.fn();
    const valueChange2 = jest.fn();

    form.addEffects('e1', () => {
        onFieldValueChange('aa', valueChange);
    });

    // 如果需要监听字段初始化也出发回调，可以使用 `onFieldChange`
    const field = attach(form.createField({ name: "aa" }));
    field.setValue("123");

    // 由于只监听了 `onFieldValueChange`，所以字段初始化时不会调用 `valueChange`
    expect(valueChange).toHaveBeenCalledTimes(1);

    // 删掉副作用后再修改值，将不会再响应回调
    form.removeEffects('e1');
    field.setValue('321');

    expect(valueChange).toHaveBeenCalledTimes(1);

    // 再次添加副作用
    form.addEffects('e2', () => {
        onFieldValueChange('aa', valueChange);
    });

    // 再次修改值，回调次数会重新累加
    field.setValue('456');
    expect(valueChange).toHaveBeenCalledTimes(2);

    // 覆盖式更新副作用，不会影响之前已添加的副作用
    form.setEffects(() => {
        onFieldValueChange('aa', valueChange2);
    });

    field.setValue("555");
    expect(valueChange).toHaveBeenCalledTimes(3);
    expect(valueChange2).toHaveBeenCalledTimes(1);
});

// 字段查询
test("query", () => {
    const form = attach(createForm());

    // 先添加一个对象字段并挂载
    attach(form.createObjectField({ name: "object" }));

    // 在对象字段下面添加一个虚拟字段并挂载
    attach(form.createVoidField({ basePath: "object", name: "void" }));

    // 在对象字段下的虚拟字段下添加一个普通字段并挂载
    attach(form.createField({ basePath: "object.void", name: "normal" }));

    // 在顶层节点添加一个数组字段并挂载
    attach(form.createArrayField({ name: "array" }));

    // 通过路径获取字段都可以拿到对象
    expect(form.query("object").take()).not.toBeUndefined();
    expect(form.query("object.void").take()).not.toBeUndefined();
    expect(form.query("object.void.normal").take()).not.toBeUndefined();
    expect(form.query("array").take()).not.toBeUndefined();

    // 虚拟节点可以跳过字段名称获取路径
    expect(form.query("object.normal")).not.toBeUndefined();

    // 遍历对象字段下所有字段路径
    expect(form.query("object.*").map(field => field.path.toString())).toEqual([
        "object.void",
        "object.normal"
    ]);

    // 遍历所有字段
    expect(form.query("*").map(field => field.path.toString())).toEqual([
        "object",
        "object.void",
        "object.normal",
        "array"
    ]);

    // 获取一个匹配路径可以正确拿到字段
    expect(form.query("*").take()).not.toBeUndefined();

    // 匹配一个不存在的路径 (分组匹配) 只能拿到 undefined，遍历也只能拿到空数组
    expect(form.query("*(oo)").take()).toBeUndefined();
    expect(form.query("*(oo)").map()).toEqual([]);

    // 获取初始化后虚拟字段的值、初始值、输入值都是 undefined
    expect(form.query("object.void").get("value")).toBeUndefined();
    expect(form.query("object.void").get("initialValue")).toBeUndefined();
    expect(form.query("object.void").get("inputValue")).toBeUndefined();

    // 获取初始化后数组字段的值是空数组，初始值是 undefined，输入值是 null
    expect(form.query("array").get("value")).toEqual([]);
    expect(form.query("array").get("initialValue")).toBeUndefined();
    expect(form.query("array").get("inputValue")).toBeNull();

    // 分别设置数组字段的值、初始值、输入值
    form.setFieldState("array", state => {
        state.initialValue = [111];
        state.inputValue = [111];
        state.value = [111];
    });
    expect(form.query("array").get("value")).toEqual([111]);
    expect(form.query("array").get("initialValue")).toEqual([111]);
    expect(form.query("array").get("inputValue")).toEqual([111]);

    // 从查询结果集中找到第一个结果，并读取其属性
    expect(form.query("array").getIn("inputValue")).toEqual([111]);

    // 获取一个不存在的字段值、初始值、输入值，拿到的都是 undefined
    expect(form.query("opo").get("value")).toBeUndefined();
    expect(form.query("opo").get("initialValue")).toBeUndefined();
    expect(form.query("opo").get("inputValue")).toBeUndefined();
    expect(form.query("opo").getIn("inputValue")).toBeUndefined();
});

// 通知、订阅、取消订阅
test("notify/subscribe/unsubscribe", () => {
    const form = attach(createForm());
    const subscribe = jest.fn();

    // 创建一个订阅，并不会触发回调
    const id = form.subscribe(subscribe);
    expect(subscribe).toHaveBeenCalledTimes(0);

    // 设置初始值会触发 2 次订阅，初始化一次，赋值一次
    form.setInitialValues({ aa: 123 });
    expect(subscribe).toHaveBeenCalledTimes(2);
    expect(form.values).toEqual({ aa: 123 });

    // 发布广播，这里广播 `ON_FORM_SUBMIT`，而不是调用 `form.submit` 是因为：
    //  - 表单在提交的时候会触发一系列的操作，比如：验证、提交等，这样订阅回调的次数可能就不仅仅累加 1 次了
    //  - 而广播 `ON_FORM_SUBMIT` 只会触发一次订阅
    form.notify(LifeCycleTypes.ON_FORM_SUBMIT);
    expect(subscribe).toHaveBeenCalledTimes(3);

    // 取消订阅之后，每次广播将不再触发回调
    form.unsubscribe(id);
    form.notify(LifeCycleTypes.ON_FORM_SUBMIT);
    expect(subscribe).toHaveBeenCalledTimes(3);
});

// 设置表单状态、获取表单状态、设置字段状态、获取字段状态
test("setState/getState/setFormState/getFormState/setFieldState/getFieldState", () => {
    const form = attach(createForm());

    // 先记录挂载后的表单初始状态
    // 其中 `setFormState` 和 `setState` 是一样的，`getFormState` 和 `getState` 是一样的
    const state = form.getState();

    // 设置表单值，并禁止修改
    form.setState(state => {
        state.pattern = "disabled";
        state.values = { aa: 123 };
    });
    expect(form.pattern).toEqual("disabled");
    expect(form.disabled).toBeTruthy();
    expect(form.values.aa).toEqual(123);

    // 重置表单状态后重新检查
    form.setState(state);
    expect(form.pattern).toEqual("editable");
    expect(form.disabled).toBeFalsy();
    expect(form.values.aa).toBeUndefined();

    // 重新设置表单值，并只读
    form.setFormState(state => {
        state.pattern = "readOnly";
        state.values = { bb: 321 };
    });
    expect(form.pattern).toEqual("readOnly");
    expect(form.disabled).toBeFalsy();
    expect(form.readOnly).toBeTruthy();
    expect(form.values.aa).toBeUndefined();
    expect(form.values.bb).toEqual(321);

    // 重置表单状态后重新检查
    form.setState(state);
    expect(form.pattern).toEqual("editable");
    expect(form.disabled).toBeFalsy();
    expect(form.readOnly).toBeFalsy();
    expect(form.values.aa).toBeUndefined();
    expect(form.values.bb).toBeUndefined();

    // 创建并挂载字段后获取字段初始状态
    attach(form.createField({ name: "aa" }));
    const fieldState = form.getFieldState("aa");

    // 设置字段状态
    form.setFieldState("aa", state => {
        state.description = "This is AA";
        state.title = "AA";
        state.value = "123";
    });
    
});