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
    <Panel
        footer={
            <div>
                <p>优化：</p>
                <ul>
                    <li>
                        <code>schema</code> 的类型直接沿用了 <code>ISchema</code>，并没有像文档那样自定义
                    </li>
                    <li>
                        完全按照 <code>formily</code> 来处理，通过 <code>createSchemaField</code> 返回一个{" "}
                        <code>SchemaField</code> 组件用来解析 <code>Schema</code>
                    </li>
                    <li>
                        完全按照 <code>React</code> 组件规范来，将模型渲染分成 3 个组件 <code>RenderCom</code>、
                        <code>RenderProperties</code>、<code>RecursionField</code>
                        ，而并非在一个组件中，通过传统函数的形式渲染
                    </li>
                </ul>
                <p>原理：</p>
            </div>
        }
        header={<h2>Core4.1: 复现 JsonSchema</h2>}>
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
