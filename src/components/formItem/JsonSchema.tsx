import { createForm } from "@formily/core";
import { ISchema } from "@formily/react";
import { createStyles, css } from "antd-style";
import { FC } from "react";
import Panel from "./Panel";
import SchemaField from "./SchemaField";

const useStyles = createStyles(css`
  width: 240px;
`);

const form = createForm();
const schema: ISchema = {
  type: "object",
  properties: {
    name: {
      required: true,
      title: "输入框",
      type: "string",
      "x-component": "Input",
      "x-decorator": "FormItem",
      "x-component-props": {
        className: "{{style()}}",
      },
    },
  },
};

const JsonSchema: FC = () => {
  const { styles } = useStyles();
  return (
    <Panel
      form={form}
      header={
        <h2>
          通过<code>Json Schema</code>创建 <code>FormItem</code>
        </h2>
      }
    >
      <SchemaField
        schema={schema}
        scope={{
          style: () => styles,
        }}
      />
    </Panel>
  );
};

export default JsonSchema;
