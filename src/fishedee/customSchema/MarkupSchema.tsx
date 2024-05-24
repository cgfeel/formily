import { createForm } from "@formily/core";
import { FC } from "react";
import Panel from "../Panel";
import { FormConsumer, FormProvider } from "../customField/Context";
import SchemaField from "./SchemaField";

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

const MarkupSchema: FC = () => (
    <Panel header={<h2>Core4.2: 复现 JsonSchema</h2>}>
        <FormProvider form={form}>
            <SchemaField>
                <SchemaField.Object name="person" title="个人信息" x-decorator="VoidComponent">
                    <SchemaField.String
                        name="name"
                        title="姓名"
                        x-component="Input"
                        x-decorator="FormItem"
                        x-component-props={{ placeholder: "please input" }}
                        required
                    />
                    <SchemaField.String
                        name="age"
                        title="年龄"
                        x-component="InputDigit"
                        x-decorator="FormItem"
                        x-component-props={{ placeholder: "please input" }}
                        required
                    />
                </SchemaField.Object>
                <SchemaField.Array name="contact" title="联系信息" x-component="ArrayItem" x-decorator="VoidComponent">
                    <SchemaField.Object title="信息" x-decorator="FormItem">
                        <SchemaField.String
                            format="phone"
                            name="phone"
                            x-component="Input"
                            x-decorator="FormItem"
                            x-component-props={{ placeholder: "please input" }}
                            required
                        />
                        <SchemaField.String
                            format="email"
                            name="mail"
                            x-component="Input"
                            x-decorator="FormItem"
                            x-component-props={{ placeholder: "please input" }}
                            required
                        />
                    </SchemaField.Object>
                    <SchemaField.String
                        format="email"
                        name="mail"
                        x-component="Input"
                        x-decorator="FormItem"
                        x-component-props={{ placeholder: "please input" }}
                        required
                    />
                </SchemaField.Array>
            </SchemaField>
            <code className="consumer">
                <pre>
                    <FormConsumer>{form => JSON.stringify(form.values, null, 2)}</FormConsumer>
                </pre>
            </code>
        </FormProvider>
    </Panel>
);

export default MarkupSchema;
