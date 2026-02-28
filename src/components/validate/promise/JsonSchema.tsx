import { createForm } from "@formily/core";
import { ISchema } from "@formily/react";
import { FC } from "react";
import Panel from "../Panel";
import SchemaField from "../SchemaField";
import { validateRules } from "../data/validatePromise";

const form = createForm();
const schema: ISchema = {
  type: "object",
  properties: {
    async_validate_1: {
      required: true,
      title: "异步校验",
      "x-component": "Input",
      "x-decorator": "FormItem",
      "x-validator": "{{promise_1}}",
    },
    async_validate_2: {
      required: true,
      title: "异步校验(onBlur)",
      "x-component": "Input",
      "x-decorator": "FormItem",
      "x-validator": {
        triggerType: "onBlur",
        validator: "{{promise_1}}",
      },
    },
  },
};

const JsonSchema: FC = () => (
  <Panel
    form={form}
    header={
      <h2>
        异步校验 - <code>Json Schema</code>
      </h2>
    }
  >
    <SchemaField schema={schema} scope={validateRules} />
  </Panel>
);

export default JsonSchema;
