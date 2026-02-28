import { createForm } from "@formily/core";
import { ISchema } from "@formily/react";
import { FC } from "react";
import Panel from "../Panel";
import SchemaField from "../SchemaField";

const form = createForm();
const schema: ISchema = {
  type: "object",
  properties: {
    select: {
      required: true,
      title: "选择框",
      type: "number",
      "x-component": "Select",
      "x-decorator": "FormItem",
      enum: [
        { label: "选项1", value: 1 },
        { label: "选项2", value: 2 },
      ],
      "x-component-props": {
        allowClear: true,
      },
    },
  },
};

const SelectSync: FC = () => (
  <Panel
    form={form}
    header={
      <h2>
        <code>Json Schema</code> 同步数据源案例
      </h2>
    }
  >
    <SchemaField schema={schema} />
  </Panel>
);

export default SelectSync;
