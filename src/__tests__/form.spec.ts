import { IFormFeedback, IGeneralFieldState, LifeCycleTypes, createForm, onFieldValidateStart, onFieldValueChange, onFormInitialValuesChange, onFormValuesChange } from "@formily/core";
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

// 没有值的字段会使用初始值合并
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

// 允许设置值为 null
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

// 允许设置表单值为 observable 对象
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
    //  - 表单在提交通过的时候会触发一系列的操作，比如：验证、提交等，这样订阅回调的次数可能就不仅仅累加 1 次了
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
    expect(form.getFieldState("aa", state => state.description)).toEqual("This is AA");
    expect(form.getFieldState("aa", state => state.title)).toEqual("AA");
    expect(form.getFieldState("aa", state => state.value)).toEqual("123");

    // 充值字段状态
    form.setFieldState("aa", fieldState);
    expect(form.getFieldState("aa", state => state.description)).toBeUndefined();
    expect(form.getFieldState("aa", state => state.title)).toBeUndefined();
    expect(form.getFieldState("aa", state => state.value)).toBeUndefined();

    // 隐藏字段
    form.setFieldState("aa", state => {
        state.display = "none";
    });
    expect(form.getFieldState("aa", state => state.visible)).toBeFalsy();

    const update = (value: number) => (state: IGeneralFieldState) => {
        state.value = value;
    };

    const update2 = (state: IGeneralFieldState) => {
        state.value = 123;
    }

    // 设置不存在的字段，得到的将是 undefined
    form.setFieldState("kk", update(321));
    form.setFieldState("oo", update2);

    expect(form.query("kk").take()).toBeUndefined();
    expect(form.query("oo").take()).toBeUndefined();

    // 添加字段后可以顺利拿到值
    const kk = attach(form.createField({ name: "kk" }));
    const oo = attach(form.createField({ name: "oo" }));

    expect(kk.value).toEqual(321);
    expect(oo.value).toEqual(123);

    // 将整个表单隐藏，字段下将拿不到值
    form.setState(state => {
        state.display = "none";
    });
    expect(kk.value).toBeUndefined();
    expect(oo.value).toBeUndefined();
});

// 表单验证
test('validate/valid/invalid/errors/warnings/successes/clearErrors/clearWarnings/clearSuccess/queryFeedbacks', async () => {
    const form = attach(createForm());
    const aa = attach(form.createField({
        name: "aa",
        required: true,
        validator(value) {
            switch (value) {
                case "123": return {
                    message: "success",
                    type: "success",
                };
                case "321": return {
                    message: "warning",
                    type: "warning",
                };
                case "111": return {
                    message: "error",
                    type: "error",
                };
            }
        }
    }));

    const bb = attach(form.createField({ name: "bb", required: true }));
    attach(form.createField({ name: "cc" }));

    try {
        await form.validate();
    } catch {}

    // 表单是否非法
    expect(form.invalid).toBeTruthy();

    // 表单是否合法
    expect(form.valid).toBeFalsy();

    // 获取错误对象
    const defaultError = [
        {
            address: "aa",
            code: "ValidateError",
            messages: ["The field value is required"],
            path: "aa",
            triggerType: "onInput",
            type: "error",
        },
        {
            address: "bb",
            code: "ValidateError",
            messages: ["The field value is required"],
            path: "bb",
            triggerType: "onInput",
            type: "error",
        },
    ];
    expect(form.errors).toEqual(defaultError);

    // 触发字段输入可以不用 await，但是需要同步到 feedback 就要触发验证，这是一个微任务
    aa.onInput("123");
    expect(aa.value).toEqual("123");
    expect(form.errors).toEqual(defaultError);

    await aa.onInput("123");
    expect(form.errors).toEqual(defaultError.filter(item => item.address === 'bb'));

    // 表单校验成功消息
    const defaultSuccess = [
        {
            address: "aa",
            code: "ValidateSuccess",
            messages: ["success"],
            path: "aa",
            triggerType: "onInput",
            type: "success"
        }
    ];
    expect(form.successes).toEqual(defaultSuccess);

    // 输入 321 会得到一个警告
    await aa.onInput("321");
    expect(form.errors).toEqual(defaultError.filter(item => item.address === 'bb'));

    const defaultWarning = [
        {
            address: "aa",
            code: "ValidateWarning",
            messages: ["warning"],
            path: "aa",
            triggerType: "onInput",
            type: "warning",
        },
    ];
    expect(form.warnings).toEqual(defaultWarning);

    // 输入 111 会得到一个错误
    await aa.onInput("111");
    expect(form.errors).toEqual([
        {
            address: "aa",
            code: "ValidateError",
            messages: ["error"],
            path: "aa",
            triggerType: "onInput",
            type: "error",
        },
        {
            address: "bb",
            code: "ValidateError",
            messages: ["The field value is required"],
            path: "bb",
            triggerType: "onInput",
            type: "error",
        },
    ]);

    // 输入后重新验证通过，但验证结果是空值，因为没有返回任何验证结果
    await aa.onInput('yes');
    await bb.onInput('yes');

    expect(form.invalid).toBeFalsy();
    expect(form.valid).toBeTruthy();
    expect(form.errors).toEqual([]);
    expect(form.successes).toEqual([]);
    expect(form.warnings).toEqual([]);

    // 重新输入空值再次验证
    await aa.onInput('');
    await  bb.onInput('');

    try {
        // 这时候触发验证非必要了，输入后会立即验证
        await form.validate();
    } catch {}

    expect(form.errors).toEqual(defaultError);

    // 清除字段 aa 的错误
    form.clearErrors("aa");
    expect(form.errors).toEqual(defaultError.filter(item => item.address === 'bb'));

    // 清除所有的错误
    form.clearErrors("*");
    expect(form.errors).toEqual([]);

    // 输入一个正确验证的值
    await aa.onInput("123");
    expect(form.errors).toEqual([]);
    expect(form.successes).toEqual(defaultSuccess);

    // 清除字段正确验证
    form.clearSuccesses("aa");
    expect(form.successes).toEqual([]);

    // 再输入一个警告的值
    await aa.onInput("321");
    expect(form.errors).toEqual([]);
    expect(form.successes).toEqual([]);
    expect(form.warnings).toEqual(defaultWarning);

    // 清除所有的警告
    form.clearWarnings("*");
    expect(form.errors).toEqual([]);
    expect(form.successes).toEqual([]);
    expect(form.warnings).toEqual([]);

    // 输入一个错误的值和一个正确的值，注意：字段 bb 要求必填，必填的值可以是空值
    await aa.onInput('123');
    await bb.onInput('');

    // 查询消息反馈
    expect(form.queryFeedbacks({ type: "error" }).length).toEqual(1);
    expect(form.queryFeedbacks({ type: "success" }).length).toEqual(1);
    expect(form.queryFeedbacks({ code: "ValidateError" }).length).toEqual(1);
    expect(form.queryFeedbacks({ code: "ValidateSuccess" }).length).toEqual(1);
    expect(form.queryFeedbacks({ code: "EffectError" }).length).toEqual(0);
    expect(form.queryFeedbacks({ code: "EffectSuccess" }).length).toEqual(0);
    expect(form.queryFeedbacks({ path: "aa" }).length).toEqual(1);
    expect(form.queryFeedbacks({ path: "bb" }).length).toEqual(1);
    expect(form.queryFeedbacks({ address: "aa" }).length).toEqual(1);
    expect(form.queryFeedbacks({ address: "bb" }).length).toEqual(1);

    // 重新设置字段值为空，并清除错误，正确，警告，不提供参数默认为 *
    aa.setValue('');
    bb.setValue('');
    form.clearErrors();
    form.clearSuccesses();
    form.clearWarnings();

    try {
        // 重新验证字段 aa，会拿到 1 个错误
        await form.validate("aa");
    } catch {}

    expect(form.queryFeedbacks({ type: "error" }).length).toEqual(1);

    try {
        // 重新验证所有字段，会拿到 2 个错误
        await form.validate("*");
    } catch {}
    
    expect(form.queryFeedbacks({ type: "error" }).length).toEqual(2);
});

// 表单模式
test("setPattern/pattern/editable/readOnly/disabled/readPretty", () => {
    // 创建一个禁止修改的表单并挂载，表单下创建的字段同样禁止修改
    const form = attach(createForm({ pattern: "disabled" }));
    const field = attach(form.createField({ name: "aa" }));

    expect(form.pattern).toEqual("disabled");
    expect(form.disabled).toBeTruthy();
    expect(field.pattern).toEqual("disabled");
    expect(field.disabled).toBeTruthy();

    // 修改表单模式为编辑只读，表单下的字段也同样编辑只读
    form.setPattern("readOnly");
    expect(form.pattern).toEqual("readOnly");
    expect(form.readOnly).toBeTruthy();
    expect(field.pattern).toEqual("readOnly");
    expect(field.readOnly).toBeTruthy();

    // 修改表单模式为展示只读，表单小的字段也同样展示只读
    form.setPattern("readPretty");
    expect(form.pattern).toEqual("readPretty");
    expect(form.readPretty).toBeTruthy();
    expect(field.pattern).toEqual("readPretty");
    expect(field.readPretty).toBeTruthy();

    // 创建一个不可编辑的表单并挂载，模式为：readPretty
    const form2 = attach(createForm({ editable: false }));
    expect(form2.pattern).toEqual("readPretty");
    expect(form2.readPretty).toBeTruthy();

    // 创建一个禁止修改的表单并挂载
    const form3 = attach(createForm({ disabled: true }));
    expect(form3.pattern).toEqual("disabled");
    expect(form3.disabled).toBeTruthy();

    // 创建一个编辑只读的表单并挂载
    const form4 = attach(createForm({ readOnly: true }));
    expect(form4.pattern).toEqual("readOnly");
    expect(form4.readOnly).toBeTruthy();

    // 创建一个展示只读的表单并挂载
    const form5 = attach(createForm({ readPretty: true }));
    expect(form5.pattern).toEqual("readPretty");
    expect(form5.readPretty).toBeTruthy();
});

// 表单展示状态
test('setDisplay/display/visible/hidden', () => {
    // 创建一个 UI 隐藏值存在的表单并挂载，表单展示状态也决定创建的字段展示状态
    const form = attach(createForm({ display: "hidden" }));
    const field = attach(form.createField({ name: "aa" }));

    expect(form.display).toEqual("hidden");
    expect(form.hidden).toBeTruthy();
    expect(field.display).toEqual("hidden");
    expect(field.hidden).toBeTruthy();

    // 展示表单可见
    form.setDisplay("visible");
    expect(form.display).toEqual("visible");
    expect(form.visible).toBeTruthy();
    expect(field.display).toEqual("visible");
    expect(field.visible).toBeTruthy();

    // 设置表单完全隐藏，这个时候无论是 visible 还是 hidden，都是 false
    form.setDisplay("none");
    expect(form.display).toEqual("none");
    expect(form.visible).toBeFalsy();
    expect(form.hidden).toBeFalsy();
    expect(field.display).toEqual("none");
    expect(field.visible).toBeFalsy();
    expect(field.hidden).toBeFalsy();

    // 创意一个仅 UI 隐藏的表单并挂载
    const form2 = attach(createForm({ hidden: true }));
    expect(form2.display).toEqual("hidden");
    expect(form2.hidden).toBeTruthy();
    expect(form2.visible).toBeFalsy();

    // 创建一个 visible 为 false 的表单，相当于 display: none
    const form3 = attach(createForm({ visible: false }));
    expect(form.display).toEqual("none");
    expect(form.visible).toBeFalsy();
});

// 表单提交
test("submit", async () => {
    const form = attach(createForm());
    const onSubmit = jest.fn();

    const field = attach(form.createField({ name: "aa", required: true }));
    const errors: IFormFeedback[] = [];

    try {
        await form.submit(onSubmit);
    } catch(e) {
        if (Array.isArray(e)) {
            e.forEach(item => errors.push(item));
        }
    }

    // 由于表单只监听了发起提交动作，由于当前表单没有通过验证，所以触发是 0 次
    expect(errors.length).toEqual(1);
    expect(onSubmit).toHaveBeenCalledTimes(0);

    // 输入值后重新提交
    field.onInput("123");
    await form.submit(onSubmit);
    expect(onSubmit).toHaveBeenCalledTimes(1);

    // 在提交的时候抛出一个错误，默认服务端抛出错误，但本地是正常验证和提交
    const error2: Partial<Record<string, Error>> = {};
    try {
        await form.submit(() => {
            throw new Error('xxx');
        });
    } catch (e) {
        if (e instanceof Error) {
            error2.form = e;
        }
    }

    expect(error2.form).not.toBeUndefined();
    expect(form.valid).toBeTruthy();
});

// 表单重置
test("reset", async () => {
    const form = attach(createForm<Partial<Record<"aa"|"bb", number|string>>>({
        initialValues: { aa: 123 },
        values: { bb: 123 }
    }));

    const field = attach(form.createField({ name: "aa", required: true }));
    const field2 = attach(form.createField({ name: "bb", required: true }));
    attach(form.createVoidField({ name: "cc" }));

    expect(field.value).toEqual(123);
    expect(field2.value).toEqual(123);
    expect(form.values.aa).toEqual(123);
    expect(form.values.bb).toEqual(123);

    // 字段重新赋值
    field.onInput('xxxxx');
    expect(form.values.aa).toEqual('xxxxx');

    try {
        // 重置表单
        await form.reset();
    } catch {}

    // 重置后表单也合法了，但实际上字段 bb 是 undefined
    expect(form.valid).toBeTruthy();
    expect(field.value).toEqual(123);
    expect(form.values.aa).toEqual(123);
    expect(field2.value).toBeUndefined();
    expect(form.values.bb).toBeUndefined();

    // 重新输入值
    field.onInput("aaa");
    field2.onInput("bbb");

    expect(form.valid).toBeTruthy();
    expect(field.value).toEqual("aaa");
    expect(field2.value).toEqual("bbb");
    expect(form.values.aa).toEqual("aaa");
    expect(form.values.bb).toEqual("bbb");

    try {
        // 重置表单所有字段并发起验证
        await form.reset("*", { validate: true });
    } catch {}

    // 因为字段 bb 重置后是 undefined
    expect(form.valid).toBeFalsy();
    expect(field.value).toEqual(123);
    expect(form.values.aa).toEqual(123);
    expect(field2.value).toBeUndefined();
    expect(form.values.bb).toBeUndefined();

    // 重新输入值，并在重置表单时，清空所有数据
    field.onInput("aaa");
    field2.onInput("bbb");

    try {
        await form.reset("*", { forceClear: true });
    } catch {}

    // 虽然所有字段都是 undefinned，但是重置后验证仍旧合法
    expect(form.valid).toBeTruthy();
    expect(field.value).toBeUndefined();
    expect(form.values.aa).toBeUndefined();
    expect(field2.value).toBeUndefined();
    expect(form.values.bb).toBeUndefined();

    // 重新输入值，并只强制重置字段 aa，因为 initialValuse 下的字段必须强制重置
    field.onInput("aaa");
    field2.onInput("bbb");

    try {
        await form.reset("aa", { forceClear: true });
    } catch {}

    expect(form.valid).toBeTruthy();
    expect(field.value).toBeUndefined();
    expect(form.values.aa).toBeUndefined();
    expect(field2.value).toEqual("bbb");
    expect(form.values.bb).toEqual("bbb");
});

// 测试表单在调试工具下的表现
test("devtools", () => {
    // @ts-ignore
    window['__FORMILY_DEV_TOOLS_HOOK__'] = {
        inject() {},
        unmount() {},
    };

    const form = attach(createForm());
    form.onUnmount();
});

// 重置数组字段
test('reset array field', async () => {
    const values = {
        array: [{ value: 123 }]
    };

    const form = attach(createForm({ values }));
    attach(form.createArrayField({ name: "array", required: true }));

    expect(form.values).toEqual(values);

    // 官方文档中用了强制清除，对于 values 来说，默认清除就够了
    await form.reset();
    expect(form.values).toEqual({ array: [] });
});

// 重置对象字段
test('reset object field', async () => {
    const values = {
        object: { value: 123 }
    };

    const form = attach(createForm({ values }));
    attach(form.createObjectField({ name: "object", required: true }));
    expect(form.values).toEqual(values);

    await form.reset();
    expect(form.values).toEqual({ object: {} });
});

// 创建字段前初始值合并表单值
test("initialValues merge values before create field", () => {
    // 挂载表单下创建并挂载一个数组字段
    const form = attach(createForm());
    const array_field = attach(form.createArrayField({ name: "array" }));

    // 设置数组字段值，然后再数组字段下添加一个普通字段
    const defaultField = [{ aa: "321" }];
    form.values.array = defaultField;

    // 创建的普通字段后添加的 initialValue 会被之前设置的 value 覆盖
    const arr_0_aa = attach(form.createField({
        basePath: "array.0",
        initialValue: "123",
        name: "aa",
    }));

    expect(array_field.value).toEqual(defaultField);
    expect(arr_0_aa.value).toEqual("321");

    // 即便后添加的值是通过 value 设置，仍旧不能覆盖最初设定的值
    defaultField.push({ aa: "456" });
    form.values.array = defaultField;

    const arr_1_aa = attach(form.createField({
        basePath: "array.1",
        name: "aa",
        value: "123",
    }));

    expect(array_field.value).toEqual(defaultField);
    expect(arr_0_aa.value).toEqual("321");
    expect(arr_1_aa.value).toEqual("456");
});

// 不能匹配的字段为空值
test("no patch with empty initialValues", () => {
    const form = attach(createForm({
        values: {
            array: [1, 2, 3],
        }
    }));

    const array = attach(form.createArrayField({ name: "array" }));
    expect(form.values).toEqual({ array: [1, 2, 3] });
    expect(array.value).toEqual([1, 2, 3]);

    // 没有匹配的字段没有值
    const field = attach(form.createObjectField({ name: "array.0.1" }));
    const field2 = attach(form.createField({ basePath: "array.0", name: "aa" }));
    expect(field.value).toBeUndefined();
    expect(field2.value).toBeUndefined();
});

// 创建字段后合并初始值
test("initialValues merge values after create field", () => {
    const form = attach(createForm());

    const aa = attach(form.createArrayField({ initialValue: "111", name: "aa" }));
    const array = attach(form.createArrayField({ name: "array" }));
    const arr_0_aa = attach(form.createField({ basePath: "array.0", initialValue: "123", name: "aa" }));

    const array_value = [{ aa: "321" }];
    form.values.aa = "222";
    form.values.array = array_value;

    // 创建表单前合并，前面设定的值将覆盖后面的值，创建表单后合并，后面设定的值覆盖前面的值
    expect(array.value).toEqual(array_value);
    expect(arr_0_aa.value).toEqual("321");
    expect(aa.value).toEqual("222");
});

// 删除表单中没有定义的值
test("remove property of form values with undefined value", () => {
    const form = attach(createForm<{ aa?: number }>());
    const field = attach(form.createField({ initialValue: 123, name: "aaa" }));

    expect(form.values).toEqual({ aaa: 123 });

    // 设置字段 display 表单会自动处理字段是否存在
    field.display = "none";
    expect(form.values.hasOwnProperty("aaa")).toBeFalsy();

    field.display = "visible";
    expect(form.values.hasOwnProperty("aaa")).toBeTruthy();

    // 设置字段值为 undefined 并不会将字段从表单中移出
    field.setValue(undefined);
    expect(form.values.hasOwnProperty("aaa")).toBeTruthy();
});

// 初始值为空数组
test("empty array initialValues", () => {
    const form = attach(createForm({
        initialValues: {
            aa: [0],
            bb: [''],
            cc: [],
            dd: [null],
            ee: [undefined]
        }
    }));

    attach(form.createArrayField({ name: "aa" }));
    attach(form.createArrayField({ name: "bb" }));
    attach(form.createArrayField({ name: "cc" }));
    attach(form.createArrayField({ name: "dd" }));
    attach(form.createArrayField({ name: "ee" }));

    expect(form.values.aa).toEqual([0]);
    expect(form.values.bb).toEqual(['']);
    expect(form.values.cc).toEqual([]);
    expect(form.values.dd).toEqual([null]);
    expect(form.values.ee).toEqual([undefined]);
});

// 表单生命周期触发回调
test("form lifecycle can be triggered after call form.setXXX", () => {
    const form = attach(createForm<Partial<Record<"aa"|"bb", number>>>({
        initialValues: { aa: 1 },
        values: { bb: 1 }
    }));

    const initialValuesTriggerNum = jest.fn();
    const valuesTriggerNum = jest.fn();

    form.setEffects(() => {
        // 监听初始值的变化
        onFormInitialValuesChange(initialValuesTriggerNum);

        // 监听表单值的变化
        onFormValuesChange(valuesTriggerNum);
    });

    expect(initialValuesTriggerNum).toHaveBeenCalledTimes(0);
    expect(valuesTriggerNum).toHaveBeenCalledTimes(0);

    // initialValues 会通过 applyValuesPatch 改变 values，导致 onFormValuesChange 多触发一次
    form.initialValues.aa = 2;
    form.values.bb = 2;

    expect(initialValuesTriggerNum).toHaveBeenCalledTimes(1);
    expect(valuesTriggerNum).toHaveBeenCalledTimes(2);

    form.setInitialValues({ aa: 3 });
    form.setValues({ bb: 3 });

    expect(initialValuesTriggerNum).toHaveBeenCalledTimes(2);
    expect(valuesTriggerNum).toHaveBeenCalledTimes(4);

    // 测试 form.setXXX 之后还能正常触发：https://github.com/alibaba/formily/issues/1675
    form.initialValues.aa = 4;
    form.values.bb = 4;

    expect(initialValuesTriggerNum).toHaveBeenCalledTimes(3);
    expect(valuesTriggerNum).toHaveBeenCalledTimes(6);
});

// 修改表单中的数组字段默认值
test("form values change with array field (default value)", async () => {
    const handler = jest.fn();
    const form = attach(createForm({
        effects() {
            onFormValuesChange(handler);
        },
    }));

    const array = attach(form.createArrayField({
        name: "array",
        initialValue: [{ hellow: "world" }]
    }));

    // 初始化回调 1 次，push 时回调 1 次
    await array.push({});
    expect(handler).toHaveBeenCalledTimes(2);
});

// 深度合并值
test("setValues deep merge", () => {
    const initialValues = {
        aa: {
            bb: 123,
            cc: 321,
            dd: [11, 22, 33],
        }
    };

    const form = attach(createForm({ initialValues }));
    expect(form.values).toEqual(initialValues);

    const update = {
        aa: {
            bb: "",
            cc: "",
            dd: [44, 55, 66]
        }
    };

    form.setValues(update);
    expect(form.values).toEqual(update);
});

// validator 中 throw new Error
test("exception validate", async () => {
    const form = attach(createForm());
    attach(form.createField({
        name: "aa",
        validator() {
            throw new Error("runtime error");
        }
    }));

    try {
        await form.validate()
    } catch {}

    expect(form.invalid).toBeTruthy();
    expect(form.validating).toBeFalsy();
});

// 可重复声明表单字段并覆盖字段值
test("designable form", () => {
    // 默认情况，表单字段重复声明，以初次设置的值为准
    const form = attach(createForm());

    attach(form.createField({ value: 123, name: "aa" }));
    attach(form.createField({ value: 321, name: "aa" }));
    attach(form.createField({ initialValue: 123, name: "bb" }));
    attach(form.createField({ initialValue: 321, name: "bb" }));

    expect(form.values.aa).toEqual(123);
    expect(form.initialValues.bb).toEqual(123);

    // 可以覆盖声明表单字段
    const form2 = attach(createForm({ designable: true }));

    attach(form2.createField({ value: 123, name: "aa" }));
    attach(form2.createField({ value: 321, name: "aa" }));
    attach(form2.createField({ initialValue: 123, name: "bb" }));
    attach(form2.createField({ initialValue: 321, name: "bb" }));

    expect(form2.values.aa).toEqual(321);
    expect(form2.initialValues.bb).toEqual(321);
});

// 跳过验证 display: none 的字段
test("validate will skip display none", async () => {
    const validateA = jest.fn();
    const validateB = jest.fn();

    const form = attach(createForm({
        effects: () => {
            onFieldValidateStart("aa", validateA);
            onFieldValidateStart("bb", validateB);
        }
    }));

    const validator = jest.fn();
    const aa = attach(form.createField({
        name: "aa",
        validator() {
            validator();
            return "error";
        }
    }));

    const bb = attach(form.createField({
        name: "bb",
        validator() {
            validator();
            return "error";
        }
    }));

    const defaultError = [
        {
            address: "aa",
            code: "ValidateError",
            messages: ["error"],
            path: "aa",
            triggerType: "onInput",
            type: "error",
        },
        {
            address: "bb",
            code: "ValidateError",
            messages: ["error"],
            path: "bb",
            triggerType: "onInput",
            type: "error",
        },
    ];

    try {
        await form.validate();
    } catch (e) {
        expect(e).toEqual(defaultError);
    }

    expect(validateA).toHaveBeenCalledTimes(1);
    expect(validateB).toHaveBeenCalledTimes(1);
    expect(aa.invalid).toBeTruthy();
    expect(bb.invalid).toBeTruthy();
    expect(validator).toHaveBeenCalledTimes(2);

    // 隐藏字段 aa 后重新验证
    aa.display = "none";
    try {
        await form.validate()
    } catch(e) {
        expect(e).toEqual(defaultError.filter(item => item.address === "bb"));
    }

    expect(validateA).toHaveBeenCalledTimes(1);
    expect(validateB).toHaveBeenCalledTimes(2);
    expect(aa.invalid).toBeFalsy();
    expect(bb.invalid).toBeTruthy();
    expect(validator).toHaveBeenCalledTimes(3);

    // 隐藏字段 bb 后重新验证
    bb.display = "none";
    await form.validate();

    expect(validateA).toHaveBeenCalledTimes(1);
    expect(validateB).toHaveBeenCalledTimes(2);
    expect(aa.invalid).toBeFalsy();
    expect(bb.invalid).toBeFalsy();
    expect(validator).toHaveBeenCalledTimes(3);
});

// 跳过验证已卸载，事实证明卸载字段不会被跳过，一定要回收字段
test("validate will skip unmounted", async () => {
    const validateA = jest.fn();
    const validateB = jest.fn();
    const form = attach(createForm({
        effects: () => {
            onFieldValidateStart("aa", validateA);
            onFieldValidateStart("bb", validateB);
        }
    }));

    const validator = jest.fn();
    const aa = attach(form.createField({
        name: "aa",
        validator() {
            validator();
            return "error";
        }
    }));

    const bb = attach(form.createField({
        name: "bb",
        validator() {
            validator();
            return "error";
        }
    }));

    const defaultError = [
        {
            address: "aa",
            code: "ValidateError",
            messages: ["error"],
            path: "aa",
            triggerType: "onInput",
            type: "error"
        },
        {
            address: "bb",
            code: "ValidateError",
            messages: ["error"],
            path: "bb",
            triggerType: "onInput",
            type: "error"
        },
    ];

    try {
        await form.validate();
    } catch(e) {
        expect(e).toEqual(defaultError);
    }

    expect(validateA).toHaveBeenCalledTimes(1);
    expect(validateB).toHaveBeenCalledTimes(1);
    expect(aa.invalid).toBeTruthy();
    expect(bb.invalid).toBeTruthy();
    expect(validator).toHaveBeenCalledTimes(2);

    // 卸载字段 aa 并不能跳过验证
    aa.onUnmount();
    try {
        await form.validate();
    } catch (e) {
        expect(e).toEqual(defaultError);
    }

    expect(validateA).toHaveBeenCalledTimes(2);
    expect(validateB).toHaveBeenCalledTimes(2);
    expect(aa.invalid).toBeTruthy();
    expect(bb.invalid).toBeTruthy();
    expect(validator).toHaveBeenCalledTimes(4);

    // 回收字段可以跳过
    form.clearFormGraph("*(aa,bb)");
    await form.validate();

    expect(validateA).toHaveBeenCalledTimes(2);
    expect(validateB).toHaveBeenCalledTimes(2);
    expect(aa.invalid).toBeFalsy();
    expect(bb.invalid).toBeFalsy();
    expect(validator).toHaveBeenCalledTimes(4);
});

// 跳过验证不可编辑的字段
test("validate will skip uneditable", async () => {
    const validateA = jest.fn();
    const validateB = jest.fn();
    const form = attach(createForm({
        effects: () => {
            onFieldValidateStart("aa", validateA);
            onFieldValidateStart("bb", validateB);
        }
    }));

    const validator = jest.fn();
    const aa = attach(form.createField({
        name: "aa",
        validator() {
            validator();
            return "error";
        }
    }));

    const bb = attach(form.createField({
        name: "bb",
        validator() {
            validator();
            return "error";
        }
    }));

    const defaultError = [
        {
            address: "aa",
            code: "ValidateError",
            messages: ["error"],
            path: "aa",
            triggerType: "onInput",
            type: "error"
        },
        {
            address: "bb",
            code: "ValidateError",
            messages: ["error"],
            path: "bb",
            triggerType: "onInput",
            type: "error"
        },
    ];

    try {
        await form.validate();
    } catch(e) {
        expect(e).toEqual(defaultError);
    }

    expect(validateA).toHaveBeenCalledTimes(1);
    expect(validateB).toHaveBeenCalledTimes(1);
    expect(aa.invalid).toBeTruthy();
    expect(bb.invalid).toBeTruthy();
    expect(validator).toHaveBeenCalledTimes(2);

    aa.editable = false;
    try {
        await form.validate();
    } catch (e) {
        expect(e).toEqual(defaultError.filter(item => item.address === 'bb'));
    }

    expect(validateA).toHaveBeenCalledTimes(1);
    expect(validateB).toHaveBeenCalledTimes(2);
    expect(aa.invalid).toBeFalsy();
    expect(bb.invalid).toBeTruthy();
    expect(validator).toHaveBeenCalledTimes(3);

    bb.editable = false;
    await form.validate();

    expect(validateA).toHaveBeenCalledTimes(1);
    expect(validateB).toHaveBeenCalledTimes(2);
    expect(aa.invalid).toBeFalsy();
    expect(bb.invalid).toBeFalsy();
    expect(validator).toHaveBeenCalledTimes(3);
});

// 带有格式的验证命令
test("validator order with format", async () => {
    const form = attach(createForm());
    attach(form.createField({
        name: "aa",
        required: true,
        validator: {
            format: "url",
            message: "custom",
        }
    }));

    attach(form.createField({
        name: "bb",
        required: true,
        validator: (value) => {
            return (value === '111' || !value) ? '' : 'custom'
        }
    }));

    const results: IFormFeedback[] = [];
    await form.submit().catch(e => {
        Array.isArray(e) && e.forEach(item => results.push(item))
    });

    expect(results.map(({ messages }) => messages)).toEqual([
        ['The field value is required'],
        ['The field value is required'],
    ]);
});

// 卸载表单不会影响字段值
test("form unmount can not effect field values", () => {
    const form = attach(createForm({
        values: { aa: "123" }
    }));

    attach(form.createField({ name: "aa" }));
    expect(form.values.aa).toEqual("123");

    form.onMount();
    expect(form.values.aa).toEqual("123");
});

// 回收字段会清除字段值
test("form clearFormGrah need clear field values", () => {
    const form = attach(createForm({
        values: { aa: "123" }
    }));

    attach(form.createField({ name: "aa" }));
    expect(form.values.aa).toEqual("123");

    form.clearFormGraph("*");
    expect(form.values.aa).toBeUndefined();
});

// 回收字段不清除字段值
test("form clearFormGrah not clear field values", () => {
    const form = attach(createForm({
        values: { aa: "123" }
    }));

    attach(form.createField({ name: "aa" }));
    expect(form.values.aa).toEqual("123");

    form.clearFormGraph("*", false);
    expect(form.values.aa).toEqual("123");
});

// 表单自动回收不可见的字段值
test("form values auto clean with visible false", () => {
    const form = attach(createForm({
        initialValues: {
            aa: "123", bb: "321", cc: "cc"
        }
    }));

    attach(form.createField({ name: "aa" }));
    attach(form.createField({ name: "cc" }));
    attach(form.createField({ 
        name: "bb",
        reactions: field => {
            field.visible = form.values.aa === "1223";
        } 
    }));

    expect(form.values).toEqual({
        aa: "123",
        cc: "cc"
    });
});

// 通过异步设置初始值，自动隐藏表单不可见的字段值
test("form values auto clear with visible false in async setInitialValues", () => {
    const form = attach(createForm());
    
    attach(form.createField({ name: "aa" }));
    attach(form.createField({ name: "cc" }));
    attach(form.createField({ 
        name: "bb",
        reactions: field => {
            field.visible = form.values.aa === "1223";
        }
    }));

    form.setInitialValues({
        aa: "123", bb: "321", cc: "cc"
    });
    expect(form.values).toEqual({ aa: "123", cc: "cc" });
});

// 表单值不会因为 setValues 改变
test("form values ref should not change with setValues", () => {
    const form = attach(createForm({
        values: { aa: "123" }
    }));

    // ① setValue 是无效的
    const values = form.values;
    form.setValues({ bb: "321" });

    expect(form.values === values).toBeTruthy();

    // ② 但是赋值是有效的
    const update = { aa: "321", bb: "456" };
    form.values = update;

    expect(form.values).toEqual(update);

    // ③ 再次 setValue，结果还是一样，无效
    form.setValues({ cc: "555" });
    expect(form.values).toEqual(update);

    // ④ 除非先创建一个字段
    attach(form.createField({ name: "cc" }));
    form.setValues({ cc: "555" });

    expect(form.values).toEqual({ aa: "321", bb: "456", cc: "555" });
});

// 表单初始值不会因为 setInitialValues 改变
test("form initial values ref should not changed with setInitialValues", () => {
    const form = attach(createForm({ 
        initialValues: { aa: "123" } 
    }));

    // ① setInitialValues 是无效的
    const values = form.initialValues;
    form.setInitialValues({ bb: "321" });

    expect(form.initialValues === values).toBeTruthy();

    // ② 但是赋值是有效的
    const update = { aa: "321", bb: "456" };
    form.initialValues = update;

    expect(form.initialValues).toEqual(update);

    // ③ 再次 setInitialValues，结果还是一样，无效
    form.setInitialValues({ cc: "555" });
    expect(form.initialValues).toEqual(update);

    // ④ 除非先创建一个字段
    attach(form.createField({ name: "cc" }));
    form.setInitialValues({ cc: "555" });

    expect(form.initialValues).toEqual({ aa: "321", bb: "456", cc: "555" });
});

// 表单字段设为 undefined 不会报错，会被表单忽略（这种情况是不被类型允许的）
test("form query undefined query should not throw error", () => {
    const form = attach(createForm());

    // @ts-ignore
    form.fields['a'] = undefined;

    expect(() => form.query("*").take()).not.toThrow();
    expect(Object.keys(form.fields)).toEqual([]);

});