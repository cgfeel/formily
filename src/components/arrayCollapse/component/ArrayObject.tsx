import { onFieldChange, onFieldReact } from "@formily/core";
import { FC } from "react";
import SchemaField from "../SchemaField";

const effects = () => {
    // 主动联动模式
    onFieldChange("array.*.aa", ["value"], (field, form) => {
        form.setFieldState(field.query(".bb"), state => {
            if ("value" in field) state.visible = field.value !== "123";
        });
    });
    // 被动联动模式
    onFieldReact("array.*.dd", field => {
        field.visible = field.query(".cc").get("value") !== "123";
    });
};

const ArrayObject: FC = () => (
    <SchemaField.Array maxItems={3} name="array" x-component="ArrayCollapse" x-decorator="FormItem">
        <SchemaField.Object
            x-component="ArrayCollapse.CollapsePanel"
            x-component-props={{
                header: "对象数组",
            }}>
            <SchemaField.String
                description="AA 输入 123 时隐藏 BB"
                name="aa"
                title="AA"
                x-component="Input"
                x-decorator="FormItem"
                required
            />
            <SchemaField.String name="bb" title="BB" x-component="Input" x-decorator="FormItem" required />
            <SchemaField.String
                description="CC 输入 123 时隐藏 DD"
                name="cc"
                title="CC"
                x-component="Input"
                x-decorator="FormItem"
                required
            />
            <SchemaField.String name="dd" title="DD" x-component="Input" x-decorator="FormItem" required />
            <SchemaField.Void x-component="ArrayCollapse.Index" />
            <SchemaField.Void x-component="ArrayCollapse.Remove" />
            <SchemaField.Void x-component="ArrayCollapse.MoveUp" />
            <SchemaField.Void x-component="ArrayCollapse.MoveDown" />
        </SchemaField.Object>
        <SchemaField.Void title="添加条目" x-component="ArrayCollapse.Addition" />
    </SchemaField.Array>
);

export { effects };

export default ArrayObject;
