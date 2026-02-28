import { FC } from "react";
import SchemaField from "../../SchemaField";

const InputRequired: FC = () => (
  <>
    <SchemaField.String
      name="required_1"
      title="必填"
      x-component="Input"
      x-decorator="FormItem"
      required
    />
    <SchemaField.String
      name="required_2"
      title="必填"
      x-component="Input"
      x-decorator="FormItem"
      x-validator={{ required: true }}
    />
    <SchemaField.String
      name="required_3"
      title="必填"
      x-component="Input"
      x-decorator="FormItem"
      x-validator={[{ required: true }]}
    />
  </>
);

export default InputRequired;
