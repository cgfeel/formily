import { DatePicker, Radio } from "@formily/antd-v5";
import { createForm } from "@formily/core";
import { Field } from "@formily/react";
import { FC } from "react";
import FormItem from "../formItem/form-item";
import Panel from "./Panel";

const form = createForm();

const FieldJsx: FC = () => (
  <Panel
    form={form}
    header={
      <h2>
        通过 <code>Field Jsx</code> 解构数据
      </h2>
    }
  >
    <Field
      initialValue={true}
      name="visible_destructor"
      title="是否显示解构字段"
      component={[Radio.Group]}
      dataSource={[
        { label: "是", value: true },
        { label: "否", value: false },
      ]}
      decorator={[FormItem]}
    />
    <Field
      name="undestructor"
      title="解构前"
      component={[DatePicker.RangePicker]}
      decorator={[FormItem]}
      required
    />
    <Field
      initialValue={["2020-11-20", "2021-12-30"]}
      name="[startDate,endDate]"
      title="解构后"
      component={[DatePicker.RangePicker]}
      decorator={[FormItem]}
      reactions={field => {
        field.visible = !!field.query("visible_destructor").value();
      }}
      required
    />
  </Panel>
);

export default FieldJsx;
