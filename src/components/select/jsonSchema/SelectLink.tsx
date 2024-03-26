import { createForm } from "@formily/core";
import { ISchema } from "@formily/react";
import { FC } from "react";
import Panel from "../Panel";
import SchemaField from "../SchemaField";
import { boundData, loadData } from "../action/asyncLinker";

const form = createForm();
const schema: ISchema = {
    type: "object",
    properties: {
        linkage: {
            required: true,
            title: "联动选择框",
            type: "string",
            "x-component": "Select",
            "x-decorator": "FormItem",
            enum: [
                { label: "发送请求1", value: 1 },
                { label: "发送请求2", value: 2 },
            ],
        },
        select: {
            required: true,
            title: "异步选择框",
            type: "string",
            "x-component": "Select",
            "x-decorator": "FormItem",
            "x-reactions": ["{{boundData(loadData)}}"],
        },
    },
};

const SelectLink: FC = () => (
    <Panel
        form={form}
        header={
            <h2>
                <code>Json Schema</code> 异步联动数据源案例
            </h2>
        }>
        <SchemaField schema={schema} scope={{ boundData, loadData }} />
    </Panel>
);

export default SelectLink;
