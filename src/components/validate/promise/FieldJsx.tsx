import { FormItem, Input } from "@formily/antd-v5";
import { createForm } from "@formily/core";
import { Field } from "@formily/react";
import { FC } from "react";
import Panel from "../Panel";
import { validateRules } from "../data/validatePromise";

const form = createForm();

const FieldJsx: FC = () => (
  <Panel
    form={form}
    header={
      <h2>
        异步校验 - <code>Field Jsx</code>
      </h2>
    }
  >
    <Field
      name="async_validate_1"
      title="异步校验"
      component={[Input]}
      decorator={[FormItem]}
      validator={validateRules.promise_1}
      required
    />
    <Field
      name="async_validate_2"
      title="异步校验(onBlur)"
      component={[Input]}
      decorator={[FormItem]}
      validator={{
        triggerType: "onBlur",
        validator: validateRules.promise_1,
      }}
      required
    />
  </Panel>
);

export default FieldJsx;
