import { Input } from "@formily/antd-v5";
import { createForm } from "@formily/core";
import { Field } from "@formily/react";
import { FC } from "react";
import FormItem from "./FormItem";
import Wraper from "./Wraper";

const form = createForm({ validateFirst: true });

const FieldJsx: FC = () => (
  <Wraper
    form={form}
    header={
      <h2>
        <code>useField</code> - FieldJsx
      </h2>
    }
  >
    <Field
      name="name"
      title="title"
      component={[Input, { placeholder: "Please Input" }]}
      decorator={[FormItem]}
      required
    />
  </Wraper>
);

export default FieldJsx;
