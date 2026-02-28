import { createForm } from "@formily/core";
import { ISchema } from "@formily/react";
import { FC } from "react";
import Panel from "./Panel";
import SchemaField from "./SchemaField";
import { nameSchema, textsSchema } from "./dataSource";

const form = createForm();
const schema: ISchema = {
  type: "object",
  properties: {
    ...nameSchema,
    ...textsSchema,
    textarea: {
      required: true,
      title: "文本框",
      type: "string",
      "x-component": "TextArea",
      "x-decorator": "FormItem",
    },
  },
};

const JsonSchema: FC = () => (
  <Panel
    form={form}
    header={
      <h2>
        通过<code>Json Schema</code>实现<code>Space</code>
      </h2>
    }
  >
    <SchemaField schema={schema} />
  </Panel>
);

export default JsonSchema;
