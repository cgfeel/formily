import { createForm, onFieldReact } from "@formily/core";
import { FC } from "react";
import Panel from "../Panel";
import { fetchAddress } from "../action/asyncLoader";
import SchemaField from "./SchemaField";

const form = createForm({
    effects: () => {
        onFieldReact("select", fetchAddress("loader"));
    },
});

const SelectLoader: FC = () => (
    <Panel form={form} header={<h2>初始只加载一次</h2>}>
        <SchemaField>
            <SchemaField.String
                name="select"
                title="选择框"
                x-component="Select"
                x-decorator="FormItem"
                x-component-props={{ allowClear: true }}
                required
            />
        </SchemaField>
    </Panel>
);

export default SelectLoader;
