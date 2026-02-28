import { createForm } from "@formily/core";
import { ISchema } from "@formily/react";
import { FC } from "react";
import Panel from "../Panel";
import SchemaField from "../SchemaField";
import asyncSearch from "../action/asyncSearch";

const form = createForm({ effects: asyncSearch });
const schema: ISchema = {
  type: "object",
  properties: {
    select: {
      required: true,
      title: "异步搜索选择框",
      type: "string",
      "x-component": "Select",
      "x-decorator": "FormItem",
      "x-component-props": { filterOption: false, showSearch: true },
    },
  },
};

const SelectAsync: FC = () => (
  <Panel
    form={form}
    header={
      <h2>
        <code>Json Schema</code> 异步搜索案例
      </h2>
    }
  >
    <SchemaField schema={schema} />
  </Panel>
);

export default SelectAsync;
