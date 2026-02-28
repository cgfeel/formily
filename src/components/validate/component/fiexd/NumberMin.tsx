import { FormItem, NumberPicker } from "@formily/antd-v5";
import { Field } from "@formily/react";
import { FC } from "react";

const NumberMin: FC = () => (
  <>
    <Field
      name="min_1"
      title="最小值(<5报错)"
      component={[NumberPicker]}
      decorator={[FormItem]}
      validator={{ minimum: 5 }}
      required
    />
    <Field
      name="min_2"
      title="最小值(<5报错)"
      component={[NumberPicker]}
      decorator={[FormItem]}
      validator={[{ minimum: 5 }]}
      required
    />
    <Field
      name="min_3"
      title="最小值(<=5报错)"
      component={[NumberPicker]}
      decorator={[FormItem]}
      validator={{ exclusiveMinimum: 5 }}
      required
    />
    <Field
      name="min_4"
      title="最小值(<=5报错)"
      component={[NumberPicker]}
      decorator={[FormItem]}
      validator={[{ exclusiveMinimum: 5 }]}
      required
    />
  </>
);

export default NumberMin;
