import { TreeSelect } from "@formily/antd-v5";
import { createForm } from "@formily/core";
import { Field } from "@formily/react";
import { FC } from "react";
import FormItem from "../../formItem/form-item";
import Panel from "../Panel";
import { datasource } from "../server";

const form = createForm();

const TreeSelectSync: FC = () => (
  <Panel
    form={form}
    header={
      <h2>
        <code>Field Jsx</code> 同步数据源案例
      </h2>
    }
  >
    <Field
      name="select"
      title="选择框"
      component={[TreeSelect, { allowClear: true, treeDefaultExpandAll: true }]}
      dataSource={datasource}
      decorator={[FormItem]}
      required
    />
  </Panel>
);

export default TreeSelectSync;
