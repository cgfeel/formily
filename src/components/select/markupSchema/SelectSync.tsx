import { createForm } from "@formily/core";
import { FC } from "react";
import Panel from "../Panel";
import SchemaField from "../SchemaField";

const form = createForm();

const SelectSync: FC = () => (
  <Panel
    form={form}
    header={
      <h2>
        <code>Markup Schema</code> 同步数据源案例
      </h2>
    }
  >
    <SchemaField>
      <SchemaField.Number
        name="select"
        title="选择框"
        x-component="Select"
        x-decorator="FormItem"
        enum={[
          { label: "选项1", value: 1 },
          { label: "选项2", value: 2 },
        ]}
        x-component-props={{
          allowClear: true,
        }}
        required
      />
    </SchemaField>
  </Panel>
);

export default SelectSync;
