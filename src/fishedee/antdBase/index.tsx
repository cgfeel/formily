import { createForm } from "@formily/core";
import { FC } from "react";
import CheckBox from "./CheckBox";
import InputField from "./InputField";
import Panel from "./Panel";
import Select from "./Select";
import SchemaField from "./SchemaField";
import TimePicker from "./TimePicker";

const form = createForm();

const AntdBase: FC = () => (
  <Panel form={form} header={<h2>Antd.1: 基础组件</h2>}>
    <SchemaField>
      <InputField />
      <CheckBox />
      <Select />
      <TimePicker />
    </SchemaField>
  </Panel>
);

export default AntdBase;
