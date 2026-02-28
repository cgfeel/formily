import { createForm } from "@formily/core";
import { FC } from "react";
import Panel from "./Panel";
import SchemaField from "./SchemaField";

const form = createForm();

const SpaceVertical: FC = () => (
  <Panel
    footer={
      <div>
        <p>
          分别展示了 <code>FormGroup.Sticky</code> 和 <code>space</code> 的特性；而{" "}
          <code>Space</code> 中 <code>direction: 'vertical'</code> 暂且用不了，需要个人修复一下
        </p>
      </div>
    }
    form={form}
    header={<h2>Antd.3: 布局补充</h2>}
  >
    <SchemaField>
      <SchemaField.Void
        x-component="Space"
        x-component-props={{
          size: [8, 20],
          wrap: true,
        }}
      >
        <SchemaField.String
          name="input1"
          title="输入框1"
          x-decorator="FormItem"
          x-component="Input"
          x-component-props={{}}
          required
        />
        <SchemaField.String
          name="input2"
          title="输入框2"
          x-decorator="FormItem"
          x-component="Input"
          x-component-props={{}}
          required
        />
        <SchemaField.String
          name="input3"
          title="输入框3"
          x-decorator="FormItem"
          x-component="Input"
          x-component-props={{}}
          required
        />
        <SchemaField.String
          name="input4"
          title="输入框4"
          x-decorator="FormItem"
          x-component="Input"
          x-component-props={{}}
          required
        />
        <SchemaField.String
          name="input5"
          title="输入框5"
          x-decorator="FormItem"
          x-component="Input"
          x-component-props={{}}
          required
        />
        <SchemaField.String
          name="input6"
          title="输入框6"
          x-decorator="FormItem"
          x-component="Input"
          x-component-props={{}}
          required
        />
      </SchemaField.Void>
    </SchemaField>
  </Panel>
);

export default SpaceVertical;
