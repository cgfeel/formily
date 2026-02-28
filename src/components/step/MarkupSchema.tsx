import { FormStep } from "@formily/antd-v5";
import { createForm } from "@formily/core";
import { FC } from "react";
import Pannel from "./Pannel";
import SchemaField from "./SchemaField";

const form = createForm();
const formStep = FormStep.createFormStep();

const MarkupSchema: FC = () => (
  <Pannel
    form={form}
    formStep={formStep}
    header={
      <h2>
        通过<code>Markup Schema</code>创建分步表单
      </h2>
    }
  >
    <SchemaField>
      <SchemaField.Void x-component="FormStep" x-component-props={{ formStep }}>
        <SchemaField.Void x-component="FormStep.StepPane" x-component-props={{ title: "第一步" }}>
          <SchemaField.String name="aaa" x-component="Input" x-decorator="FormItem" required />
        </SchemaField.Void>
        <SchemaField.Void x-component="FormStep.StepPane" x-component-props={{ title: "第二步" }}>
          <SchemaField.String name="bbb" x-component="Input" x-decorator="FormItem" required />
        </SchemaField.Void>
        <SchemaField.Void x-component="FormStep.StepPane" x-component-props={{ title: "第三步" }}>
          <SchemaField.String name="ccc" x-component="Input" x-decorator="FormItem" required />
        </SchemaField.Void>
      </SchemaField.Void>
    </SchemaField>
  </Pannel>
);

export default MarkupSchema;
