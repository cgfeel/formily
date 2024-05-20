import { Field as FieldType, Form, createEffectHook, createForm, isField, onFieldReact } from "@formily/core";
import { FC } from "react";
import { Field, FormProvider } from "./Context";
import Panel from "../Panel";
import Input from "../coreReactive/Input";
import FormItem from "./FormItem";
import Label from "../coreReactive/Label";
import Button from "./Button";
import InputDigit from "../coreReactive/InputDigit";
import Password from "../coreReactive/Password";

const data = { upname: "name", upage: "age", uppwd: "password" } as const;
const ispath = (data: object, key: string): key is keyof typeof data => key in data;

const customProps = createEffectHook("custom-props", (payload: string, form: Form) => {
    const name = ispath(data, payload) ? data[payload] : void 0;
    return listener => listener(name ? form.query(name).take() : name);
});

const form = createForm({
    initialValues: {
        password: "123",
    },
    effects: () => {
        onFieldReact(
            "nameLength",
            field => isField(field) && field.setValue(field.query(".name").value()?.length || 0),
        );
        customProps((field?: FieldType) => {
            if (!isField(field)) return;
            const address = field.address.toString();
            switch (address) {
                case "age":
                    const { style = {} } = field.decoratorProps;
                    field.setDecoratorProps({
                        style: { ...style, backgroundColor: style.backgroundColor === "#eee" ? undefined : "#eee" },
                    });
                    break;
                case "name":
                    const { placeholder = "" } = field.componentProps;
                    const tips = placeholder.indexOf("你是谁") < 0 ? "你是谁" : "我是谁";

                    field.setComponentProps({ placeholder: tips });
                    break;
                case "password":
                    const { component } = field;
                    const raw = Array.isArray(component) ? component[0] : component;

                    field.setComponent(raw === Password ? Input : Password);
                    break;
            }
        });
    },
});

const CoreForm: FC = () => (
    <Panel>
        <FormProvider form={form}>
            <Field
                name="upname"
                component={[Button, { children: "切换 name 组件的 componentProps[placeholder]" }]}
                decorator={[FormItem, { style: { height: "auto" } }]}
            />
            <Field
                name="name"
                title="名称"
                component={[Input, { placeholder: "你是谁" }]}
                decorator={[FormItem]}
                required
            />
            <Field name="nameLength" title="名称长度" component={[Label, {}]} decorator={[FormItem]} required />
            <Field
                name="upage"
                component={[Button, { children: "切换 age 组件的 componentProps[style.background]" }]}
                decorator={[FormItem, { style: { height: "auto" } }]}
            />
            <Field name="age" title="年龄" component={[InputDigit]} decorator={[FormItem]} required />
            <Field
                name="uppwd"
                component={[Button, { children: "切换 password 组件的 component" }]}
                decorator={[FormItem, { style: { height: "auto" } }]}
            />
            <Field name="password" title="密码" component={[Password]} decorator={[FormItem]} required />
        </FormProvider>
    </Panel>
);

export default CoreForm;
