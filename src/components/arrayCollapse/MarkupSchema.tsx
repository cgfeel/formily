import { createForm } from "@formily/core";
import { FC } from "react";
import Pannel from "./Pannel";
import SchemaField from "./SchemaField";

const form = createForm({
    validateFirst: true,
});

const MarkupSchema: FC = () => (
    <Pannel form={form}>
        <SchemaField>
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
                        key: "panel1",
                    }}>
                    <SchemaField.Void x-component="ArrayCollapse.Index" />
                    <SchemaField.String
                        name="input"
                        title="Input"
                        x-component="Input"
                        x-decorator="FormItem"
                        required
                    />
                    <SchemaField.Void x-component="ArrayCollapse.Remove" />
                    <SchemaField.Void x-component="ArrayCollapse.MoveUp" />
                    <SchemaField.Void x-component="ArrayCollapse.MoveDown" />
                </SchemaField.Void>
                <SchemaField.Void title="添加条目" x-component="ArrayCollapse.Addition" />
            </SchemaField.Array>
        </SchemaField>
    </Pannel>
);

export default MarkupSchema;
