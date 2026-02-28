import { createForm } from "@formily/core";
import { FC } from "react";
import Panel from "../Panel";
import SchemaField from "../SchemaField";

const form = createForm();

const OnInputSchema: FC = () => (
  <Panel
    footer={
      <p>
        在 <code>reactions</code> 中通过 <code>effects</code> 设置主动模式下的独立生命周期钩子
      </p>
    }
    form={form}
    header={
      <h2>
        循环联动：<code>SchemaReactions</code> 用例
      </h2>
    }
  >
    <SchemaField>
      <SchemaField.Number
        name="total"
        title="总价"
        x-component="NumberPicker"
        x-decorator="FormItem"
        x-reactions={[
          {
            target: "count",
            dependencies: ["price"],
            effects: ["onFieldInputValueChange"],
            fulfill: {
              state: {
                value: "{{$deps[0] ? $self.value / $deps[0] : $target.value}}",
              },
            },
          },
          {
            target: "price",
            dependencies: ["count"],
            effects: ["onFieldInputValueChange"],
            fulfill: {
              state: {
                value: "{{$deps[0] ? $self.value / $deps[0] : $target.value}}",
              },
            },
          },
        ]}
      />
      <SchemaField.Number
        name="count"
        title="数量"
        x-component="NumberPicker"
        x-decorator="FormItem"
        x-reactions={[
          {
            target: "total",
            effects: ["onFieldInputValueChange"],
            dependencies: ["price"],
            fulfill: {
              state: {
                value: "{{$deps[0] !== void 0 ? $self.value * $deps[0] : $target.value}}",
              },
            },
          },
        ]}
      />
      <SchemaField.Number
        name="price"
        title="单价"
        x-component="NumberPicker"
        x-decorator="FormItem"
        x-reactions={[
          {
            target: "total",
            effects: ["onFieldInputValueChange"],
            dependencies: ["count"],
            fulfill: {
              state: {
                value: "{{$deps[0] !== void 0 ? $self.value * $deps[0] : $target.value}}",
              },
            },
          },
        ]}
      />
    </SchemaField>
  </Panel>
);

export default OnInputSchema;
