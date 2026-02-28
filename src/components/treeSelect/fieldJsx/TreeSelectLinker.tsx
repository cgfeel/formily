import { Select, TreeSelect } from "@formily/antd-v5";
import { createForm } from "@formily/core";
import { Field } from "@formily/react";
import { FC } from "react";
import FormItem from "../../formItem/form-item";
import Panel from "../Panel";
import asyncLinker from "../action/asyncLinker";

const form = createForm({ effects: asyncLinker });

const TreeSelectLinker: FC = () => (
  <Panel
    form={form}
    header={
      <h2>
        <code>Field Jsx</code> 异步联动数据源案例
      </h2>
    }
  >
    <Field
      name="linkage"
      title="联动选择框"
      component={[Select]}
      dataSource={[
        { label: "发请求1", value: 1 },
        { label: "发请求2", value: 2 },
      ]}
      decorator={[FormItem]}
      required
    />
    <Field
      name="select"
      title="异步选择框"
      component={[TreeSelect, { allowClear: true, treeDefaultExpandAll: true }]}
      decorator={[FormItem]}
      required
    />
  </Panel>
);

export default TreeSelectLinker;
