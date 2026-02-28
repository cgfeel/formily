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
      title: "选择框",
      type: "string",
      "x-component": "Cascader",
      "x-decorator": "FormItem",
      enum: [
        { isLeaf: false, label: "Zhejiang", value: 1 },
        { isLeaf: false, label: "Jiangsu", value: 2 },
      ],
    },
  },
};

const CascaderLinker: FC = () => (
  <Panel
    form={form}
    header={
      <h2>
        <code>Json Schema</code> 异步加载数据源案例
      </h2>
    }
  >
    <SchemaField schema={schema} />
  </Panel>
);

export default CascaderLinker;
