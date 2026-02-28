import { createForm } from "@formily/core";
import { FC } from "react";
import asyncLinker from "../action/asyncLinker";
import Panel from "../Panel";
import SchemaField from "../SchemaField";

const form = createForm({ effects: asyncLinker });

const SelectLinker: FC = () => (
  <Panel
    form={form}
    header={
      <h2>
        <code>Markup Schema</code> 异步联动数据源案例
      </h2>
    }
  >
    <SchemaField>
      <SchemaField.String
        name="linkage"
        title="联动选择框"
        x-component="Select"
        x-decorator="FormItem"
        enum={[
          { label: "发送请求1", value: 1 },
          { label: "发送请求2", value: 2 },
        ]}
        required
      />
      <SchemaField.String
        name="select"
        title="异步选择框"
        x-component="Select"
        x-decorator="FormItem"
        required
      />
    </SchemaField>
  </Panel>
);

export default SelectLinker;
