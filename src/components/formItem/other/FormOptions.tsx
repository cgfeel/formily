import { FC } from "react";
import SchemaField from "./SchemaField";

const FormOptions: FC = () => (
  <SchemaField.Object
    name="options"
    x-component="FormLayout"
    x-component-props={{ layout: "inline" }}
  >
    <SchemaField.String
      name="bordered"
      title="Bordered"
      x-component="Switch"
      x-decorator="FormItem"
    />
    <SchemaField.Boolean name="inset" title="Inset" x-component="Switch" x-decorator="FormItem" />
    <SchemaField.String
      name="size"
      title="Size"
      x-component="Radio.Group"
      x-decorator="FormItem"
      enum={[
        { label: "Small", value: "small" },
        { label: "Default", value: "default" },
        { label: "Large", value: "large" },
      ]}
      x-component-props={{ optionType: "button" }}
    />
  </SchemaField.Object>
);

export default FormOptions;
