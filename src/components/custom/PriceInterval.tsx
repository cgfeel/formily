import { createForm } from "@formily/core";
import { FC } from "react";
import Panel from "./Panel";
import SchemaField from "./SchemaField";

const form = createForm();

const PriceInterval: FC = () => (
    <Panel
        footer={
            <p>
                对于高度定制的 <code>antd</code> 组件，可以提取响应的 <code>props</code>{" "}
                实现联动，它的方式和受限也同样和 <code>props</code> 转发是一样的
            </p>
        }
        form={form}
        header={
            <h2>
                定制 <code>antd</code> 组件
            </h2>
        }>
        <SchemaField>
            <SchemaField.Object
                name="price"
                title="价格区间"
                x-component="PriceInterval"
                x-decorator="FormItem"
                required
            />
        </SchemaField>
    </Panel>
);

export default PriceInterval;
