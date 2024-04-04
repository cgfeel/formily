import { createForm } from "@formily/core";
import { FC } from "react";
import Panel from "./Panel";
import SchemaField from "./SchemaField";

const form = createForm();

const IDcard: FC = () => (
    <Panel
        footer={
            <p>
                由于 <code>antd</code> 组件的 <code>props</code> 和 <code>formily</code> 组件是一致的，可以直接传递{" "}
                <code>props</code> 给组件实现联动，这种方式只能在 <code>Schema</code> 或 <code>Field</code> 中使用
            </p>
        }
        form={form}
        header={
            <h2>
                通过 <code>props</code> 转发给组件
            </h2>
        }>
        <SchemaField>
            <SchemaField.String name="idcard" title="身份验证" x-component="IDUpload" x-decorator="FormItem" required />
        </SchemaField>
    </Panel>
);

export default IDcard;
