import { FC } from "react";
import SchemaField from "./SchemaField";

const CheckBox: FC = () => (
    <SchemaField.Void title="Antd.1.2: 多选与单选组件" x-component="VoidComponent">
        <SchemaField.Boolean name="checkbox" title="CheckBox" x-component="Checkbox" x-decorator="FormItem" required />
        <SchemaField.Boolean name="switch" title="Switch" x-component="Switch" x-decorator="FormItem" required />
        <SchemaField.Array
            name="checkbox-group"
            title="Checkbox.Group"
            x-component="Checkbox.Group"
            x-decorator="FormItem"
            enum={[
                { label: "Option 1", value: 1 },
                { label: "Option 2", value: 2 },
            ]}
            required
        />
        <SchemaField.Number
            name="radio-group"
            title="Radio.Group"
            x-component="Radio.Group"
            x-decorator="FormItem"
            enum={[
                { label: "Option 1", value: 1 },
                { label: "Option 2", value: 2 },
            ]}
            required
        />
    </SchemaField.Void>
);

export default CheckBox;
