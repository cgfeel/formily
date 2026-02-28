import { createForm } from "@formily/core";
import { FC } from "react";
import Panel from "../Panel";
import SchemaField from "../SchemaField";
import { options } from "../../formItem/other/dataSource";

const form = createForm();

const CascaderSync: FC = () => (
  <Panel
    footer={<p>个人修正案例</p>}
    form={form}
    header={
      <h2>
        <code>Markup Schema</code> 同步数据源案例
      </h2>
    }
  >
    <SchemaField>
      <SchemaField.String
        name="cascader"
        title="选择框"
        x-component="Cascader"
        x-decorator="FormItem"
        enum={options}
        required
      />
    </SchemaField>
  </Panel>
);

export default CascaderSync;
