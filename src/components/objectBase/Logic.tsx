import { createForm } from "@formily/core";
import { FC } from "react";
import Panel from "./Panel";
import SchemaField from "./SchemaField";
import { FormConsumer } from "@formily/react";

const form = createForm({
  initialValues: {
    search: {
      ops: "either",
      children: [
        { key1: "新一", key2: "小兰", key3: "灰原哀" },
        {
          ops: "contain",
          children: [
            { key1: "幽助", key2: "浦饭", key3: "藏马" },
            { key1: "小新", key2: "广志", key3: "美伢" },
          ],
        },
      ],
    },
  },
});

const Logic: FC = () => (
  <Panel form={form} header={<h2>不修改模型自定义新的逻辑</h2>}>
    <SchemaField>
      <SchemaField.Object
        name="search"
        x-component="ObjectCollapse"
        x-component-props={{
          defaultData: {
            ops: "either",
            item: { key1: "" },
          },
        }}
      >
        <SchemaField.String
          x-component="ObjectCollapse.Options"
          enum={[
            { value: "either", label: "任意一个" },
            { value: "contain", label: "全包含" },
          ]}
          x-component-props={{
            width: "112px",
          }}
        />
        <SchemaField.Object x-component="ObjectCollapse.CollapsePanel">
          <SchemaField.Void x-component="Space">
            <SchemaField.String
              name="key1"
              x-component="Input"
              x-decorator="FormItem"
              x-component-props={{ style: { width: 120 } }}
            />
            <SchemaField.String
              name="key2"
              x-component="Input"
              x-decorator="FormItem"
              x-component-props={{ style: { width: 120 } }}
            />
            <SchemaField.String
              name="key3"
              x-component="Input"
              x-decorator="FormItem"
              x-component-props={{ style: { width: 120 } }}
            />
          </SchemaField.Void>
        </SchemaField.Object>
        <SchemaField.Void x-component="ObjectCollapse.Remove" />
        <SchemaField.Void x-component="ObjectCollapse.Addition" x-decorator="FormItem" />
      </SchemaField.Object>
    </SchemaField>
    <code className="consumer">
      <pre>
        <FormConsumer>{form => JSON.stringify(form.values, null, 2)}</FormConsumer>
      </pre>
    </code>
  </Panel>
);

export default Logic;
