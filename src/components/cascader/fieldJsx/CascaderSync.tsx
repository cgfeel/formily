import { createForm } from "@formily/core";
import { Field } from "@formily/react";
import { FC } from "react";
import FormItem from "../../formItem/form-item";
import { options } from "../../formItem/other/dataSource";
import Panel from "../Panel";
import Cascader from "../cascader";

const form = createForm();

const CascaderSync: FC = () => (
  <Panel
    form={form}
    header={
      <h2>
        <code>Field Jsx</code> 同步数据源案例
      </h2>
    }
  >
    <Field
      name="cascader"
      title="选择框"
      component={[Cascader]}
      dataSource={options}
      decorator={[FormItem]}
      required
    />
  </Panel>
);

export default CascaderSync;
