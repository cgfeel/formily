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
                <p>表单渲染原理：</p>
                <ul>
                    <li>
                        在 <code>ReactiveField</code> 中将 <code>component</code> 这个 <code>props</code> 指定的组件{" "}
                        <code>createElement</code> 一个新的元素，并将自身的 <code>children</code>{" "}
                        透传以便后续遍历继续生成；如果没有提供则为 <code>null</code>
                    </li>
                    <li>
                        创建包装对象 <code>decorator</code>，方法和 <code>component</code> 一样，并将{" "}
                        <code>component</code> 作为子元素；如果没有提供则为 <code>null</code>
                    </li>
                    <li>
                        将上面创建的包装对象包裹在 <code>FieldContext</code> 以便后续使用
                    </li>
                    <li>
                        这样就可以在 <code>component</code> 和 <code>decorator</code>{" "}
                        中分别拿到字段和表单的上下文进行使用
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
