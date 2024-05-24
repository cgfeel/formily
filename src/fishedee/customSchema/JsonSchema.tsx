import { createForm } from "@formily/core";
import { ISchema } from "@formily/react";
import { FC } from "react";
import { FormConsumer, FormProvider } from "../customField/Context";
import Panel from "../Panel";
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

const schema: ISchema = {
    type: "object",
    properties: {
        person: {
            title: "个人信息",
            type: "object",
            "x-decorator": "VoidComponent",
            properties: {
                name: {
                    required: true,
                    title: "名称",
                    type: "string",
                    "x-component": "Input",
                    "x-decorator": "FormItem",
                },
                age: {
                    required: true,
                    title: "年龄",
                    type: "number",
                    "x-component": "InputDigit",
                    "x-decorator": "FormItem",
                },
            },
        },
        contact: {
            title: "联系信息",
            type: "array",
            "x-component": "ArrayItem",
            "x-decorator": "VoidComponent",
            items: {
                title: "信息",
                type: "object",
                "x-decorator": "FormItem",
                properties: {
                    phone: {
                        format: "phone",
                        required: true,
                        type: "string",
                        "x-component": "Input",
                        "x-decorator": "FormItem",
                        "x-component-props": {
                            placeholder: "电话",
                        },
                    },
                    mail: {
                        format: "email",
                        required: true,
                        type: "string",
                        "x-component": "Input",
                        "x-decorator": "FormItem",
                        "x-component-props": {
                            placeholder: "邮件",
                        },
                    },
                },
            },
        },
    },
};

const JsonSchema: FC = () => (
    <Panel>
        <FormProvider form={form}>
            <SchemaField schema={schema} />
            <code className="consumer">
                <pre>
                    <FormConsumer>{form => JSON.stringify(form.values, null, 2)}</FormConsumer>
                </pre>
            </code>
        </FormProvider>
    </Panel>
);

export default JsonSchema;
