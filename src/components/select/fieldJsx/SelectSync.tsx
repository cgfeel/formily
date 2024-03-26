import { Select } from "@formily/antd-v5";
import { Field } from "@formily/react";
import { createForm } from "@formily/core";
import { FC } from "react";
import FormItem from "../../formItem/form-item";
import Panel from "../Panel";

const form = createForm();

const SelectSync: FC = () => (
    <Panel
        form={form}
        header={
            <h2>
                <code>Field Jsx</code> 同步数据源案例
            </h2>
        }>
        <Field
            name="select"
            title="选择框"
            component={[Select, { allowClear: true }]}
            dataSource={[
                { label: "选项1", value: 1 },
                { label: "选项2", value: 2 },
            ]}
            decorator={[FormItem]}
            required
        />
    </Panel>
);

export default SelectSync;
