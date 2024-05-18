import { FC } from "react";
import Panel from "../Panel";
import { Field, FormProvider } from "./Context";
import Input from "./Input";
import Password from "./Password";
import { data } from "./server";

const CoreReactive: FC = () => (
    <Panel
        header={
            <h2>
                仅用 <code>@formily/reactive</code> 实现表单逻辑
            </h2>
        }>
        <FormProvider form={data}>
            <button
                onClick={() => {
                    const { componentProps } = data.name;
                    const index = componentProps.placeholder?.indexOf("你是谁") ?? 0;
                    componentProps.placeholder = index > -1 ? "我是谁" : "你是谁";
                }}>
                切换 name 组件的 {"componentProps[placeholder]"}
            </button>
            <Field name="name" />
            <Field name="nameLength" />
            <button
                onClick={() => {
                    const { decoratorProps } = data.age;
                    const { style = {} } = decoratorProps;
                    decoratorProps.style = {
                        ...style,
                        backgroundColor: style.backgroundColor === "#eee" ? undefined : "#eee",
                    };
                }}>
                切换 age 组件的 {"decoratorProps[style.height]"}
            </button>
            <Field name="age" />
            <button
                onClick={() => {
                    const { component } = data.password;
                    data.password.component = component === Password ? Input : Password;
                }}>
                切换 password 组件的 Component
            </button>
            <Field name="password" />
        </FormProvider>
    </Panel>
);

export default CoreReactive;
