import { FC } from "react";
import Panel from "../Panel";
import { FormConsumer, FormProvider } from "./Context";
import { createForm } from "@formily/core";
import { ArrayField, Field, ObjectField } from "./CustomField";
import VoidComponent from "./components/VoidComponent";
import Input from "../coreReactive/Input";
import InputDigit from "../coreReactive/InputDigit";
import ArrayItem from "./components/ArrayItem";
import FormItem from "./components/FormItem";

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
    <Panel>
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
                            title="test"
                            component={[Input, { placeholder: "电话" }]}
                            decorator={[FormItem]}
                            validator={{ format: "phone" }}
                            required
                        />
                        <Field
                            name="mail"
                            title="test"
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
