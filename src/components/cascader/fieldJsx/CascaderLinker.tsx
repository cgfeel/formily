import { createForm } from "@formily/core";
import { Field } from "@formily/react";
import { FC } from "react";
import FormItem from "../../formItem/form-item";
import Panel from "../Panel";
import asyncSearch from "../action/asyncSearch";
import Cascader from "../cascader";

const form = createForm({ effects: asyncSearch });

const CascaderLinker: FC = () => (
    <Panel
        form={form}
        header={
            <h2>
                <code>Field Jsx</code> 异步加载数据源案例
            </h2>
        }>
        <Field
            name="select"
            title="选择框"
            component={[Cascader]}
            dataSource={[
                { isLeaf: false, label: "Zhejiang", value: 1 },
                { isLeaf: false, label: "Jiangsu", value: 2 },
            ]}
            decorator={[FormItem]}
            required
        />
    </Panel>
);

export default CascaderLinker;
