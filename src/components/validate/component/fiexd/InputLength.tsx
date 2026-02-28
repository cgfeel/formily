import { FormItem, Input } from "@formily/antd-v5";
import { Field } from "@formily/react";
import { FC } from "react";

const InputLength: FC = () => (
  <>
    <Field
      name="length_1"
      title="长度为5"
      component={[Input]}
      decorator={[FormItem]}
      validator={{ len: 5 }}
      required
    />
    <Field
      name="length_2"
      title="长度为5"
      component={[Input]}
      decorator={[FormItem]}
      validator={{ len: 5 }}
      required
    />
    <Field
      name="maxlength_1"
      title="最大长度为5"
      component={[Input]}
      decorator={[FormItem]}
      validator={{ max: 5 }}
      required
    />
    <Field
      name="maxlength_2"
      title="最大长度为5"
      component={[Input]}
      decorator={[FormItem]}
      validator={[{ max: 5 }]}
      required
    />
    <Field
      name="minlength_1"
      title="最小长度为5"
      component={[Input]}
      decorator={[FormItem]}
      validator={{ min: 5 }}
      required
    />
    <Field
      name="minlength_2"
      title="最小长度为5"
      component={[Input]}
      decorator={[FormItem]}
      validator={[{ min: 5 }]}
      required
    />
  </>
);

export default InputLength;
