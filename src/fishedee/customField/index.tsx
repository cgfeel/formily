import { createForm } from "@formily/core";
import { FC } from "react";
import Panel from "../Panel";
import Input from "../coreReactive/Input";
import InputDigit from "../coreReactive/InputDigit";
import { FormConsumer, FormProvider } from "./Context";
import { ArrayField, Field, ObjectField } from "./CustomField";
import ArrayItem from "./components/ArrayItem";
import FormItem from "./components/FormItem";
import VoidComponent from "./components/VoidComponent";

const form = createForm({
    initialValues: {
        person: {
            name: "levi",
            age: 12,
        },
        contact: [
            {
                phone: "1234567890123",
                mail: "11@22.com",
            },
        ],
    },
});

const CustomField: FC = () => (
    <Panel
        footer={
            <div>
                <p>说明：</p>
                <ul>
                    <li>
                        借助 <code>core</code> 实现 <code>Field</code> 和包装器 <code>decorator</code>
                        ，实现表单验证、赋值嵌套、递增的能力
                    </li>
                    <li>
                        这里没有复现 <code>effect</code>，不包含生命周期和受控部分，主要复现表单渲染逻辑
                    </li>
                    <li>
                        文档中 <code>ArrayField</code> 和 <code>ObjectField</code>{" "}
                        是分开写的，这里整合优化了，建议查看源码看改动部分
                    </li>
                </ul>
                <p>实现原理：</p>
                <ul>
                    <li>
                        创建一个 <code>FormProvider</code> 作为数据支持
                    </li>
                    <li>
                        在 <code>ArrayField/Field/ObjectField</code> 中：
                        <ul>
                            <li>
                                通过 <code>props</code> 传递 <code>field</code> 所需的属性
                            </li>
                            <li>
                                通过 <code>ReactiveField</code> 包裹 <code>FieldContext</code>
                            </li>
                            <li>
                                通过 <code>useContext(FieldContext)</code> 获取父级路径，通过 <code>basePath</code> 关联
                            </li>
                        </ul>
                    </li>
                    <li>
                        通过 <code>React</code> 组件的层级特性，通过 <code>children</code> 递归包裹{" "}
                        <code>FieldContext</code>
                    </li>
                </ul>
                <p>
                    渲染原理（理基在 <code>reactive</code> + <code>core</code> 基础上）：
                </p>
                <ul>
                    <li>
                        将原来的 <code>Field</code> 改为一个基础组件 <code>ReactiveField</code>，不再组件内部创建{" "}
                        <code>Field</code> 而是接受一个 <code>Field</code> 对象的 <code>props</code>，允许{" "}
                        <code>component</code> 或 <code>decorator</code> 没有提供的情况（设置为 <code>null</code>）
                    </li>
                    <li>
                        对外将 <code>Field</code> 分别拆分为 <code>Field</code>、<code>ArrayField</code>、
                        <code>ObjectField</code>，通过包裹 <code>ReactiveField</code> 提供 <code>context</code>
                    </li>
                </ul>
                <p>备注：</p>
                <ul>
                    <li>
                        <code>Field</code> 中组件和包装组件渲染见 1: <code>Field</code> 实践案例
                    </li>
                </ul>
            </div>
        }
        header={
            <h2>
                复现 <code>Field</code> 字段
            </h2>
        }>
        <FormProvider form={form}>
            <ObjectField name="person" title="个人信息" decorator={[VoidComponent]}>
                <Field name="name" title="名称" component={[Input]} decorator={[FormItem]} required />
                <Field name="age" title="年龄" component={[InputDigit]} decorator={[FormItem]} required />
            </ObjectField>
            <ArrayField name="contact" title="联系信息" component={[ArrayItem]} decorator={[VoidComponent]}>
                {index => (
                    <ObjectField name={index} title="信息" decorator={[FormItem]}>
                        <Field
                            name="phone"
                            component={[Input, { placeholder: "电话" }]}
                            decorator={[FormItem]}
                            validator={{ format: "phone" }}
                            required
                        />
                        <Field
                            name="mail"
                            component={[Input, { placeholder: "邮箱" }]}
                            decorator={[FormItem]}
                            validator={{ format: "email" }}
                            required
                        />
                    </ObjectField>
                )}
            </ArrayField>
            <code className="consumer">
                <pre>
                    <FormConsumer>{form => JSON.stringify(form.values, null, 2)}</FormConsumer>
                </pre>
            </code>
        </FormProvider>
    </Panel>
);

export default CustomField;
