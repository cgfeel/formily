import { FC } from "react";
import SchemaField from "../../SchemaField";

const InputLength: FC = () => (
  <>
    <SchemaField.String
      name="length_1"
      title="长度为5"
      x-component="Input"
      x-decorator="FormItem"
      x-validator={{ len: 5 }}
      required
    />
    <SchemaField.String
      name="length_2"
      title="长度为5"
      x-component="Input"
      x-decorator="FormItem"
      x-validator={[{ len: 5 }]}
      required
    />
    <SchemaField.String
      maxLength={5}
      name="maxlength_1"
      title="最大长度为5"
      x-component="Input"
      x-decorator="FormItem"
      required
    />
    <SchemaField.String
      name="maxlength_2"
      title="最大长度为5"
      x-component="Input"
      x-decorator="FormItem"
      x-validator={{ max: 5 }}
      required
    />
    <SchemaField.String
      name="maxlength_3"
      title="最大长度为5"
      x-component="Input"
      x-decorator="FormItem"
      x-validator={[{ max: 5 }]}
      required
    />
    <SchemaField.String
      minLength={5}
      name="minlength_1"
      title="最小长度为5"
      x-component="Input"
      x-decorator="FormItem"
      required
    />
    <SchemaField.String
      name="minlength_2"
      title="最小长度为5"
      x-component="Input"
      x-decorator="FormItem"
      x-validator={{ min: 5 }}
      required
    />
    <SchemaField.String
      name="minlength_3"
      title="最小长度为5"
      x-component="Input"
      x-decorator="FormItem"
      x-validator={[{ min: 5 }]}
      required
    />
  </>
);

export default InputLength;
