import { createForm } from "@formily/core";
import { FC } from "react";
import Panel from "../../Panel";
import SchemaField, { renderTmp } from "./SchemaField";

const form = createForm();

const MarkupSchema: FC = () => (
    <Panel
        footer={
            <div>
                <p>
                    和 <code>RecodeScope</code> 一样，不同的是接受数组对象，不提供 <code>$lookup</code> 一层一层往上查找
                </p>
            </div>
        }
        form={form}
        header={
            <h2>
                <code>RecordsScope</code> - MarkupSchema
            </h2>
        }>
        <SchemaField scope={{ renderTmp }}>
            <SchemaField.Void
                name="record_field"
                x-component="MyCustomComponent"
                x-component-props={{ records: [{ code: "Code", name: "Name" }] }}>
                <SchemaField.String
                    name="index"
                    x-component="Input"
                    x-decorator="FormItem"
                    x-value="{{renderTmp($records)}}"
                />
            </SchemaField.Void>
        </SchemaField>
    </Panel>
);

export default MarkupSchema;
