import { createForm, isField, onFieldReact } from "@formily/core";
import { FC } from "react";
import Panel from "../Panel";
import SchemaField from "../SchemaField";
import { getColorValues } from "../server";

const form = createForm({
  effects: () => {
    onFieldReact("color", field => {
      if (!isField(field)) return;
      const [value, backgroundColor, color] = getColorValues(field);
      field.value = value;
      field.setComponentProps({
        style: {
          backgroundColor,
          color,
        },
      });
    });
  },
});

const SelfEffect: FC = () => (
  <Panel
    footer={<p>通过监听自身地址进行联动，在这里修正了文档中颜色取值的一些问题</p>}
    form={form}
    header={
      <h2>
        自身联动：<code>Effects</code> 用例
      </h2>
    }
  >
    <SchemaField>
      <SchemaField.String
        default="FFFFFF"
        name="color"
        title="颜色"
        x-component="Input"
        x-decorator="FormItem"
        x-component-props={{ maxLength: 6, prefix: "#" }}
      />
    </SchemaField>
  </Panel>
);

export default SelfEffect;
