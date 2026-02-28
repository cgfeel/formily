import { createForm, onFieldReact } from "@formily/core";
import { FC } from "react";
import Panel from "../Panel";
import { fetchAddress } from "../action/asyncLoader";
import SchemaField from "./SchemaField";

const form = createForm({
  effects: () => {
    onFieldReact("select", field => {
      const value = field.query("input").get("value") || "";
      fetchAddress(value)(field);
    });
  },
});

const SelectInput: FC = () => (
  <Panel
    footer={
      <p>
        在被动联动模式中使用 <code>field.query</code> 不会产生依赖，但通过路径查找的{" "}
        <code>field</code> 对象调用 <code>{"get('value')"}</code> 或 <code>{"value()"}</code>
        ，则会自动产生依赖，并会在依赖对象每次数据更新的时候触发更新
      </p>
    }
    form={form}
    header={<h2>依赖输入内容每次加载</h2>}
  >
    <SchemaField>
      <SchemaField.String
        name="input"
        title="输入框"
        x-component="Input"
        x-decorator="FormItem"
        required
      />
      <SchemaField.String
        name="select"
        title="选择框"
        x-component="Select"
        x-decorator="FormItem"
        x-component-props={{ allowClear: true }}
        required
      />
    </SchemaField>
  </Panel>
);

export default SelectInput;
