import { Select } from "@formily/antd-v5";
import { createForm } from "@formily/core";
import { Field } from "@formily/react";
import { FC } from "react";
import FormItem from "../../formItem/form-item";
import Panel from "../Panel";
import asyncSearch from "../action/asyncSearch";

const form = createForm({ effects: asyncSearch });

const SelectAsync: FC = () => (
    <Panel
        form={form}
        header={
            <h2>
                <code>Field Jsx</code> 异步搜索案例
            </h2>
        }>
        <Field
            name="select"
            title="异步搜索选择框"
            component={[Select, { filterOption: false, showSearch: true }]}
            decorator={[FormItem]}
            required
        />
    </Panel>
);

export default SelectAsync;
