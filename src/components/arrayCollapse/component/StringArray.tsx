import { FC } from "react";
import SchemaField from "../SchemaField";

const StringArray: FC = () => (
    <SchemaField.Array
        maxItems={3}
        name="string_array"
        x-component="ArrayCollapse"
        x-decorator="FormItem"
        x-component-props={{
            accordion: true,
            defaultOpenPanelCount: 3,
        }}>
        <SchemaField.Void
            x-component="ArrayCollapse.CollapsePanel"
            x-component-props={{
                header: "字符串数组",
            }}>
            <SchemaField.Void x-component="ArrayCollapse.Index" />
            <SchemaField.String name="input" title="Input" x-component="Input" x-decorator="FormItem" required />
            <SchemaField.Void x-component="ArrayCollapse.Remove" />
            <SchemaField.Void x-component="ArrayCollapse.MoveUp" />
            <SchemaField.Void x-component="ArrayCollapse.MoveDown" />
        </SchemaField.Void>
        <SchemaField.Void title="添加条目" x-component="ArrayCollapse.Addition" />
    </SchemaField.Array>
);

export default StringArray;
