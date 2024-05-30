import { FC } from "react";
import SchemaField from "../SchemaField";

const SubItemSchema: FC = () => (
    <SchemaField.Array name="select-items" title="子物料" x-component="ArrayTable" x-decorator="FormItem">
        <SchemaField.Object>
            <SchemaField.Void
                x-component="ArrayTable.Column"
                x-component-props={{ dataIndex: "column1", title: "默认配置" }}>
                <SchemaField.String
                    default={1}
                    name="amount"
                    x-component="NumberPicker"
                    x-decorator="FormItem"
                    required
                />
            </SchemaField.Void>
            <SchemaField.Void
                x-component="ArrayTable.Column"
                x-component-props={{ dataIndex: "column2", title: "价格" }}>
                <SchemaField.String
                    default={1}
                    name="price"
                    x-component="NumberPicker"
                    x-decorator="FormItem"
                    required
                />
            </SchemaField.Void>
        </SchemaField.Object>
    </SchemaField.Array>
);

export default SubItemSchema;
