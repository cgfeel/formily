import { createForm } from "@formily/core";
import { FC } from "react";
import Panel from "../Panel";
import SchemaField from "../SchemaField";
import { datasource } from "../server";

const form = createForm();

const TreeSelectSync: FC = () => (
  <Panel
    form={form}
    header={
      <h2>
        <code>Markup Schema</code> 同步数据源案例
      </h2>
    }
  >
    <SchemaField>
      <SchemaField.String
        name="select"
        title="选择框"
        x-component="TreeSelect"
        x-decorator="FormItem"
        enum={datasource}
        x-component-props={{ allowClear: true, treeDefaultExpandAll: true }}
        required
      />
    </SchemaField>
  </Panel>
);

export default TreeSelectSync;
