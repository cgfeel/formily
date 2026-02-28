import { FormStep } from "@formily/antd-v5";
import { createForm } from "@formily/core";
import { ISchema } from "@formily/react";
import { FC } from "react";
import Pannel from "./Pannel";
import SchemaField from "./SchemaField";

const form = createForm();
const formStep = FormStep.createFormStep();

const schema: ISchema = {
  type: "object",
  properties: {
    step: {
      type: "void",
      "x-component": "FormStep",
      "x-component-props": {
        formStep: "{{formStep}}",
      },
      properties: {
        step1: {
          type: "void",
          "x-component": "FormStep.StepPane",
          properties: {
            aaa: {
              required: true,
              type: "string",
              "x-component": "Input",
              "x-decorator": "FormItem",
            },
          },
          "x-component-props": {
            title: "第一步",
          },
        },
        step2: {
          type: "void",
          "x-component": "FormStep.StepPane",
          properties: {
            bbb: {
              required: true,
              type: "string",
              "x-component": "Input",
              "x-decorator": "FormItem",
            },
          },
          "x-component-props": {
            title: "第二步",
          },
        },
        step3: {
          type: "void",
          "x-component": "FormStep.StepPane",
          properties: {
            ccc: {
              required: true,
              type: "string",
              "x-component": "Input",
              "x-decorator": "FormItem",
            },
          },
          "x-component-props": {
            title: "第三步",
          },
        },
      },
    },
  },
};

const JsonSchema: FC = () => (
  <Pannel
    footer={
      <div>
        <p>
          <code>FormStep.createFormStep</code>和<code>createForm</code>一样，每次声明只能匹配一个
          <code>form</code>
        </p>
        <p>
          在登录例子中<code>scope</code>是在<code>createSchemaField</code>声明，而分步表单中需要在
          <code>schema</code>组件外部消费<code>FormConsumer</code>获取状态，所以在使用
          <code>FormStep.createFormStep</code>返回的对象，分配到<code>schema</code>组件
        </p>
      </div>
    }
    form={form}
    formStep={formStep}
    header={
      <h2>
        通过<code>Json Schema</code>创建分步表单
      </h2>
    }
  >
    <SchemaField schema={schema} scope={{ formStep }} />
  </Pannel>
);

export default JsonSchema;
