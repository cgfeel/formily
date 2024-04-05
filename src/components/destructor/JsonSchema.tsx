import { createForm } from "@formily/core";
import { ISchema } from "@formily/react";
import { FC } from "react";
import Panel from "./Panel";
import SchemaField from "./SchemaField";

const form = createForm();
const schema: ISchema = {
    type: "object",
    properties: {
        visible_destructor: {
            default: true,
            title: "是否显示解构字段",
            type: "boolean",
            "x-component": "Radio.Group",
            "x-decorator": "FormItem",
            enum: [
                { label: "是", value: true },
                { label: "否", value: false },
            ],
            "x-reactions": {
                target: "[startDate,endDate]",
                fulfill: {
                    state: {
                        visible: "{{!!$self.value}}",
                    },
                },
            },
        },
        undestructor: {
            required: true,
            title: "解构前",
            type: "array",
            "x-component": "DatePicker.RangePicker",
            "x-decorator": "FormItem",
        },
        "[startDate,endDate]": {
            required: true,
            default: ["2020-11-20", "2021-12-30"],
            title: "解构后",
            type: "array",
            "x-component": "DatePicker.RangePicker",
            "x-decorator": "FormItem",
        },
    },
};

const JsonSchema: FC = () => (
    <Panel
        form={form}
        header={
            <h2>
                通过 <code>Json Schema</code> 解构数据
            </h2>
        }>
        <SchemaField schema={schema} />
    </Panel>
);

export default JsonSchema;
