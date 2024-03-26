import { createForm } from "@formily/core";
import { FC } from "react";
import Panel from "../Panel";
import SchemaField from "../SchemaField";
import asyncSearch from "../action/asyncSearch";

const form = createForm({ effects: asyncSearch });

const SelectAsync: FC = () => (
    <Panel
        footer={
            <p>
                数据是通过 <code>MockJS</code> 模拟的数据，所以每次输入都能拿到不同的结果
            </p>
        }
        form={form}
        header={
            <h2>
                <code>Markup Schema</code> 异步搜索案例
            </h2>
        }>
        <SchemaField>
            <SchemaField.String
                name="select"
                title="异步搜索选择框"
                x-component="Select"
                x-decorator="FormItem"
                x-component-props={{ filterOption: false, showSearch: true }}
                required
            />
        </SchemaField>
    </Panel>
);

export default SelectAsync;
