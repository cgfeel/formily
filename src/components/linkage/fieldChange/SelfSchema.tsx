import { createForm } from "@formily/core";
import { FC } from "react";
import Panel from "../Panel";
import SchemaField from "../SchemaField";
import { bgColor, colorReverse, getColor } from "../server";

const form = createForm();

const SelfSchema: FC = () => (
  <Panel
    footer={
      <p>
        通过监听自身地址进行联动，和文档不同的是这里通过 <code>x-component-props</code> 和{" "}
        <code>scope</code> 来进行主动联动，这说明当自身发生改变的时候自身的 <code>props</code>{" "}
        也会发生响应
      </p>
    }
    form={form}
    header={
      <h2>
        自身联动：<code>SchemaReactions</code> 用例
      </h2>
    }
  >
    <SchemaField scope={{ bgColor, colorReverse, getColor }}>
      <SchemaField.String
        default="FFFFFF"
        name="color"
        title="颜色"
        x-component="Input"
        x-decorator="FormItem"
        x-component-props={{
          maxLength: 6,
          prefix: "#",
          style: {
            backgroundColor: "{{bgColor($self.value)}}",
            color: "{{colorReverse($self.value)}}",
          },
        }}
        x-reactions={[
          {
            target: "color",
            effects: ["onFieldInputValueChange"],
            fulfill: {
              state: {
                value: "{{getColor($self)}}",
              },
            },
          },
        ]}
      />
    </SchemaField>
  </Panel>
);

export default SelfSchema;
