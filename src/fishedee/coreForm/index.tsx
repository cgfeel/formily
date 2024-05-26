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
                        style: { ...style, backgroundColor: style.backgroundColor === "#eee" ? void 0 : "#eee" },
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
    <Panel
        footer={
            <div>
                <p>
                    在演示过程中我将 <code>button</code> 也作为了 <code>Field</code>，通过自定义 <code>effect</code>{" "}
                    通过 <code>form.notify</code> 实现表单联动
                </p>
                <p>
                    添加 <code>core</code> 后和之前仅用 <code>reactive</code> 对比的优点：
                </p>
                <ul>
                    <li>
                        表单值变得纯粹，如：<code>{"{ name: string, age: number }"}</code>
                        ，而之前将表单渲染、验证逻辑都加在表单值中
                    </li>
                    <li>支持表单路径查找、依赖收集，让表单联动变得可行</li>
                    <li>自动响应表单验证</li>
                    <li>拥有了生命周期</li>
                    <li>渲染逻辑和交互逻辑分离</li>
                </ul>
                <p>
                    渲染逻辑（原理基和仅使用 <code>reactive</code> 基本没变）：
                </p>
                <ul>
                    <li>
                        整个表单由 <code>observable</code> 更换为 <code>createForm</code> 创建的 <code>Form</code>{" "}
                        对象，在 <code>Form</code> 对象中实现数据响应
                    </li>
                    <li>
                        在 <code>Field</code> 封装过程中也通过 <code>form.createField</code>{" "}
                        来创建字段，并提供给上下文共享
                    </li>
                    <li>
                        这样就赋予了表单生命周期 <code>effect</code>，并且想有 <code>Field</code> 的验证、路径查找等能力
                    </li>
                </ul>
            </div>
        }
        header={
            <h2>
                core.10: 为之前的 <code>reactive</code> 表单增加 <code>core</code>
            </h2>
        }>
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
