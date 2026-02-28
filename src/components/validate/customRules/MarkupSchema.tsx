import { createForm, registerValidateRules } from "@formily/core";
import { FC } from "react";
import Panel, { PanelProps } from "../Panel";
import SchemaField from "../SchemaField";
import { validateRules } from "../data/validateRules";

registerValidateRules(validateRules);

const form = createForm();

const MarkupSchema: FC<MarkupSchemaProps> = ({ footer }) => (
  <Panel
    footer={footer}
    form={form}
    header={
      <h2>
        自定义规则校验 - <code>Markup Schema</code>
      </h2>
    }
  >
    <SchemaField>
      <SchemaField.String
        name="global_style_1"
        title="全局注册风格"
        x-component="Input"
        x-decorator="FormItem"
        x-validator={{
          global_1: true,
        }}
        required
      />
      <SchemaField.String
        name="global_style_2"
        title="全局注册风格"
        x-component="Input"
        x-decorator="FormItem"
        x-validator={{
          global_2: true,
          message: "后添加错误❎",
        }}
        required
      />
      <SchemaField.String
        name="global_style_3"
        title="全局注册风格"
        x-component="Input"
        x-decorator="FormItem"
        x-validator={{
          global_3: true,
          message: "后添加错误❎",
        }}
        required
      />
      <SchemaField.Number
        name="global_style_4"
        title="全局注册风格"
        x-component="NumberPicker"
        x-decorator="FormItem"
        x-validator={{
          global_4: true,
        }}
        required
      />
      <SchemaField.String
        name="validator_style_1"
        title="局部定义风格"
        x-component="Input"
        x-decorator="FormItem"
        x-validator={validateRules.global_1}
        required
      />
      <SchemaField.String
        name="validator_style_2"
        title="局部定义风格"
        x-component="Input"
        x-decorator="FormItem"
        x-validator={{
          message: "后添加错误❎",
          validator: validateRules.global_2,
        }}
        required
      />
      <SchemaField.String
        name="validator_style_3"
        title="局部定义风格"
        x-component="Input"
        x-decorator="FormItem"
        x-validator={{
          message: "后添加错误❎",
          validator: validateRules.global_3,
        }}
        required
      />
      <SchemaField.Number
        name="validator_style_4"
        title="局部定义风格"
        x-component="NumberPicker"
        x-decorator="FormItem"
        x-validator={validateRules.global_4}
        required
      />
    </SchemaField>
  </Panel>
);

export interface MarkupSchemaProps extends Pick<PanelProps, "footer"> {}

export default MarkupSchema;
