import { createForm, onFieldReact } from "@formily/core";
import { Field } from "@formily/react";
import { FC } from "react";
import FormItem from "../../formItem/form-item";
import { fetchAddress } from "../../register/action";
import Panel from "../Panel";
import Cascader from "../cascader";

const form = createForm({
  effects: () => {
    onFieldReact("cascader", fetchAddress);
  },
});

const CascaderAsync: FC = () => (
  <Panel
    form={form}
    header={
      <h2>
        <code>Json Field</code> 异步数据源案例
      </h2>
    }
  >
    <Field name="cascader" title="选择框" component={[Cascader]} decorator={[FormItem]} required />
  </Panel>
);

export default CascaderAsync;
