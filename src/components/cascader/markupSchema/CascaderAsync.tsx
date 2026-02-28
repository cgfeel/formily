import { createForm } from "@formily/core";
import { FC } from "react";
import { fetchAddress } from "../../register/action";
import Panel from "../Panel";
import SchemaField from "../SchemaField";

const form = createForm();

const CascaderAsync: FC = () => (
  <Panel
    form={form}
    header={
      <h2>
        <code>Markup Schema</code> 异步数据源案例
      </h2>
    }
  >
    <SchemaField scope={{ fetchAddress }}>
      <SchemaField.String
        name="cascader"
        title="选择框"
        x-component="Cascader"
        x-decorator="FormItem"
        x-reactions="{{fetchAddress}}"
        required
      />
    </SchemaField>
  </Panel>
);

export default CascaderAsync;
