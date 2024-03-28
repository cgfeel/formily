import { createForm } from "@formily/core";
import { FC } from "react";
import Panel from "../Panel";
import SchemaField from "../SchemaField";
import asyncLinker from "../action/asyncLinker";

const form = createForm({ effects: asyncLinker });

const TreeSelectLinker: FC = () => (
    <Panel
        form={form}
        header={
            <h2>
                <code>Markup Schema</code> 异步联动数据源案例
            </h2>
        }>
        <SchemaField>
            <SchemaField.String
                name="linkage"
                title="联动选择框"
                x-component="Select"
                x-decorator="FormItem"
                enum={[
                    { label: "发请求1", value: 1 },
                    { label: "发请求2", value: 2 },
                ]}
                required
            />
            <SchemaField.String
                name="select"
                title="异步选择框"
                x-component="TreeSelect"
                x-decorator="FormItem"
                x-component-props={{ allowClear: true, treeDefaultExpandAll: true }}
                required
            />
        </SchemaField>
    </Panel>
);

export default TreeSelectLinker;
