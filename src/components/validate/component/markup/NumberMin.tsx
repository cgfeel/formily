import { FC } from "react";
import SchemaField from "../../SchemaField";

const NumberMin: FC = () => (
  <>
    <SchemaField.Number
      minimum={5}
      name="min_1"
      title="最小值(<5报错)"
      x-component="NumberPicker"
      x-decorator="FormItem"
      required
    />
    <SchemaField.Number
      name="min_2"
      title="最小值(<5报错)"
      x-component="NumberPicker"
      x-decorator="FormItem"
      x-validator={{ minimum: 5 }}
      required
    />
    <SchemaField.Number
      name="min_3"
      title="最小值(<5报错)"
      x-component="NumberPicker"
      x-decorator="FormItem"
      x-validator={[{ minimum: 5 }]}
      required
    />
    <SchemaField.Number
      exclusiveMinimum={5}
      name="min_4"
      title="最小值(<=5报错)"
      x-component="NumberPicker"
      x-decorator="FormItem"
      required
    />
    <SchemaField.Number
      name="min_5"
      title="最小值(<=5报错)"
      x-component="NumberPicker"
      x-decorator="FormItem"
      x-validator={{ exclusiveMinimum: 5 }}
      required
    />
    <SchemaField.Number
      name="min_6"
      title="最小值(<=5报错)"
      x-component="NumberPicker"
      x-decorator="FormItem"
      x-validator={[{ exclusiveMinimum: 5 }]}
      required
    />
  </>
);

export default NumberMin;
