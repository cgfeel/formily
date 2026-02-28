import { FC } from "react";
import SchemaField from "../../SchemaField";

const NumberMax: FC = () => (
  <>
    <SchemaField.Number
      maximum={5}
      name="max_1"
      title="最大值(>5 报错)"
      x-component="NumberPicker"
      x-decorator="FormItem"
      required
    />
    <SchemaField.Number
      name="max_2"
      title="最大值(>5 报错)"
      x-component="NumberPicker"
      x-decorator="FormItem"
      x-validator={{ maximum: 5 }}
      required
    />
    <SchemaField.Number
      name="max_3"
      title="最大值(>5 报错)"
      x-component="NumberPicker"
      x-decorator="FormItem"
      x-validator={[{ maximum: 5 }]}
      required
    />
    <SchemaField.Number
      exclusiveMaximum={5}
      name="max_4"
      title="最大值(>=5 报错)"
      x-component="NumberPicker"
      x-decorator="FormItem"
      required
    />
    <SchemaField.Number
      name="max_5"
      title="最大值(>=5 报错)"
      x-component="NumberPicker"
      x-decorator="FormItem"
      x-validator={{ exclusiveMaximum: 5 }}
      required
    />
    <SchemaField.Number
      name="max_6"
      title="最大值(>=5 报错)"
      x-component="NumberPicker"
      x-decorator="FormItem"
      x-validator={[{ exclusiveMaximum: 5 }]}
      required
    />
  </>
);

export default NumberMax;
