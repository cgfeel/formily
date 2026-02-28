import { Input } from "@formily/antd-v5";
import { isField, onFieldReact } from "@formily/core";
import { Field, useField, useFormEffects } from "@formily/react";
import { FC } from "react";
import FormItem from "../../../components/formItem/form-item";

const Custom: FC = () => {
  const field = useField();
  useFormEffects(() => {
    const name = field.path.toString();
    name &&
      onFieldReact(`${name}.bb`, field => {
        if (isField(field)) {
          field.value = field.query(`${name}.aa`).value();
        }
      });
  });
  return (
    <div>
      <Field name="aa" component={[Input]} decorator={[FormItem]} />
      <Field name="bb" component={[Input]} decorator={[FormItem]} />
    </div>
  );
};

export default Custom;
