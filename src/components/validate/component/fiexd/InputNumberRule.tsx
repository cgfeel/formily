import { FormItem, Input, NumberPicker } from "@formily/antd-v5";
import { Field } from "@formily/react";
import { FC } from "react";

const InputNumberRule: FC = () => (
  <>
    <Field
      name="whitespace"
      title="排除纯空白字符"
      component={[Input]}
      decorator={[FormItem]}
      validator={[{ whitespace: true }]}
      required
    />
    <Field
      name="enum"
      title="枚举匹配"
      component={[Input]}
      decorator={[FormItem]}
      validator={[{ enum: ["1", "2", "3"] }]}
      required
    />
    <Field
      name="const"
      title="常量匹配"
      component={[Input]}
      decorator={[FormItem]}
      validator={[{ const: "123" }]}
      required
    />
    <Field
      name="multipleof"
      title="整除匹配"
      component={[NumberPicker]}
      decorator={[FormItem]}
      validator={[{ multipleOf: 2 }]}
      required
    />
  </>
);

export default InputNumberRule;
