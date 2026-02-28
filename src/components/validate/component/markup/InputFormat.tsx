import { FC } from "react";
import SchemaField from "../../SchemaField";

const InputFormat: FC<InputFormatProps> = ({ format }) => (
  <>
    <SchemaField.String
      x-component="Input"
      x-decorator="FormItem"
      format={format}
      name={`${format}_1`}
      title={`${format}格式1`}
      required
    />
    <SchemaField.String
      x-component="Input"
      x-decorator="FormItem"
      name={`${format}_2`}
      title={`${format}格式2`}
      x-validator={format}
      required
    />
    <SchemaField.String
      x-component="Input"
      x-decorator="FormItem"
      name={`${format}_3`}
      title={`${format}格式3`}
      x-validator={{ format }}
      required
    />
    <SchemaField.String
      x-component="Input"
      x-decorator="FormItem"
      name={`${format}_4`}
      title={`${format}格式4`}
      x-validator={[format]}
      required
    />
    <SchemaField.String
      x-component="Input"
      x-decorator="FormItem"
      name={`${format}_5`}
      title={`${format}格式5`}
      x-validator={[{ format }]}
      required
    />
  </>
);

export interface InputFormatProps {
  format: string;
}

export default InputFormat;
