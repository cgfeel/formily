import { createForm } from "@formily/core";
import { ISchema } from "@formily/react";
import { FC } from "react";
import Panel from "./Panel";
import SchemaField from "./SchemaField";

const form = createForm();

// 在 `layout: 'vertical'` 情况下，`labelCol`和`wrapperCol`都失效
const shcema: ISchema = {
    type: "object",
    properties: {
        layout: {
            type: "void",
            "x-component": "FormLayout",
            "x-component-props": {
                labelCol: 2,
                layout: "vertical",
                wrapperCol: 10,
            },
            properties: {
                name: {
                    required: true,
                    title: "姓名",
                    type: "string",
                    "x-component": "Input",
                    "x-decorator": "FormItem",
                    "x-decorator-props": {
                        tooltip: <div>123</div>,
                    },
                },
                sex: {
                    required: true,
                    type: "string",
                    title: "性别",
                    "x-component": "Select",
                    "x-decorator": "FormItem",
                    enum: [
                        { label: "男", value: 1 },
                        { label: "女", value: 2 },
                    ],
                },
            },
        },
    },
};

const JsonSchema: FC = () => (
    <Panel
        form={form}
        header={
            <h2>
                通过<code>Json Schema</code>创建 <code>FormLayout</code>
            </h2>
        }>
        <SchemaField schema={shcema} />
    </Panel>
);

export default JsonSchema;
