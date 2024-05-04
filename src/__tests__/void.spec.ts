import { createForm } from "@formily/core";
import { FC } from "react";
import { attach } from "./shared";

const Component: FC = () => null;

// 创建虚拟节点，注销虚拟节点
test("create void field", () => {
    const form = attach(createForm());

    const field = attach(form.createVoidField({ name: "void" }));
    expect(form.fields['void']).toBeDefined();

    field.destroy();
    expect(form.fields['void']).toBeUndefined();
});

// 创建带有属性的虚拟节点
test("create void field props", () => {
    const form = attach(createForm());
    const field1 = attach(form.createVoidField({ 
        description: "This is Field 1",
        name: "field1",
        title: "Field1"
    }));

    const field2 = attach(form.createVoidField({
        disabled: true,
        hidden: true,
        name: "field2"
    }));

    const field3 = attach(form.createVoidField({
        name: "field3",
        readOnly: true,
        visible: false,
    }));

    expect(field1.description).toEqual("This is Field 1");
    expect(field1.title).toEqual("Field1");
    expect(field2.pattern).toEqual("disabled");
    expect(field2.disabled).toBeTruthy();
    expect(field2.display).toEqual("hidden");
    expect(field2.hidden).toBeTruthy();
    expect(field3.pattern).toEqual("readOnly");
    expect(field3.readOnly).toBeTruthy();
    expect(field3.display).toEqual("none");
    expect(field3.visible).toBeFalsy();
});

// 设置组件和组件属性
test("setComponent/setComponentProps", () => {
    const form = attach(createForm());
    const field = attach(form.createVoidField({ name: "aa" }));

    field.setComponent(Component, { props: 123 });
    expect(Array.isArray(field.component) ? field.component[0] : undefined).toEqual(Component);
    expect(Array.isArray(field.component) ? field.component[1] : undefined).toEqual({ props: 123 });

    field.setComponentProps({ hellow: "world" });
    expect(Array.isArray(field.component) ? field.component[1] : undefined).toEqual({ 
        hellow: "world", props: 123 
    });
});

// 设置标题、描述
test("setTitle/setDescription", () => {
    const form = attach(createForm());
    const aa = attach(form.createVoidField({ name: "aa" }));

    aa.setTitle("AAA");
    aa.setDescription("This is AAA");

    expect(aa.title).toEqual("AAA");
    expect(aa.description).toEqual("This is AAA");
});

// 设置组件和组件属性-1
test("setComponent/setComponentProps-1", () => {
    const form = attach(createForm());
    const field = attach(form.createVoidField({ name: "aa" }));

    field.setComponent(undefined, { props: 123 });
    field.setComponent(Component);

    expect(Array.isArray(field.component) ? field.component[0] : undefined).toEqual(Component);
    expect(Array.isArray(field.component) ? field.component[1] : undefined).toEqual({ props: 123 });

    field.setComponentProps({ hello: "world" });
    expect(Array.isArray(field.component) ? field.component[1] : undefined).toEqual({ 
        hello: "world", props: 123 
    });
});

// 设置包装器和包装器属性
test("setDecorator/setDecoratorProps", () => {
    const form = attach(createForm());
    const field = attach(form.createVoidField({ name: "aa" }));

    field.setDecorator(undefined, { props: 123 });
    field.setDecorator(Component);

    expect(Array.isArray(field.decorator) ? field.decorator[0] : undefined).toEqual(Component);
    expect(Array.isArray(field.decorator) ? field.decorator[1] : undefined).toEqual({ props: 123 });

    field.setDecoratorProps({ hello: "world" });
    expect(Array.isArray(field.decorator) ? field.decorator[1] : undefined).toEqual({ 
        hello: "world", props: 123 
    });
});

test("setState/getState", () => {
    const form = attach(createForm());
    const aa = attach(form.createVoidField({ name: "aa" }));
    const state = aa.getState();

    aa.setState(state => {
        state.title = "AAA";
    });
    expect(state.title).toEqual("AAA");

    aa.setState(state);
    expect(aa.title).toBeUndefined();

    aa.setState(state => {
        state.hidden = false;
    });
    expect(aa.display).toEqual("visible");
});