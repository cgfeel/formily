import { createForm } from "@formily/core";
import { ISchema } from "@formily/react";
import { FC } from "react";
import Panel from "../Panel";
import SchemaField from "../SchemaField";
import { datasource } from "../server";

const form = createForm();
const schema: ISchema = {
    type: "object",
    properties: {
        select: {
            required: true,
            title: "选择框",
            type: "string",
            "x-component": "TreeSelect",
            "x-decorator": "FormItem",
            enum: datasource,
            "x-component-props": { allowClear: true, treeDefaultExpandAll: true },
        },
    },
};

const TreeSelectSync: FC = () => (
    <Panel form={form}>
        <SchemaField schema={schema} />
    </Panel>
);

export default TreeSelectSync;
