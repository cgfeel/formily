import { createForm } from "@formily/core";
import { FC } from "react";
import Panel from "../Panel";
import SchemaField from "../SchemaField";
import { bgColor, colorReverse, getColor } from "../server";

const form = createForm();

const SelfSchema: FC = () => (
  <Panel
    footer={
      <div>
        <p>
          被动联动中监听自身字段不需要添加任何依赖，直接传递 <code>$self</code>
        </p>
        <p>
          这里通过 <code>x-component-props</code> 去设置组件属性，除此之外还可以在{" "}
          <code>reactions</code> 中通过 <code>{"component[1].style.backgroundColor"}</code> 或{" "}
          <code>x-component-props.style.backgroundColor</code>
        </p>
      </div>
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
        x-reactions={{
          fulfill: {
            state: {
              value: "{{getColor($self)}}",
            },
          },
        }}
      />
    </SchemaField>
  </Panel>
);

export default SelfSchema;
