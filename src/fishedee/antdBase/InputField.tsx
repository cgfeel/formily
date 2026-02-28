import { FC } from "react";
import SchemaField from "./SchemaField";

const InputField: FC = () => (
  <SchemaField.Void title="Antd.1.1: 输入组件" x-component="VoidComponent">
    <SchemaField.String
      name="input"
      title="Input"
      x-component="Input"
      x-decorator="FormItem"
      required
    />
    <SchemaField.String
      name="input-textarea"
      title="Input.TextArea"
      x-component="Input.TextArea"
      x-decorator="FormItem"
      required
    />
    <SchemaField.String
      name="number-picker"
      title="NumberPicker"
      x-component="NumberPicker"
      x-decorator="FormItem"
      required
    />
    <SchemaField.String
      name="password"
      title="Password"
      x-component="Password"
      x-decorator="FormItem"
      x-component-props={{
        autoComplete: "off",
      }}
      required
    />
  </SchemaField.Void>
);

export default InputField;
