import { createForm } from "@formily/core";
import { FC } from "react";
import Panel from "../Panel";
import { fetchAddress } from "../action/asyncLoader";
import SchemaField from "./SchemaField";

const form = createForm();

const SelectScope: FC = () => (
    <Panel
        form={form}
        header={
            <h2>
                通过 <code>scope</code> 初始只加载一次
            </h2>
        }>
        <SchemaField scope={{ fetchAddress: fetchAddress("scope loader") }}>
            <SchemaField.String
                name="select"
                title="选择框"
                x-component="Select"
                x-decorator="FormItem"
                x-component-props={{ allowClear: true }}
                x-reactions="{{fetchAddress}}"
                required
            />
        </SchemaField>
    </Panel>
);

export default SelectScope;
