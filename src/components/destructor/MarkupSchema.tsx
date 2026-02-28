import { createForm, onFieldValueChange } from "@formily/core";
import { FC } from "react";
import Panel from "./Panel";
import SchemaField from "./SchemaField";

const form = createForm({
  effects: () => {
    onFieldValueChange("visible_destructor", field => {
      form.setFieldState("[startDate,endDate]", state => {
        state.visible = !!field.value;
      });
    });
  },
});

const MarkupSchema: FC = () => (
  <Panel
    footer={
      <p>
        将 <code>name</code> 由普通的字符修改为 <code>{"[{name},{name}]"}</code> 这样的方式解构字段
      </p>
    }
    form={form}
    header={
      <h2>
        通过 <code>Markup Schema</code> 解构数据
      </h2>
    }
  >
    <SchemaField>
      <SchemaField.Boolean
        default={true}
        name="visible_destructor"
        title="是否显示解构字段"
        x-component="Radio.Group"
        x-decorator="FormItem"
        enum={[
          { label: "是", value: true },
          { label: "否", value: false },
        ]}
      />
      <SchemaField.Array
        name="undestructor"
        title="解构前"
        x-component="DatePicker.RangePicker"
        x-decorator="FormItem"
        required
      />
      <SchemaField.Array
        default={["2020-11-20", "2021-12-30"]}
        name="[startDate,endDate]"
        title="解构后"
        x-component="DatePicker.RangePicker"
        x-decorator="FormItem"
        required
      />
    </SchemaField>
  </Panel>
);

export default MarkupSchema;
