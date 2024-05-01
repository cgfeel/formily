import { createForm } from "@formily/core";
import { FC } from "react";
import { attach, sleep } from "./shared";

const Component: FC = () => null;

// 创建字段
test("create field", () => {
    const form = attach(createForm());
    const field = attach(form.createField({ name: "normal" }));

    expect(field).not.toBeUndefined();
});

// 创建带有属性的字段
test("create field props", () => {
    const form = attach(createForm());
    const field1 = attach(form.createField({
        description: "This is Field 1",
        name: "field1",
        required: true,
        title: "Field 1",
    }));

    // 不能直接获取 field1.name，只能通过 `address` 或 `path`
    // 区别见 form.spec.ts 中 query 部分
    expect(field1.address.toString()).toEqual("field1");
    expect(field1.description).toEqual("This is Field 1");
    expect(field1.required).toBeTruthy();
    expect(field1.title).toEqual("Field 1");
    expect(field1.validator).not.toBeUndefined();

    const field2 = attach(form.createField({
        disabled: true,
        hidden: true,
        name: "field2"
    }));

    expect(field2.pattern).toEqual("disabled");
    expect(field2.disabled).toBeTruthy();
    expect(field2.display).toEqual("hidden");
    expect(field2.hidden).toBeTruthy();

    const field3 = attach(form.createField({
        name: "field3",
        readOnly: true,
        visible: false,
    }));

    expect(field3.pattern).toEqual("readOnly");
    expect(field3.readOnly).toBeTruthy();
    expect(field3.display).toEqual("none");
    expect(field3.visible).toBeFalsy();

    const field4 = attach(form.createField({
        name: "field4",
        value: 123,
    }));

    expect(field4.initialValue).toBeUndefined();
    expect(field4.value).toEqual(123);

    const field5 = attach(form.createField({
        initialValue: 123,
        name: "field5",
    }));

    expect(field5.initialValue).toEqual(123);
    expect(field5.value).toEqual(123);

    // 重复定义字段不会覆盖属性
    // 需要覆盖需要修改 form 的 designable，见 form.spec.ts
    const field6 = attach(form.createField({
        initialValue: 123,
        hidden: false,
        name: "field2",
    }));

    expect(field6.display).toEqual("hidden");
    expect(field6.hidden).toBeTruthy();
    expect(field6.initialValue).toBeUndefined();
    expect(field6.value).toBeUndefined();
});

// 字段值和展示
test("field display and value", () => {
    const form = attach(createForm());
    const arrayField = attach(form.createArrayField({ name: "array" }));
    const objectField = attach(form.createObjectField({ name: "object" }));
    const valueField = attach(form.createField({ name: "value" }));

    expect(arrayField.value).toEqual([]);
    expect(objectField.value).toEqual({});
    expect(valueField.value).toBeUndefined();

    // 隐藏表单保留值
    arrayField.hidden = true;
    objectField.hidden = true;
    valueField.hidden = true;

    expect(arrayField.value).toEqual([]);
    expect(objectField.value).toEqual({});
    expect(valueField.value).toBeUndefined();

    // 展示字段
    arrayField.hidden = false;
    objectField.hidden = false;
    valueField.hidden = false;

    expect(arrayField.value).toEqual([]);
    expect(objectField.value).toEqual({});
    expect(valueField.value).toBeUndefined();

    // 隐藏表单不保留值
    arrayField.visible = false;
    objectField.visible = false;
    valueField.visible = false;

    expect(arrayField.value).toBeUndefined();
    expect(objectField.value).toBeUndefined();
    expect(valueField.value).toBeUndefined();

    // 展示字段
    arrayField.visible = true;
    objectField.visible = true;
    valueField.visible = true;

    expect(arrayField.value).toEqual([]);
    expect(objectField.value).toEqual({});
    expect(valueField.value).toBeUndefined();

    // 修改表单值
    arrayField.value = ['123'];
    objectField.value = { value: "123" };
    valueField.value = "123";

    expect(arrayField.value).toEqual(["123"]);
    expect(objectField.value).toEqual({ value: "123" });
    expect(valueField.value).toEqual("123");

    // 隐藏表单保留值
    arrayField.hidden = true;
    objectField.hidden = true;
    valueField.hidden = true;

    expect(arrayField.value).toEqual(["123"]);
    expect(objectField.value).toEqual({ value: "123" });
    expect(valueField.value).toEqual("123");

    // 展示字段
    arrayField.hidden = false;
    objectField.hidden = false;
    valueField.hidden = false;

    expect(arrayField.value).toEqual(["123"]);
    expect(objectField.value).toEqual({ value: "123" });
    expect(valueField.value).toEqual("123");

    // 隐藏表单不保留值
    arrayField.visible = false;
    objectField.visible = false;
    valueField.visible = false;

    expect(arrayField.value).toBeUndefined();
    expect(objectField.value).toBeUndefined();
    expect(valueField.value).toBeUndefined();

    // 展示字段
    arrayField.visible = true;
    objectField.visible = true;
    valueField.visible = true;

    expect(arrayField.value).toEqual(["123"]);
    expect(objectField.value).toEqual({ value: "123" });
    expect(valueField.value).toEqual("123");
});

// 嵌套展示和模式
test("nested display/pattern", () => {
    const form = attach(createForm());
    const object_ = attach(form.createObjectField({ name: "object" }));
    const void_ = attach(form.createVoidField({ basePath: "object", name: "void" }));
    const aaa = attach(form.createField({ basePath: "object.void", name: "aaa" }));
    const bbb = attach(form.createField({ basePath: "object", name: "bbb" }));
    const ddd = attach(form.createField({ name: "ddd" }));

    expect(ddd.visible).toBeTruthy();
    expect(ddd.editable).toBeTruthy();

    // 修改模式为展示只读，注意一下修改对于字段 ddd 没有任何影响，因为字段 ddd 和字段 object 平级
    object_.setPattern("readPretty");
    expect(void_.pattern).toEqual("readPretty");
    expect(aaa.pattern).toEqual("readPretty");
    expect(bbb.pattern).toEqual("readPretty");

    // 修改模式为编辑只读
    object_.setPattern("readOnly");
    expect(void_.pattern).toEqual("readOnly");
    expect(aaa.pattern).toEqual("readOnly");
    expect(bbb.pattern).toEqual("readOnly");

    // 修改模式为禁止修改
    object_.setPattern("disabled");
    expect(void_.pattern).toEqual("disabled");
    expect(aaa.pattern).toEqual("disabled");
    expect(bbb.pattern).toEqual("disabled");

    // 修改模式为可编辑，不提供参数默认为可编辑
    object_.setPattern();
    expect(void_.pattern).toEqual("editable");
    expect(aaa.pattern).toEqual("editable");
    expect(bbb.pattern).toEqual("editable");

    // 隐藏字段保留值
    object_.setDisplay("hidden");
    expect(void_.display).toEqual("hidden");
    expect(aaa.display).toEqual("hidden");
    expect(bbb.display).toEqual("hidden");

    // 隐藏字段不保留值
    object_.setDisplay("none");
    expect(void_.display).toEqual("none");
    expect(aaa.display).toEqual("none");
    expect(bbb.display).toEqual("none");

    // 展示字段，不提供参数默认展示
    object_.setDisplay();
    expect(void_.display).toEqual("visible");
    expect(aaa.display).toEqual("visible");
    expect(bbb.display).toEqual("visible");

    // 修改字段 aaa
    aaa.setValue("123");
    expect(aaa.value).toEqual("123");

    aaa.setDisplay("none");
    expect(aaa.value).toBeUndefined();

    aaa.setDisplay("visible");
    expect(aaa.value).toEqual("123");

    aaa.setValue("321");
    object_.setDisplay("none");
    expect(aaa.value).toBeUndefined();

    object_.setDisplay("visible");
    expect(aaa.value).toEqual("321");
});

// 设置字段值、初始值
test("setValue/setInitialValues", () => {
    const form = attach(createForm());
    const aaa = attach(form.createField({ name: "aaa" }));
    const bbb = attach(form.createField({ name: "bbb" }));
    const ccc = attach(form.createField({ name: "ccc" }));
    const ddd = attach(form.createField({ name: "ddd" }));

    aaa.setValue("123");
    expect(aaa.value).toEqual("123");
    expect(form.values.aaa).toEqual("123");

    bbb.setValue("123");
    expect(bbb.value).toEqual("123");
    expect(form.values.bbb).toEqual("123");

    ccc.setInitialValue("123");
    expect(ccc.initialValue).toEqual("123");
    expect(ccc.value).toEqual("123");
    expect(form.values.ccc).toEqual("123");

    ddd.setInitialValue("123");
    expect(ddd.initialValue).toEqual("123");
    expect(ddd.value).toEqual("123");
    expect(form.values.ddd).toEqual("123");

    ccc.setInitialValue("222");
    expect(ccc.initialValue).toEqual("222");
    expect(ccc.value).toEqual("222");
    expect(form.values.ccc).toEqual("222");

    ddd.setInitialValue("222");
    expect(ddd.initialValue).toEqual("222");
    expect(ddd.value).toEqual("222");
    expect(form.values.ddd).toEqual("222");
});

// 设置字段加载状态和验证状态
test("setLoading/setValidating", async () => {
    const form = attach(createForm());
    const field = attach(form.createField({ name: "aa" }));

    // 设置加载状态是一个微任务，不会立即执行
    field.setLoading(true);
    expect(field.loading).toBeFalsy();

    await sleep();
    expect(field.loading).toBeTruthy();

    // 取消加载状态则可以立即执行
    field.setLoading(false);
    expect(field.loading).toBeFalsy();

    // 设置验证状态是一个微任务，不会立即执行
    field.setValidating(true);
    expect(field.validating).toBeFalsy();

    await sleep();
    expect(field.validating).toBeTruthy();

    // 取消验证状态则可以立即执行
    field.setValidating(false);
    expect(field.validating).toBeFalsy();
});

// 设置字段组件和组件属性
test("setComponent/setComponentProps", () => {
    const form = attach(createForm());
    const field = attach(form.createField({ name: "aa" }));

    field.setComponent(undefined, { props: 123 });
    field.setComponent(Component);

    expect(Array.isArray(field.component) ? field.component[0] : undefined).toEqual(Component);
    expect(Array.isArray(field.component) ? field.component[1] : undefined).toEqual({ props: 123 });

    field.setComponentProps({ hello: "world" });
    expect(Array.isArray(field.component) ? field.component[1] : undefined).toEqual({ 
        hello: "world",
        props: 123 
    });
});

// 设置装饰组件和装饰组件的属性
test("setDecorator/setDecoratorProps", () => {
    const form = attach(createForm());
    const field = attach(form.createField({ name: "aa" }));

    field.setDecorator(undefined, { props: 123 });
    field.setDecorator(Component);

    expect(Array.isArray(field.decorator) ? field.decorator[0] : undefined).toEqual(Component);
    expect(Array.isArray(field.decorator) ? field.decorator[1] : undefined).toEqual({ props: 123 });

    field.setDecoratorProps({ hello: "world" });
    expect(Array.isArray(field.decorator) ? field.decorator[1] : undefined).toEqual({ 
        hello: "world",
        props: 123 
    });
});

// 响应式初始值
test("reaction initialValue", () => {
    const form = attach(createForm({
        values: { aa: 123 }
    }));

    const aa = attach(form.createField({ 
        name: "aa",
        reactions(field) {
            field.initialValue = 321
        }
    }));
    
    const bb = attach(form.createField({ 
        name: "bb",
        value: 123,
        reactions(field) {
            field.initialValue = 321
        }
    }));

    expect(aa.value).toEqual(123);
    expect(bb.value).toEqual(123);
});

// 字段验证状态、错误、警告、成功、有效、无效、验证状态、反馈信息
test("selfValidate/errors/warnings/successes/valid/invalid/validateStatus/queryFeedbacks", async () => {
    const form = attach(createForm());
    const field = attach(form.createField({
        name: "aa",
        required: true,
        validateFirst: true,
        validator: [
            value => {
                switch (value) {
                    case "123": return {
                        message: "success",
                        type: "success",
                    };
                    case "321": return {
                        message: "warning",
                        type: "warning"
                    };
                    case "111": return {
                        message: "error",
                        type: "error"
                    };
                }
            },
            {
                triggerType: "onBlur",
                format: "url",
            },
            {
                triggerType: "onFocus",
                format: "date"
            }
        ],
    }));
    const field2 = attach(form.createField({
        name: "bb",
        required: true,
        validator: [
            value => {
                switch (value) {
                    case "123": return {
                        message: "success",
                        type: "success",
                    };
                    case "321": return {
                        message: "warning",
                        type: "warning"
                    };
                    case "111": return {
                        message: "error",
                        type: "error"
                    };
                }
            },
            {
                triggerType: "onBlur",
                format: "url",
            },
            {
                triggerType: "onFocus",
                format: "date"
            }
        ],
        value: "111",
    }));

    const field3 = attach(form.createField({ name: "xxx" }));
    const field4 = attach(form.createField({ name: "ppp", required: true }));

    try {
        await field.validate();
    } catch {}

    try {
        await field2.validate();
    } catch {}

    expect(field.invalid).toBeTruthy();
    expect(field.selfErrors.length).toEqual(1);
    expect(field2.invalid).toBeTruthy();
    expect(field2.selfErrors.length).toEqual(3);

    // field 输入验证，其他两项验证器由于限制 onBlur 和 onFocus，所以没有触发
    await field.onInput("123");
    expect(field.selfSuccesses).toEqual(['success']);

    await field.onInput("321");
    expect(field.selfWarnings).toEqual(['warning']);

    await field.onInput("111");
    expect(field.selfErrors).toEqual(['error']);

    // 失焦验证，第一个 error 是由于之前输入了 111
    await field.onBlur();
    expect(field.selfErrors).toEqual([
        "error",
        "The field value is a invalid url"
    ]);

    // 聚焦时，会继续累加上次的错误
    await field.onFocus();
    const fieldFeedbacks = [
        "error",
        "The field value is a invalid url",
        "The field value is not a valid date format",
    ];

    expect(field.selfErrors).toEqual(fieldFeedbacks);

    // 设置反馈信息，参数为空不设置，反馈信息保留上次的
    field.setFeedback();
    expect(field.selfErrors).toEqual(fieldFeedbacks);

    // 设置反馈信息，结果以最后一次为准
    expect(field3.feedbacks).toEqual([]);
    const field3Feedbacks = { code: "EffectError", messages: ['error2'] };

    field3.setFeedback();
    field3.setFeedback({ messages: [] });
    field3.setFeedback({ code: "EffectError", messages: ['error'] });
    field3.setFeedback(field3Feedbacks);

    expect(field3.feedbacks).toEqual([field3Feedbacks]);

    // 查询字段反馈信息，由于查询的是自身 address，所以和 feedbacks 一样
    expect(field3.queryFeedbacks({ address: "xxx" })).toEqual([field3Feedbacks]);

    // 查询一个不存在的字段的反馈信息，无论是 address 还是 path 找到的都是空数组
    expect(field3.queryFeedbacks({ address: "yyy" })).toEqual([]);
    expect(field3.queryFeedbacks({ path: "yyy" })).toEqual([]);

    // 隐藏字段不保留值，也拿不到验证状态
    field4.setDisplay("none");

    await field4.validate();
    expect(field4.selfErrors).toEqual([]);
});

// 设置验证器
test("setValidateRule", () => {
    const form = attach(createForm());
    const field1 = attach(form.createField({ name: "aa", validator: [{ required: true }] }));
    const field2 = attach(form.createField({ name: "bb", validator: "phone" }));
    const field3 = attach(form.createField({ name: "cc", validator: "phone" }));
    const field4 = attach(form.createField({ name: "dd", validator: { format: "phone" } }));
    const field5 = attach(form.createField({ name: "ee", validator: { format: "phone" } }));
    const field6 = attach(form.createField({ name: "ff" }));

    // 按照规则设置字段 validator，验证器 required 会和 format 累加
    field1.setValidatorRule("format", "phone");
    expect(field1.validator).toEqual([{ required: true }, { format: "phone" }]);

    // 按照规则设置字段 validator，验证器 max 会和 format 累加
    field2.setValidatorRule("max", 3);
    expect(field2.validator).toEqual([{ format: "phone" }, { max: 3 }]);

    // 按照规则设置字段 validator，验证器 format 类型会被后面设置的 url 覆盖
    field3.setValidatorRule("format", "url");
    expect(field3.validator).toEqual([{ format: "url" }]);

    // 按照规则设置字段 validator，验证器 min 会和 format 累加
    field4.setValidatorRule("min", 3);
    expect(field4.validator).toEqual([{ format: "phone" }, { min: 3 }]);

    field5.setValidatorRule("min", 3);
    expect(field5.validator).toEqual([{ format: "phone" }, { min: 3 }]);

    field6.setValidatorRule("min", 3);
    expect(field6.validator).toEqual([{ min: 3 }]);
});

// 字段查询
test("query", () => {
    const form = attach(createForm());
    const object_ = attach(form.createObjectField({ name: "object" }));
    const void_ = attach(form.createVoidField({ basePath: "object", name: "void" }));
    const aaa = attach(form.createField({ basePath: "object.void", name: "aaa" }));
    const bbb = attach(form.createField({ basePath: "object", name: "bbb" }));

    // 字段查询从当前字段路径开始查询
    expect(object_.query("object.void").take()).not.toBeUndefined();
    expect(object_.query("object.void.aaa").take()).not.toBeUndefined();

    // 相对路径，一个点往上查一个节点 object
    expect(void_.query(".").take()?.address.toString()).toEqual("object");

    // 相对路径，往上查找节点 object，然后在 object 节点下查找 bbb
    expect(void_.query(".bbb").take()).not.toBeUndefined();

    // aaa 字段相隔节点 object 隔着字段 void，由于 void 是一个虚拟节点，所以也可以通过 object.aaa 查询
    expect(void_.query(".aaa").take()).not.toBeUndefined();

    // 不存在的节点
    expect(aaa.query(".ccc").take()).toBeUndefined();

    // 一层一层往上找节点，向下查找节点可以忽略虚拟节点，向上不可以
    expect(aaa.query(".").take()?.address.toString()).toEqual("object.void");
    expect(aaa.query("..").take()?.address.toString()).toEqual("object");

    // 所以这里拿到的是 object 下的 bbb，而不是虚拟节点下的
    expect(aaa.query("..bbb").take()?.address.toString()).toEqual("object.bbb");

    // 以字段 bbb 往上查找 object，然后查找相对路径
    expect(bbb.query(".void").take()).not.toBeUndefined();
    expect(bbb.query(".void.aaa").take()).not.toBeUndefined();
    expect(bbb.query(".void.ccc").take()).toBeUndefined();

    // 向下查找的时候可以忽略虚拟节点
    expect(bbb.query(".aaa").take()).not.toBeUndefined();
});

// 初始值为空
test("empty initialValue", () => {
    const form = attach(createForm());
    const aa = attach(form.createField({ initialValue: "", name: "aa" }));
    const bb = attach(form.createField({ name: "bb" }));

    expect(aa.value).toEqual("");
    expect(form.values.aa).toEqual("");
    expect(bb.value).toBeUndefined();
    expect(form.values.bb).toBeUndefined();
});

// 有初始值的对象字段
test("objectFieldWithInitialValue", async () => {
    const form = attach(createForm({
        initialValues: {
            obj: { a: "a", b: "b" }
        }
    }));

    attach(form.createObjectField({ name: "obj" }));

    const fieldObjA = attach(form.createField({ name: "obj.a" }));
    expect(fieldObjA.initialValue).toEqual("a");

    // 修改 value 会覆盖 value 值，但不影响 initialValue，修改 initialValue 则都会修改
    fieldObjA.value = "aa";
    expect(fieldObjA.value).toEqual("aa");
    expect(fieldObjA.initialValue).toEqual("a");
});

// 有初始值的数组对象
test("initialValueWithArray", () => {
    const form = attach(createForm());
    const field = attach(form.createField({ initialValue: [1, 2], name: "aaa" }));

    expect(field.initialValue).toEqual([1, 2]);
    expect(field.value).toEqual([1, 2]);
    expect(form.initialValues.aaa).toEqual([1, 2]);
    expect(form.values.aaa).toEqual([1, 2]);
});

// 重置对象字段的初始值
test("resetObjectFieldWithInitialValue", async () => {
    const form = attach(createForm());
    attach(form.createObjectField({ name: "obj" }));

    const fieldObjA = attach(form.createField({ initialValue: "a", name: "obj.a" }));
    fieldObjA.value = "aa";

    expect(fieldObjA.value).toEqual("aa");

    await form.reset();
    expect(fieldObjA.initialValue).toEqual("a");
    expect(fieldObjA.value).toEqual("a");;
});

// 字段重置
test("reset", async () => {
    const form = attach(createForm<Partial<Record<string, number|null>>>({
        initialValues: { aa: 123, cc: null },
        values: { bb: 123 }
    }));

    const aa = attach(form.createField({ name: "aa", required: true }));
    const bb = attach(form.createField({ name: "bb", required: true }));
    const cc = attach(form.createField({ name: "cc", required: true }));
    const dd = attach(form.createField({ name: "dd", required: true }));

    expect(aa.value).toEqual(123);
    expect(bb.value).toEqual(123);
    expect(cc.value).toEqual(null);
    expect(form.values.aa).toEqual(123);
    expect(form.values.bb).toEqual(123);
    expect(form.values.cc).toEqual(null);

    aa.onInput("xxxx");
    dd.onInput(null);

    expect(aa.value).toEqual("xxxx");
    expect(dd.value).toEqual(null);

    aa.reset();
    expect(aa.value).toEqual(123);
    expect(form.values.aa).toEqual(123);

    bb.onInput("xxxx");
    expect(bb.value).toEqual("xxxx");

    bb.reset();
    expect(bb.value).toBeUndefined();
    expect(form.values.bb).toBeUndefined();
    
    // 重置字段并强制清空字段值，字段值清空后无论之前的验证情况，都为有效等待下次触发验证
    aa.reset({ forceClear: true });
    cc.reset({ forceClear: true });

    expect(aa.value).toBeUndefined();
    expect(form.values.aa).toBeUndefined();
    expect(cc.value).toBeUndefined();
    expect(form.values.cc).toBeUndefined();
    expect(aa.valid).toBeTruthy();
    expect(cc.valid).toBeTruthy();

    // 除非清空字段的时候要求同时发起验证，注意触发验证是一个微任务
    await aa.reset({ forceClear: true, validate: true });
    await cc.reset({ forceClear: true, validate: true });

    expect(aa.valid).toBeFalsy();
    expect(cc.valid).toBeFalsy();
});

// 匹配
test("match", () => {
    const form = attach(createForm<Partial<Record<string, number>>>({
        initialValues: { aa: 123 },
        values: { bb: 123 }
    }));

    const aa = attach(form.createField({ name: "aa", required: true }));
    expect(aa.match("aa")).toBeTruthy();
    expect(aa.match("*")).toBeTruthy();
    expect(aa.match("a~")).toBeTruthy();
    expect(aa.match("*(aa,bb)")).toBeTruthy();
});

// 获取、设置字段状态
test("setState/getState", () => {
    const form = attach(createForm());
    const aa = attach(form.createField({ name: "aa", required: true }));
    const state = aa.getState();

    aa.setState(state => {
        state.title = "AAA";
        state.value = "123";
    });
    expect(aa.value).toEqual("123");
    expect(aa.title).toEqual("AAA");

    // 覆盖 state，但对于 setState 并不生效
    aa.setState(Object.assign(state, { setState: () => {} }));
    expect(aa.value).toBeUndefined();
    expect(aa.title).toBeUndefined();

    // setState 并没有因为状态还原被覆盖，而其他的属性会覆盖
    aa.setState(state => {
        state.hidden = false;
    });
    expect(aa.display).toEqual("visible");

    aa.setState(state => {
        state.visible = true;
    });
    expect(aa.display).toEqual("visible");

    aa.setState(state => {
        state.readOnly = false;
    });
    expect(aa.pattern).toEqual("editable");

    aa.setState(state => {
        state.disabled = false;
    });
    expect(aa.pattern).toEqual("editable");

    aa.setState(state => {
        state.editable = true;
    });
    expect(aa.pattern).toEqual("editable");

    aa.setState(state => {
        state.editable = false;
    });
    expect(aa.pattern).toEqual("readPretty");

    aa.setState(state => {
        state.readPretty = true;
    });
    expect(aa.pattern).toEqual("readPretty");

    aa.setState(state => {
        state.readPretty = false;
    });
    expect(aa.pattern).toEqual("editable");

    // 提前设置一个不存在的字段状态
    form.setFieldState("bb", state => {
        state.value = "bbb";
        state.visible = false;
    });

    // 创建字段后，发现之前设定的值丢失了，是因为 visible: false
    // 结合之前的 form.spec.ts，要在创建字段设置值可以通过赋值，也可以通过 form.setFieldState
    // 而 setInitialValue 和 setValue 不可以
    const bb = attach(form.createField({ name: "bb" }));
    expect(bb.value).toBeUndefined();
    expect(bb.visible).toBeFalsy();

    // 设置所有字段的值为 123
    form.setFieldState("*", state => {
        state.value = "123";
    });
    
    // 再创建一个字段，包括后来创建的字段在内，所有的值都是 123
    const cc = attach(form.createField({ name: "cc" }));

    // 除了字段 bb，因为此时它的 visible: false
    expect(aa.value).toEqual("123");
    expect(bb.value).toBeUndefined();
    expect(cc.value).toEqual("123");

    // form.setFieldState 第一个参数除了接受路径外，还可以直接提供 Query 对象
    form.setFieldState(form.query("cc"), state => {
        state.value = "ccc";
    });
    expect(cc.value).toEqual("ccc");

    // form.setFieldState 第一个参数也接受 Field 对象
    form.setFieldState(cc, state => {
        state.value = "123";
    });
    expect(cc.value).toEqual("123");

    // form.getFieldState 第一个参数和 form.setFieldState 第一个参数类型是一样的
    expect(form.getFieldState(aa)).not.toBeUndefined();
    expect(form.getFieldState(form.query("aa"))).not.toBeUndefined();
});

// 设置字段数据源
test("setDataSource", () => {
    const form = attach(createForm());
    const aa = attach(form.createField({ name: "aa", required: true }));
    const data = [
        { label: "s1", value: "s1" },
        { label: "s2", value: "s2" },
    ];

    aa.setDataSource(data);
    expect(aa.dataSource).toEqual(data);
});

// 设置字段标题和介绍
test("setTitle/setDescription", () => {
    const form = attach(createForm());
    const aa = attach(form.createField({ name: "aa", required: true }));

    aa.setTitle("AAA");
    aa.setDescription("This is AAA");

    expect(aa.title).toEqual("AAA");
    expect(aa.description).toEqual("This is AAA");
});

// 必填字段，设置必填
test("required/setRequired", () => {
    const form = attach(createForm());
    const aa = attach(form.createField({ name: "aa" }));

    aa.setRequired(true);
    expect(aa.required).toBeTruthy();

    aa.setRequired(false);
    expect(aa.required).toBeFalsy();

    // 通过 validator 设置 required
    const bb = attach(form.createField({ 
        name: "bb",
        validator: { max: 3, required: true } 
    }));
    expect(bb.required).toBeTruthy();

    bb.setRequired(false);
    expect(bb.required).toBeFalsy();

    // 创建一个包含有 required 的验证器集合
    const cc = attach(form.createField({
        name: "cc",
        validator: [
            "date", { max: 3 }, { required: true }
        ]
    }));
    expect(cc.required).toBeTruthy();

    cc.setRequired(false);
    expect(cc.required).toBeFalsy();

    // 创建一个没有要求必填的字段
    const dd = attach(form.createField({ name: "dd", validator: { max: 3 } }));
    expect(dd.required).toBeFalsy();

    dd.setRequired(true);
    expect(dd.required).toBeTruthy();
});

// 设置字段值的 data 和 content
test("setData/setContent", () => {
    const form = attach(createForm());
    const aa = attach(form.createField({ name: "aa", required: true }));

    aa.setData("This is data");
    aa.setContent("This is Content");

    expect(aa.data).toEqual("This is data");
    expect(aa.content).toEqual("This is Content");
});

// 设置虚拟字段的 data 和 content
test("setData/setContent in void field", () => {
    const form = attach(createForm());
    const voidField = attach(form.createVoidField({ name: "voidField" }));

    voidField.setData("This is data");
    voidField.setContent("This is Content");

    expect(voidField.data).toEqual("This is data");
    expect(voidField.content).toEqual("This is Content");
});

// 设置字段验证状态
test("setErrors/setWarnings/setSuccesss/setValidator", async () => {
    const form = attach(createForm());
    const aa = attach(form.createField({ name: "aa" }));
    const bb = attach(form.createField({ name: "bb" }));
    const cc = attach(form.createField({ name: "cc" }));
    const dd = attach(form.createField({ 
        name: "dd",
        validator() {
            return new Promise(() => {});
        }
    }));

    aa.setSelfErrors(["error"]);
    aa.setSelfWarnings(["warning"]);
    aa.setSelfSuccesses(["success"]);
    bb.setSelfSuccesses(["success"]);
    cc.setSelfWarnings(["warning"]);

    expect(aa.selfErrors).toEqual(['error']);
    expect(aa.valid).toBeFalsy();
    expect(aa.selfWarnings).toEqual(['warning']);
    expect(aa.selfSuccesses).toEqual(['success']);

    // aa 的字段存在 errors，优先级高于 success
    expect(aa.validateStatus).toEqual("error");
    expect(bb.validateStatus).toEqual("success");
    expect(cc.validateStatus).toEqual("warning");

    aa.setValidator("date");
    await aa.onInput("123");

    // 2 个错误包含：setSelfErrors、setValidator("date")
    expect(aa.selfErrors.length).toEqual(2);

    dd.onInput("123");
    await sleep();

    expect(dd.validateStatus).toEqual("validating");
});

// 字段联动
test("reactions", () => {
    const form = attach(createForm());
    const aa = attach(form.createField({ name: "aa" }));
    const bb = attach(form.createField({
        name: "bb",
        reactions: [
            field => {
                const aa = field.query("aa");
                const initialValue = aa.get("initialValue");
                const inputValue = aa.get("inputValue");

                field.visible = aa.get("value") !== "123";
                if (inputValue === "333") {
                    field.editable = false;
                } else if (inputValue === "444") {
                    field.editable = true;
                }

                if (initialValue === "555") {
                    field.readOnly = true;
                } else if (initialValue === "666") {
                    field.readOnly = false;
                }
            }
        ],
    }));

    expect(bb.visible).toBeTruthy();
    
    aa.setValue("123");
    expect(bb.visible).toBeFalsy();

    aa.onInput("333");
    expect(bb.editable).toBeFalsy();

    aa.onInput("444");
    expect(bb.editable).toBeTruthy();

    aa.setInitialValue("555");
    expect(bb.readOnly).toBeTruthy();

    aa.setInitialValue("666");
    expect(bb.readOnly).toBeFalsy();
});

// 容错
test("fault tolerance", () => {
    const form = attach(createForm());
    const field = attach(form.createField({ name: "aa", value: 123 }));

    field.setDisplay("none");
    expect(field.value).toBeUndefined();

    field.setDisplay("visible");
    expect(field.value).toEqual(123);

    field.setDisplay("none");
    expect(field.value).toBeUndefined();

    field.setValue(321);
    expect(field.value).toBeUndefined();

    field.setDisplay("visible");
    expect(field.value).toEqual(321);

    // @ts-ignore 设置错误值将被忽略
    form.setDisplay(null);

    // @ts-ignore 设置错误值将被忽略
    form.setPattern(null);

    // 不受错误的设置影响，创建的字段会按照默认值创建
    const field2 = attach(form.createField({ name: "xxx" }));
    expect(field2.display).toEqual("visible");
    expect(field2.pattern).toEqual("editable");
});

// 初始值
test("initialValue", () => {
    const form = attach(createForm());
    const field = attach(form.createArrayField({ initialValue: 123, name: "aaa" }));

    expect(form.initialValues.aaa).toEqual(123);
    expect(form.values.aaa).toEqual(123);
    expect(field.initialValue).toEqual(123);
    expect(field.value).toEqual(123);
});

// 无索引数组路径计算
test("array path calculation with none index", async () => {
    const form = attach(createForm());
    const array = attach(form.createArrayField({ name: "array" }));

    await array.push({ input: "123" });
    const input = attach(form.createField({ basePath: "array", name: "0.input" }));

    expect(input.path.toString()).toEqual("array.0.input");
    expect(input.value).toEqual("123");
});

// 无索引嵌套虚拟节点的数组路径计算
test("array path calculation with none index and void nested", async () => {
    const form = attach(createForm());
    const array = attach(form.createArrayField({ name: "array" }));

    await array.push({ input: "123" });
    attach(form.createVoidField({ basePath: "array", name: "0.column" }));

    // 在虚拟节点下创建的字段可以跳过虚拟节点获取路径和值
    const input = attach(form.createField({ basePath: "array.0.column", name: "input" }));
    expect(input.path.toString()).toEqual("array.0.input");
    expect(input.value).toEqual("123");
});

// 通过对象索引计算数组路径
test("array path calculation with object index", async () => {
    const form = attach(createForm());
    const array = attach(form.createArrayField({ name: "array" }));

    await array.push({ input: "123" });
    attach(form.createObjectField({ basePath: "array", name: "0" }));

    const input = attach(form.createField({ basePath: "array.0", name: "input" }));
    expect(input.path.toString()).toEqual("array.0.input");
    expect(input.value).toEqual("123");
});

// 通过虚拟索引计算数组路径
test("array path calculation with object index", async () => {
    const form = attach(createForm());
    const array = attach(form.createArrayField({ name: "array" }));

    await array.push("123");
    attach(form.createVoidField({ basePath: "array", name: "0" }));

    const input = attach(form.createField({ basePath: "array.0", name: "input" }));
    expect(input.path.toString()).toEqual("array.0");
    expect(input.value).toEqual("123");
});

// 外层包裹一个虚拟节点并通过虚拟索引计算数组路径
test("array path calculation with void index and void wrapper", async () => {
    const form = attach(createForm());
    attach(form.createVoidField({ name: "layout" }));

    const array_in_layout = attach(form.createArrayField({ basePath: "layout", name: "array_in_layout" }));
    
    // 从以上的例子中可以看出，只有将数组索引本身作为虚拟节点，字段可以用索引查找，并且直接赋值
    // 而其他情况，无论是虚拟节点在索引下还是对象作为索引，字段都要通过索引+字段名查找，赋值也必须是一个对象
    await array_in_layout.push("123");
    attach(form.createVoidField({ basePath: "layout.array_in_layout", name: "0" }));

    const input = attach(form.createField({ basePath: "layout.array_in_layout.0", name: "input" }));
    expect(input.path.toString()).toEqual("array_in_layout.0");
    expect(input.value).toEqual("123");
});

// 在联动中的联动
test("reaction in reaction", () => {
    const form = attach(createForm());
    const void_ = attach(form.createVoidField({ name: "void" }));

    attach(form.createField({ basePath: "void", initialValue: 123, name: "field1" }));
    const field2 = attach(form.createField({
        basePath: "void",
        initialValue: 456,
        name: "field2",
        reactions: field => {
            const f1 = field.query("field1");
            field.display = f1.get("value") === 123 ? "visible" : "none";
        }
    }));

    // 原本虚拟节点下的字段都会展示，但是由于虚拟节点隐藏不保留值，所以下面所有字段都是 undefined
    void_.setDisplay("none");
    expect(field2.display).toEqual("none");
    expect(field2.value).toBeUndefined();
});

// 嵌套字段隐藏和验证
test("nested fields hidden and selfValidate", async () => {
    const form = attach(createForm());
    const parent = attach(form.createVoidField({ name: "parent" }));

    attach(form.createField({ basePath: "parent", name: "aa", required: true }));
    attach(form.createField({ basePath: "parent", name: "bb", required: true }));

    try {
        await form.validate();
    } catch {}

    expect(form.invalid).toBeTruthy();
    parent.display = "hidden";
    
    // 原本验证不合理的表单，因为 parent 隐藏之后，其下的子节点也隐藏变为合理
    await form.validate();
    expect(form.invalid).toBeFalsy();
});

// 深度嵌套字段隐藏和验证
test("deep nested field hidden and selfValidate", async () => {
    const form = attach(createForm());
    const parent1 = attach(form.createVoidField({ name: "parent1" }));
    const parent2 = attach(form.createVoidField({ basePath: "parent1", name: "parent2" }));
    const aa = attach(form.createField({ basePath: "parent1.parent2", name: "aa", required: true }));
    const bb = attach(form.createField({ basePath: "parent1.parent2", name: "bb", required: true }));

    try {
        await form.validate();
    } catch {}

    expect(form.invalid).toBeTruthy();

    // 根节点是 hidden 则下面的节点都是 hidden
    parent2.display = "visible";
    parent1.display = "hidden";
    expect(parent2.display).toEqual("hidden");
    expect(aa.display).toEqual("hidden");
    expect(bb.display).toEqual("hidden");

    await form.validate();
    expect(form.invalid).toBeFalsy();
});

// 深度嵌套字段隐藏和通过中间字段隐藏自身验证状态
test("deep nested fields hidden and selfValidate with middle hidden", async () => {
    const form = attach(createForm());
    const parent1 = attach(form.createVoidField({ name: "parent1" }));
    const parent2 = attach(form.createVoidField({ basePath: "parent1", name: "parent2" }));
    const aa = attach(form.createField({ basePath: "parent1.parent2", name: "aa", required: true }));
    const bb = attach(form.createField({ basePath: "parent1.parent2", name: "bb", required: true }));

    try {
        await form.validate();
    } catch {}

    expect(form.invalid).toBeTruthy();

    // 父节点是 hidden，将无视根节点的 display，子节点都是 hidden
    parent2.display = "hidden";
    parent1.display = "none";
    expect(parent2.display).toEqual("hidden");
    expect(aa.display).toEqual("hidden");
    expect(bb.display).toEqual("hidden");

    await form.validate();
    expect(form.invalid).toBeFalsy();
});

// 组件卸载和验证状态
test("fields unmount and selfValidate", async () => {
    const form = attach(createForm());
    const field = attach(form.createField({ name: "parent", required: true }));

    try {
        await form.validate();
    } catch {}
    expect(form.invalid).toBeTruthy();

    try {
        field.onUnmount();
        await form.validate();
    } catch {}
    expect(form.invalid).toBeTruthy();

    form.clearFormGraph("parent");
    await form.validate();

    expect(form.invalid).toBeFalsy();
});