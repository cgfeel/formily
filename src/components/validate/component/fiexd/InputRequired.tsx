import { FormItem, Input } from "@formily/antd-v5";
import { Field } from "@formily/react";
import { FC } from "react";

const InputRequired: FC = () => (
  <>
    <Field name="required_1" title="必填" component={[Input]} decorator={[FormItem]} required />
    <Field
      name="required_2"
      title="必填"
      component={[Input]}
      decorator={[FormItem]}
      validator={{ required: true }}
    />
    <Field
      name="required_3"
      title="必填"
      component={[Input]}
      decorator={[FormItem]}
      validator={[{ required: true }]}
    />
  </>
);

export default InputRequired;
