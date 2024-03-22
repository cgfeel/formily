import { createForm } from "@formily/core";
import { FC } from "react";
import Panel from "./Panel";
import SchemaField from "./SchemaField";

const form = createForm();

const MarkupSchema: FC = () => (
    <Panel
        form={form}
        header={
            <h2>
                通过<code>Markup Schema</code>创建 <code>FormItem</code>
            </h2>
        }>
        <SchemaField>
            <SchemaField.String name="name" title="输入框" x-component="Input" x-decorator="FormItem" required />
        </SchemaField>
    </Panel>
);

export default MarkupSchema;
