import { createForm } from "@formily/core";
import { ISchema } from "@formily/react";
import { FC } from "react";
import Pannel from "./Pannel";
import SchemaField from "./SchemaField";

const form = createForm({
  validateFirst: true,
});

const schema: ISchema = {
  type: "object",
  properties: {
    string_array: {
      maxItems: 3,
      title: "字符串数组",
      type: "array",
      "x-component": "ArrayTabs",
      "x-decorator": "FormItem",
      items: {
        required: true,
        type: "string",
        "x-component": "Input",
        "x-decorator": "FormItem",
      },
    },
    array: {
      maxItems: 3,
      title: "对象数组",
      type: "array",
      "x-component": "ArrayTabs",
      "x-decorator": "FormItem",
      items: {
        type: "object",
        properties: {
          aaa: {
            required: true,
            title: "AAA",
            type: "string",
            "x-component": "Input",
            "x-decorator": "FormItem",
          },
          bbb: {
            required: true,
            title: "BBB",
            type: "string",
            "x-component": "Input",
            "x-decorator": "FormItem",
          },
        },
      },
    },
  },
};

const JsonSchema: FC = () => (
  <Pannel
    form={form}
    header={
      <h2>
        通过<code>Json Schema</code>创建自增选项卡
      </h2>
    }
  >
    <SchemaField schema={schema} />
  </Pannel>
);

export default JsonSchema;
