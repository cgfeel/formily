import { FC } from "react";
import SchemaField from "./SchemaPropertyField";

const GroupSchema: FC = () => (
    <SchemaField.Array name="group" x-component="ArrayItems" x-decorator="FormItem">
        <SchemaField.Object>
            <SchemaField.Void name="input" x-component="Space">
                <SchemaField.Void x-component="ArrayItems.SortHandle" x-decorator="FormItem" />
            </SchemaField.Void>
            <SchemaField.String
                name="print"
                title="输出"
                x-component="ReadPretty"
                x-decorator="FormItem"
                x-decorator-props={{ style: { paddingLeft: 24 } }}
                x-reactions={print}
            />
        </SchemaField.Object>
        <SchemaField.Void title="添加条目" x-component="ArrayItems.Addition" />
    </SchemaField.Array>
);

export default GroupSchema;
