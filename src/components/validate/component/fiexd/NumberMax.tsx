import { FormItem, NumberPicker } from "@formily/antd-v5";
import { Field } from "@formily/react";
import { FC } from "react";

const NumberMax: FC = () => (
  <>
    <Field
      name="max_1"
      title="最大值(>5报错)"
      component={[NumberPicker]}
      decorator={[FormItem]}
      validator={{ maximum: 5 }}
      required
    />
    <Field
      name="max_2"
      title="最大值(>5报错)"
      component={[NumberPicker]}
      decorator={[FormItem]}
      validator={[{ maximum: 5 }]}
      required
    />
    <Field
      name="max_3"
      title="最大值(>=5报错)"
      component={[NumberPicker]}
      decorator={[FormItem]}
      validator={{ exclusiveMaximum: 5 }}
      required
    />
    <Field
      name="max_4"
      title="最大值(>=5报错)"
      component={[NumberPicker]}
      decorator={[FormItem]}
      validator={[{ exclusiveMaximum: 5 }]}
      required
    />
  </>
);

export default NumberMax;
