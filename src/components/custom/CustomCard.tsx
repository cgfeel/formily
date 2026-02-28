import { createForm } from "@formily/core";
import { FC } from "react";
import Panel from "./Panel";
import SchemaField from "./SchemaField";

const form = createForm();

const CustomCard: FC = () => (
  <Panel
    footer={
      <div>
        <p>
          在 <code>schema</code> 中不再展示 <code>SchemaField</code> 以外的组件，包裹{" "}
          <code>React</code> 组件，如果需要在表单中展示一些交互非表单组件，可以使用{" "}
          <code>SchemaField.Void</code> 这样的虚拟字段包裹自定义组件
        </p>
        <p>
          受限：可包裹在 <code>schema</code> 中或 <code>Field</code>{" "}
          中实现联动，如果要在外部实现联动可以通过 <code>observable</code>
        </p>
      </div>
    }
    form={form}
    header={<h2>自定义非表单组件</h2>}
    submit={{ onSubmit: value => console.log(value.info) }}
  >
    <SchemaField>
      <SchemaField.Boolean
        default={true}
        name="show"
        x-component="Radio.Group"
        x-decorator="FormItem"
        enum={[
          { label: "显示", value: true },
          { label: "隐藏", value: false },
        ]}
        x-reactions={{
          target: "info.card",
          effects: ["onFieldInit", "onFieldValueChange"],
          fulfill: {
            state: {
              visible: "{{$self.value}}",
            },
          },
        }}
      />
      <SchemaField.Object name="info">
        <SchemaField.Void name="card" x-component="Card" x-decorator="FormItem">
          <SchemaField.String
            name="input1"
            title="输入框"
            x-component="Input"
            x-decorator="FormItem"
            required
          />
        </SchemaField.Void>
        <SchemaField.String
          name="input2"
          title="输入框"
          x-component="Input"
          x-decorator="FormItem"
          required
        />
      </SchemaField.Object>
    </SchemaField>
  </Panel>
);

export default CustomCard;
