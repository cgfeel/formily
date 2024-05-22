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
                <p>
                    借住 <code>core</code> 实现 <code>Field</code> 和包装器 <code>decorator</code>
                    ，实现表单验证、赋值嵌套、递增的能力
                </p>
                <p>
                    这里没有复现 <code>effect</code>，不包含生命周期和受控部分，主要复现表单渲染逻辑
                </p>
                <p>
                    文档中 <code>ArrayField</code> 和 <code>ObjectField</code>{" "}
                    是分开写的，这里整合了，由于两个字段有些许偏差，所以建议查看源码看改动部分
                </p>
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
