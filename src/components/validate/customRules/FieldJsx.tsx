import { FormItem, Input, NumberPicker } from "@formily/antd-v5";
import { createForm, registerValidateRules } from "@formily/core";
import { Field } from "@formily/react";
import { FC } from "react";
import Panel from "../Panel";
import { validateRules } from "../data/validateRules";

registerValidateRules(validateRules);

const form = createForm();

const FieldJsx: FC = () => (
  <Panel
    form={form}
    header={
      <h2>
        自定义规则校验 - <code>Field Jsx</code>
      </h2>
    }
  >
    <Field
      name="global_style_1"
      title="全局注册风格"
      component={[Input]}
      decorator={[FormItem]}
      validator={{ global_1: true }}
      required
    />
    <Field
      name="global_style_2"
      title="全局注册风格"
      component={[Input]}
      decorator={[FormItem]}
      validator={{ global_2: true, message: "后添加错误❎" }}
      required
    />
    <Field
      name="global_style_3"
      title="全局注册风格"
      component={[Input]}
      decorator={[FormItem]}
      validator={{ global_3: true, message: "后添加错误❎" }}
      required
    />
    <Field
      name="global_style_4"
      title="全局注册风格"
      component={[NumberPicker]}
      decorator={[FormItem]}
      validator={{ global_4: true }}
      required
    />
    <Field
      name="validator_style_1"
      title="局部定义风格"
      component={[Input]}
      decorator={[FormItem]}
      validator={validateRules.global_1}
      required
    />
    <Field
      name="validator_style_2"
      title="局部定义风格"
      component={[Input]}
      decorator={[FormItem]}
      validator={{
        message: "后添加错误❎",
        validator: validateRules.global_2,
      }}
      required
    />
    <Field
      name="validator_style_3"
      title="局部定义风格"
      component={[Input]}
      decorator={[FormItem]}
      validator={{
        message: "后添加错误❎",
        validator: validateRules.global_3,
      }}
      required
    />
    <Field
      name="validator_style_4"
      title="局部定义风格"
      component={[NumberPicker]}
      decorator={[FormItem]}
      validator={validateRules.global_4}
      required
    />
  </Panel>
);

export default FieldJsx;
