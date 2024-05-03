import { Field, Form, createForm, isField, onFieldReact } from "@formily/core";
import { autorun, batch, observable } from "@formily/reactive";
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

    // 结果证明，字段卸载并不能改变验证结果，除非回收字段
    form.clearFormGraph("parent");
    await form.validate();

    expect(form.invalid).toBeFalsy();
});

// 数组字段下的自动清除
test("auto clean with ArrayField", () => {
    const form = attach(createForm());
    attach(form.createArrayField({
        initialValue: [{}, {}],
        name: "array",
    }));

    attach(form.createField({ basePath: "array", name: "0.aa" }));
    attach(form.createField({ basePath: "array", name: "1.aa" }));

    const array1 = attach(form.createArrayField({
        initialValue: [{}, {}],
        name: "array1"
    }));

    attach(form.createField({ basePath: "array1", name: "0.aa" }));
    attach(form.createField({ basePath: "array1", name: "1.aa" }));

    const array2 = attach(form.createArrayField({
        initialValue: [{}, {}],
        name: "array2"
    }));

    attach(form.createField({ basePath: "array2", name: "0.aa" }));
    attach(form.createField({ basePath: "array2", name: "1.aa" }));

    expect(form.fields["array.1.aa"]).not.toBeUndefined();
    expect(form.values.array).toEqual([{}, {}]);

    // 数组字段接受浅覆盖也可以通过深覆盖，并清理索引子字段
    form.setValues({ array: [{}] }, "shallowMerge");
    expect(form.values.array).toEqual([{}]);
    expect(form.fields["array.1.aa"]).toBeUndefined();
    expect(form.fields["array.0.aa"]).not.toBeUndefined();

    // 覆盖值不影响 array1
    expect(form.fields["array1.0.aa"]).not.toBeUndefined();
    expect(form.fields["array1.1.aa"]).not.toBeUndefined();
    expect(form.values.array1).toEqual([{}, {}]);

    // 覆盖清空 array1，但不影响 array2
    array1.setValue([]);
    expect(form.fields["array1.0.aa"]).toBeUndefined();
    expect(form.fields["array1.1.aa"]).toBeUndefined();
    expect(form.fields["array2.0.aa"]).not.toBeUndefined();
    expect(form.fields["array2.1.aa"]).not.toBeUndefined();

    // 覆盖清空 array2
    array2.setValue([]);
    expect(form.fields["array2.0.aa"]).toBeUndefined();
    expect(form.fields["array2.1.aa"]).toBeUndefined();
});

// 对象字段下的自动清除
test("auto clean with ObjectField", () => {
    const form = attach(createForm());
    const initialValue = { aa: "aa", bb: "aa" };

    attach(form.createObjectField({ name: "obj", initialValue }));
    attach(form.createField({ basePath: "obj", name: "aa" }));
    attach(form.createField({ basePath: "obj", name: "bb" }));

    const obj1 = attach(form.createObjectField({ name: "obj1", initialValue }));
    attach(form.createField({ basePath: "obj1", name: "aa" }));
    attach(form.createField({ basePath: "obj1", name: "bb" }));

    const obj2 = attach(form.createObjectField({ name: "obj2", initialValue }));
    attach(form.createField({ basePath: "obj2", name: "aa" }));
    attach(form.createField({ basePath: "obj2", name: "bb" }));

    expect(form.fields["obj.aa"]).not.toBeUndefined();
    expect(form.fields["obj.bb"]).not.toBeUndefined();
    expect(form.values.obj).toEqual(initialValue);

    // 对象字段可以浅覆盖值，但不会清除属性子字段
    form.setValues({ obj: { aa: "123" } }, "shallowMerge");
    expect(form.values.obj).toEqual({ aa: "123" });
    expect(form.fields["obj.aa"]).not.toBeUndefined();
    expect(form.fields["obj.bb"]).not.toBeUndefined();
    expect(form.fields["obj1.aa"]).not.toBeUndefined();
    expect(form.fields["obj1.bb"]).not.toBeUndefined();
    expect(form.values.obj).toEqual({ aa: "123" });
    expect(form.values.obj1).toEqual(initialValue);

    // 可以深覆盖值，但不会清除属性子字段
    obj1.setValue({});
    expect(form.values.obj1).toEqual({});
    expect(form.fields["obj1.aa"]).not.toBeUndefined();
    expect(form.fields["obj1.bb"]).not.toBeUndefined();
    expect(form.fields["obj2.aa"]).not.toBeUndefined();
    expect(form.fields["obj2.bb"]).not.toBeUndefined();
    expect(form.values.obj2).toEqual(initialValue);

    // 深度覆盖，添加的值也是 undefined
    obj2.setValue({ aa: "aa", bb: "bb", cc: "cc" });
    expect(form.fields["obj2.aa"]).not.toBeUndefined();
    expect(form.fields["obj2.bb"]).not.toBeUndefined();
    expect(form.fields["obj2.cc"]).toBeUndefined();

    // 添加属性值，子字段仍旧不存在，但是对象字段的值已发生改变
    obj2.addProperty("cc", "123");
    expect(form.fields["obj2.cc"]).toBeUndefined();
    expect(obj2.value).toEqual({ aa: "aa", bb: "bb", cc: "123" });

    // 直到添加字段后，则值和字段都存在
    const cc = attach(form.createField({ basePath: "obj2", name: "cc" }));
    expect(form.fields["obj2.cc"]).not.toBeUndefined();
    expect(cc.value).toEqual("123");

    // addProperty 虽然不能添加字段，但是 removeProperty 却可以删除字段
    obj2.removeProperty("cc");
    expect(form.fields["obj2.cc"]).toBeUndefined();
});

// 初始值为空
test("initial value with empty", () => {
    const form = attach(createForm());
    const empty = attach(form.createField({ initialValue: "", name: "empty" }));
    expect(empty.value).toEqual("");

    const beNull = attach(form.createField({ initialValue: null, name: "null" }));
    expect(beNull.value).toEqual(null);
});

// 字段提交
test("field submit", async () => {
    const form = attach(createForm({
        initialValues: {
            aa: { cc: "cc" }, bb: "bb"
        }
    }));

    const childForm = attach(form.createObjectField({ name: "aa" }));
    attach(form.createField({ name: "bb" }));
    attach(form.createField({ basePath: "aa", name: "cc" }));

    const onSubmit = jest.fn();

    // 注意这里是对象字段提交，不是表单提交，字段也可以单独 submit
    // 所以提交的值也只有 { cc: "cc" }，甚至不包括自身
    await childForm.submit(onSubmit);
    expect(onSubmit).toHaveBeenCalledWith({ cc: "cc" });
});

// 带有错误的字段提交
test("field submit with error", async () => {
    const form = attach(createForm());
    const childForm = attach(form.createObjectField({ name: "aa" }));

    attach(form.createField({ name: "bb", required: true }));
    attach(form.createField({ basePath: "aa", name: "cc", required: true }));
    const onSubmit = jest.fn();

    try {
        await childForm.submit(onSubmit);
    } catch(e) {
        expect(e).not.toBeUndefined();
    }

    // 字段提交和表单提交是一样的
    expect(onSubmit).toHaveBeenCalledTimes(0);
});

// 初始值和展示状态的关系
test("initial display with value", () => {
    const form = attach(createForm());
    const aa = attach(form.createField({ name: "aa", value: 123, visible: false }));
    const bb = attach(form.createField({ name: "bb", value: 123, visible: true }));
    const cc = attach(form.createField({ hidden: true, name: "cc", value: 123 }));

    // visible: false 相当于 display: none，隐藏不保留值
    expect(aa.value).toBeUndefined();
    expect(aa.visible).toBeFalsy();

    // visible: true 默认展示保留值状态
    expect(bb.value).toEqual(123);
    expect(bb.visible).toBeTruthy();

    // display: hidden 时会隐藏 UI 但保留值
    expect(cc.value).toEqual(123);
    expect(cc.hidden).toBeTruthy();
});

// 字段受控展示状态
test("state depend field visible value", async () => {
    const form = attach(createForm());
    const aa = attach(form.createField({ name: "aa" }));
    const bb = attach(form.createField({ 
        name: "bb",
        reactions(field) {
            field.visible = aa.value === "123"
        }
    }));
    const cc = attach(form.createField({
        name: "cc",
        reactions(field) {
            field.visible = aa.value === "123";
            field.disabled = !bb.value;
        }
    }));

    expect(bb.visible).toBeFalsy();
    expect(cc.visible).toBeFalsy();
    expect(cc.disabled).toBeTruthy();

    // 巩固：修改字段值是同步的，但状态修改是微任务
    aa.value = "123";
    await sleep(10);

    expect(bb.visible).toBeTruthy();
    expect(cc.visible).toBeTruthy();
    expect(cc.disabled).toBeTruthy();

    aa.value = "321";
    await sleep(10);

    expect(bb.visible).toBeFalsy();
    expect(cc.visible).toBeFalsy();
    expect(cc.disabled).toBeTruthy();

    aa.value = "";
    await sleep(10);

    expect(bb.visible).toBeFalsy();
    expect(cc.visible).toBeFalsy();
    expect(cc.disabled).toBeTruthy();

    aa.value = "123";
    bb.value = "123";
    await sleep(10);

    expect(bb.visible).toBeTruthy();
    expect(cc.visible).toBeTruthy();
    expect(cc.disabled).toBeFalsy();
});

// 字段值和初始值受控
test("reactions initialValue and value",  async () => {
    const form = attach(createForm({ initialValues: { aa: { input: "111" } } }));
    attach(form.createObjectField({
        name: "aa",
        reactions: [
            field => {
                // 即便通过 field.query 收集依赖修改 initialValue 也一样无效
                field.initialValue = { input: "123" };
                field.query(".aa.input").take(target => {
                    if (isField(target)) target.initialValue = "123";
                });
            }
        ],
    }));

    // 这个例子再次说明，在创建字段前修改初始值要么直接赋值、要么在创建字段之后
    // setInitialValues、reactions 都不可以
    attach(form.createField({ basePath: "aa", name: "input" }));
    expect(form.values.aa.input).toEqual("111");

    await sleep();
    expect(form.values.aa.input).toEqual("111");

    // 但是有种情况例外，在 reaction 通过 field.query 收集字段并修改其 value，条件缺一个不可
    const form1 = attach(createForm({ initialValues: { aa: { input: "111" } } }));
    attach(form1.createObjectField({
        name: "aa",
        reactions: [
            field => {
                field.query(".aa.input").take(target => {
                    if (isField(target)) target.value = "123";
                });
            }
        ],
    }));

    attach(form1.createField({ basePath: "aa", name: "input" }));
    expect(form1.values.aa.input).toEqual("123");
});

// 字段名叫 length 的初始值
test("field name is length in initalize", () => {
    const form = attach(createForm());

    // 表单下的 length
    const field = (form.createField({ initialValue: "123", name: "length" }));
    expect(field.value).toEqual("123");

    // 对象下的 length
    attach(form.createObjectField({ name: "obj" }));
    const array = attach(form.createArrayField({ basePath: "obj", initialValue: [1, 2], name: "length" }));

    expect(array.value).toEqual([1, 2]);
    expect(form.values.obj.length).toEqual([1, 2]);
});

// 字段名叫 length，动态分配初始值
test("field name is length in dynamic assign", () => {
    const form = attach(createForm());

    // 表单下的 length
    const field = (form.createField({ name: "length" }));
    field.initialValue = "123";

    expect(field.value).toEqual("123");

    // 对象下的 length
    attach(form.createObjectField({ name: "obj" }));
    const array = attach(form.createArrayField({ basePath: "obj", name: "length" }));
    array.initialValue = [1, 2]

    expect(array.value).toEqual([1, 2]);
    expect(form.values.obj.length).toEqual([1, 2]);
});

// 嵌套资源的修改
test("nested field modified", async () => {
    const form = attach(createForm());
    const obj = attach(form.createObjectField({ name: "object" }));
    const child = attach(form.createField({ basePath: "object", name: "child" }));

    // 初始字段，表单，节点本身、节点子集都没有发生变更
    expect(child.modified).toBeFalsy();
    expect(child.selfModified).toBeFalsy();
    expect(obj.modified).toBeFalsy();
    expect(obj.selfModified).toBeFalsy();
    expect(form.modified).toBeFalsy();

    // 叶子节点发起输入，叶子节点本身和子集、父节点的子集和表单发生了变更、父节点本身没有变更
    await child.onInput();
    expect(child.modified).toBeTruthy();
    expect(child.selfModified).toBeTruthy();
    expect(obj.modified).toBeTruthy();
    expect(obj.selfModified).toBeFalsy();
    expect(form.modified).toBeTruthy();

    // 父节点发起还原操作，只有表单本身发生了变更，其他没有变更
    await obj.reset()
    expect(child.modified).toBeFalsy();
    expect(child.selfModified).toBeFalsy();
    expect(obj.modified).toBeFalsy();
    expect(obj.selfModified).toBeFalsy();
    expect(form.modified).toBeTruthy();

    // 表单发起还原，所有都回到初始设定，全部都没有修改过
    await form.reset()
    expect(child.modified).toBeFalsy();
    expect(child.selfModified).toBeFalsy();
    expect(obj.modified).toBeFalsy();
    expect(obj.selfModified).toBeFalsy();
    expect(form.modified).toBeFalsy();
});

// 重复调用字段的 setValidator
test("field setValidator repeat call", async () => {
    const form = attach(createForm());
    const field = attach(form.createField({ name: "normal" }));

    const validator1 = jest.fn();
    const validator2 = jest.fn();
    const validator3 = jest.fn();

    // 巩固：发起验证、发起提交一定是微任务
    field.setValidator([validator1, validator2, validator3]);
    await form.validate();

    expect(validator1).toHaveBeenCalledTimes(1);
    expect(validator2).toHaveBeenCalledTimes(1);
    expect(validator3).toHaveBeenCalledTimes(1);

});

// 在自定义验证器中获取上下文字段和表单
test("custom validator to get ctx.field", async () => {
    const form = attach(createForm());
    const ctx: { field?: Field, form?: Form } = {};

    attach(form.createField({
        name: "aaa",
        validator(value, rule, _ctx) {
            ctx.field = _ctx.field;
            ctx.form = _ctx.form;
        }
    }));

    await form.submit();
    expect(ctx.field).not.toBeUndefined();
    expect(ctx.form).not.toBeUndefined();
});

// 单方向联动
test("single direction linkage effect", async () => {
    const form = attach(createForm());
    const input1 = attach(form.createField({
        name: "input1",
        reactions: field => {
            if (isField(field) && field.selfModified) {
                input2.value = field.value;
            }
        }
    }));

    const input2 = attach(form.createField({ name: "input2" }));
    await input1.onInput("123");
    expect(input2.value).toBe("123");
    await input1.onInput("321");
    expect(input2.value).toBe("321");
});

// 修改字段路径会重新计算字段值
test("path change will update computed value", () => {
    const form = attach(createForm());
    const input = attach(form.createField({ name: "input" }));
    const value = jest.fn();

    autorun(() => {
        value(input.value);
    });
    batch(() => {
        // 修改字段名，文档中没有这个方法说明
        input.locate("select");
        // input.value = "123";
    });
    
    // 第一次调用是初始化，值没有定义所以是 undefined
    // 第二次调用是修改字段名，虽然值没改，但还是发起了计算，所以得到的还是 undefined
    expect(value).toHaveBeenNthCalledWith(2, undefined);
    expect(input.path.toString()).toEqual("select");

    // 第三次修改了值，所以这次得到的是 123
    batch(() => {
        input.value = "123";
    });
    expect(value).toHaveBeenNthCalledWith(3, "123");
});

// 重置对象字段
test("object field reset", async () => {
    const form = attach(createForm());
    attach(form.createObjectField({ name: "obj" }));

    const input = attach(form.createField({ basePath: "obj", name: "input" }));

    form.setValues({ obj: { input: "123" } });
    expect(input.value).toEqual("123");

    await form.reset();
    expect(input.value).toBeUndefined();
});

// 字段展示状态决定默认值是否有效
test("field visible default value should work", () => {
    const form = attach(createForm({
        effects(form) {
            onFieldReact("obj", field => {
                field.visible = form.values.select !== "none";
            });
            onFieldReact("obj.input1", field => {
                field.pattern = "disabled";
                if (isField(field)) {
                    field.initialValue = "123";
                }
            });
            onFieldReact("obj.input2", field => {
                if (isField(field)) {
                    field.value = form.values.select;
                }
            });
        }
    }));

    const select = attach(form.createField({ name: "select" }));
    attach(form.createObjectField({ name: "obj" }));
    attach(form.createField({ basePath: "obj", name: "input1" }));
    attach(form.createField({ basePath: "obj", name: "input2" }));

    select.value = "none";
    expect(form.values.obj?.input1).toBeUndefined();
    expect(form.getFieldState("obj.input1", state => state.display)).toEqual("none");

    select.value = "visible";
    expect(form.values.obj?.input1).toEqual("123");
    expect(form.values.obj?.input2).toEqual("visible");
});

// 通过相邻路径查找值
test("query value with sibling path syntax", () => {
    const form = attach(createForm());
    const fn = jest.fn();

    attach(form.createVoidField({ name: "void" }));
    attach(form.createObjectField({ basePath: "void", name: "obj" }));
    attach(form.createField({
        basePath: "void.obj",
        name: "input",
        reactions: [
            field => fn(
                field.query(".textarea").value(),
                field.query(".textarea").initialValue(),
            )
        ]
    }));

    const textarea = attach(form.createField({
        basePath: "void.obj",
        initialValue: "aaa",
        name: "textarea",
    }));
    
    textarea.value = "123";
    expect(fn).toHaveBeenCalledWith("123", "aaa");
});

// 相对路径查找虚拟节点下的字段
test("relative query with void field", () => {
    const form = attach(createForm());

    attach(form.createVoidField({ name: "void" }));
    const aa = attach(form.createField({ basePath: "void", name: "aa" }));

    attach(form.createVoidField({ name: "mm" }));
    const bb = attach(form.createField({ basePath: "mm", name: "bb" }));

    // bb 向上查找一个节点 . 然后相邻的虚拟节点可以省略直接查找 .a
    expect(bb.query(".").take()?.path.toString()).toEqual("mm");
    expect(bb.query(".aa").take()).toBe(aa);
});

// 表单值和字段值定义和覆盖
test("empty string or number or null value need rewite default value", () => {
    const form = attach(createForm<Partial<Record<string, number|string|null>>>({
        initialValues: { dd: 321 },
        values: { aa: "", bb: 0, ee: null }
    }));

    attach(form.createField({ initialValue: "test", name: "aa" }));
    attach(form.createField({ initialValue: 123, name: "bb" }));
    attach(form.createField({ initialValue: "test", name: "cc" }));
    attach(form.createField({ initialValue: 123, name: "dd" }));
    attach(form.createField({ initialValue: "test", name: "ee" }));

    // 表单设置了 value，字段设置了 initialValue，form 设置了值不会覆盖，没有的值会被覆盖
    expect(form.initialValues.aa).toEqual("test");
    expect(form.values.aa).toEqual("");

    expect(form.initialValues.bb).toEqual(123);
    expect(form.values.bb).toEqual(0);

    expect(form.initialValues.cc).toEqual("test");
    expect(form.values.cc).toEqual("test");

    expect(form.initialValues.dd).toEqual(321);
    expect(form.values.dd).toEqual(321);

    expect(form.initialValues.ee).toEqual("test");
    expect(form.values.ee).toEqual(null);
});

// 销毁字段同时销毁值
test("destroy field need auto remove initialValue", () => {
    const form = attach(createForm());
    const aa = attach(form.createField({ initialValue: "test", name: "aa" }));

    expect(form.initialValues.aa).toEqual("test");
    expect(form.values.aa).toEqual("test");

    aa.destroy();
    expect(form.initialValues.aa).toBeUndefined();
    expect(form.values.aa).toBeUndefined();
});

// 字段校验是否只校验第一个非法规则
test("validateFirst", async () => {
    const form = attach(createForm({ validateFirst: false }));
    const aaValidate = jest.fn(() => "aaError");
    const bbValidate = jest.fn(() => "bbError");
    const ccValidate = jest.fn(() => "ccError");

    const aa = attach(form.createField({ 
        name: "aa",
        validateFirst: true,
        validator: [aaValidate, aaValidate]
    }));

    const bb = attach(form.createField({ 
        name: "bb",
        validateFirst: false,
        validator: [bbValidate, bbValidate]
    }));

    const cc = attach(form.createField({ 
        name: "cc",
        validator: [ccValidate, ccValidate]
    }));

    await aa.onInput("aa");
    await bb.onInput("bb");
    await cc.onInput("cc");

    expect(aaValidate).toHaveBeenCalledTimes(1);
    expect(bbValidate).toHaveBeenCalledTimes(2);
    expect(ccValidate).toHaveBeenCalledTimes(2);
});

// 注销字段不再响应联动
test("reactions should not be triggered when field destroyed", () => {
    const form = attach(createForm());
    const handler = jest.fn();
    const obs = observable({ bb: 123 });
    const aa = attach(form.createField({
        initialValue: "test",
        name: "aa",
        reactions() {
            handler(obs.bb);
        }
    }));

    // 初始化执行 1 次
    expect(handler).toHaveBeenCalledTimes(1);

    // 修改响应值执行 1 次
    obs.bb = 321;
    expect(handler).toHaveBeenCalledTimes(2);

    aa.destroy();
    obs.bb = 111;

    // 注销字段后不再响应
    expect(handler).toHaveBeenCalledTimes(2);
});

// 父级设置 readPretty 会覆盖 disabled、readOnly 的子集 pattern
test("parent readPretty will overwrite self disabled or readOnly", () => {
    const form = attach(createForm({ readPretty: true }));
    const aa = attach(form.createField({ 
        disabled: true, initialValue: "test", name: "aa" 
    }));

    const bb = attach(form.createField({ 
        editable: true, initialValue: "test", name: "bb" 
    }));

    const cc = attach(form.createField({ 
        initialValue: "test", name: "aa", pattern: "readOnly"
    }));

    expect(aa.pattern).toBe("readPretty");
    expect(bb.pattern).toBe("editable");
    expect(cc.pattern).toBe("readPretty");
});

// 字段验证错误，在字段验证中不影响其他字段验证状态
test("conflict name for errors filter", async () => {
    const form = attach(createForm());
    const aa = attach(form.createField({ name: "aa", required: true }));
    const aa1 = attach(form.createField({ name: "aa1", required: true }));

    await aa1.onInput("");
    expect(aa1.invalid).toBeTruthy();
    expect(aa.invalid).toBeFalsy();
});

// 字段注销后赋值，将不再合并到表单值中
test("field destroyed can not be assign value", () => {
    const form = attach(createForm());
    const aa = attach(form.createField({ name: "aa" }));

    aa.destroy();
    aa.initialValue = 222;
    aa.value = 111;

    expect(form.initialValues).toEqual({});
    expect(form.values).toEqual({});
});

// 通过 onInput 通过 target 传值
test("onInput could pass value with target", async () => {
    const form = attach(createForm());
    const aa = attach(form.createField({ name: "aa" }));
    const bb = attach(form.createField({ name: "bb" }));

    // 文档中演示了一个错误示范
    await aa.onInput({ target: "123" });
    expect(aa.value).toEqual({ target: "123" });

    //  正确的传值方式
    await bb.onInput({ target: { value: "123" } });
    expect(bb.value).toEqual("123");
});

// 表单初始值忽略已注销的字段、展示状态 display: none 的字段
test("field destroyed or display none should not be assign value form patch initialValues", () => {
    const form = attach(createForm());
    const aa = attach(form.createField({ display: "none", name: "aa" }));

    aa.initialValue = "123";
    expect(form.values).toEqual({});

    aa.display = "visible";
    expect(aa.value).toBe("123");
    expect(form.values).toEqual({ aa: "123" });

    aa.destroy();
    expect(form.values).toEqual({});
});

// 注销字段不再响应联动-1
test("onFieldReact with field destroyed", () => {
    const fn = jest.fn();
    const obs = observable({ value: 123 });
    const form = attach(createForm({
        effects() {
            onFieldReact("aa", () => fn(obs.value));
        }
    }));

    // 表单初始化不执行
    expect(fn).toHaveBeenCalledTimes(0);

    // 字段初始化执行一次
    const aa = attach(form.createField({ name: "aa" }));
    expect(fn).toHaveBeenCalledTimes(1);

    // 赋值后执行一次
    obs.value = 321;
    expect(fn).toHaveBeenCalledTimes(2);

    aa.destroy();
    obs.value = 111;

    // 注销字段后，不再响应联动
    expect(fn).toHaveBeenCalledTimes(2);
});

// 字段 actions、字段方法注入、调用
test("field actions", () => {
    const form = attach(createForm());
    const aa = attach(form.createField({ name: "aa" }));

    expect(aa.actions).toEqual({});
    
    aa.inject({
        testa: () => 123,
    });
    expect(aa.invoke("testa")).toEqual(123);
    
    const fn = {
        testa: () => 321,
    };
    aa.inject(fn);
    expect(aa.invoke("testa")).toEqual(321);
    expect(aa.actions).toEqual(fn);
});

// 字段隐藏保留值和不保留值
test("field hidden value", () => {
    const form = attach(createForm());
    const aa = attach(form.createField({
        initialValue: "123",
        name: "aa",
        hidden: true,
    }));

    const arrayField = attach(form.createArrayField({ hidden: true, name: "array" }));
    const objectField = attach(form.createObjectField({ hidden: true, name: "object" }));

    expect(form.values).toEqual({ aa: "123", array: [], object: {} });

    // 隐藏字段不保留值
    aa.setDisplay("none");
    arrayField.setDisplay("none");
    objectField.setDisplay("none");
    expect(aa.value).toBeUndefined();
    expect(arrayField.value).toBeUndefined();
    expect(objectField.value).toBeUndefined();

    // 隐藏字段保留值
    aa.setDisplay("hidden");
    arrayField.setDisplay("hidden");
    objectField.setDisplay("hidden");
    expect(aa.value).toEqual("123");
    expect(arrayField.value).toEqual([]);
    expect(objectField.value).toEqual({});
});

// 解构字段的展示状态
test("field destructor path with display none", () => {
    const form = attach(createForm());
    const aa = attach(form.createArrayField({ name: "[aa,bb]" }));

    expect(form.values).toEqual({ aa: undefined, bb: undefined });

    // 直接将解构字段隐藏，解构的值将全部隐藏
    aa.setDisplay("none");
    expect(form.values).toEqual({});
    expect(aa.value).toEqual([]);
});

// onInput 修改规则
test("onInput should ignore HTMLInputEvent propagation", async () => {
    const form = attach(createForm());
    const aa = attach(form.createField({ name: "aa" }));
    const mockHTMLInput = { value: "321" };
    const mockHTMLUpdate = { value: "2" };
    const mockDomEvent = { createTarget: mockHTMLInput, target: mockHTMLInput };

    await aa.onInput(mockDomEvent);
    expect(aa.value).toEqual("321");

    // 传入的 currentTarget 不一致，无法修改值，由于 currentTarget 和 target 是一个对象，会进行深度全等比较
    await aa.onInput({ currentTarget: { value: "4" }, target: { value: "2" } });
    expect(aa.value).toEqual("321");

    // 传入的值一致，可以修改值
    await aa.onInput({ currentTarget: mockHTMLUpdate, target: mockHTMLUpdate });
    expect(aa.value).toEqual("2");

    // 不定义 currentTarget 会忽略比较，强制修改
    await aa.onInput({ target: { value: "123" } });
    expect(aa.value).toEqual("123");

});

test("onFocus and onBlur with invalid target value", async () => {
    const form = attach(createForm());
    const field = attach(form.createField({
        name: "aa",
        validateFirst: true,
        value: "111",
        validator: [
            {
                format: "date",
                triggerType: "onFocus",
            },
            {
                format: "url",
                triggerType: "onBlur",
            }
        ],
    }));

    // 在 onFocus 和 onBlur 中传递一个空对象的 target，将跳过触发事件
    await field.onFocus({ target: {} });
    expect(field.selfErrors).toEqual([]);

    await field.onBlur({ target: {} });
    expect(field.selfErrors).toEqual([]);

    // 不传递任何参数将触发验证
    await field.onFocus();
    expect(field.selfErrors).toEqual([
        "The field value is not a valid date format"
    ]);

    // 错误是叠加上去的，虽然每次只验证第一个错误
    await field.onBlur();
    expect(field.selfErrors).toEqual([
        "The field value is not a valid date format",
        "The field value is a invalid url"
    ]);
});