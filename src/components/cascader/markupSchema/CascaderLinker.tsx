import { createForm } from "@formily/core";
import { FC } from "react";
import Panel from "../Panel";
import SchemaField from "../SchemaField";
import asyncSearch from "../action/asyncSearch";

const form = createForm({ effects: asyncSearch });

const CascaderLinker: FC = () => (
  <Panel
    footer={<p>个人附加案例</p>}
    form={form}
    header={
      <h2>
        <code>Markup Schema</code> 异步加载数据源案例
      </h2>
    }
  >
    <SchemaField>
      <SchemaField.String
        name="select"
        title="选择框"
        x-component="Cascader"
        x-decorator="FormItem"
        enum={[
          { isLeaf: false, label: "Zhejiang", value: 1 },
          { isLeaf: false, label: "Jiangsu", value: 2 },
        ]}
        required
      />
    </SchemaField>
  </Panel>
);

export default CascaderLinker;
