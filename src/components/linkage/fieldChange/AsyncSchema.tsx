import { createForm } from "@formily/core";
import { FC } from "react";
import Panel from "../Panel";
import SchemaField from "../SchemaField";
import { asyncVisible } from "../server";

const form = createForm();

const AsyncSchema: FC = () => (
  <Panel
    footer={
      <div>
        <p>
          通过 <code>fulfill</code> 属性 <code>run</code> 将当前字段 <code>$self</code> 和监控字段{" "}
          <code>$target</code> 发送给 <code>scope</code> 中的异步函数进行处理
        </p>
        <p>
          在 <code>schema</code> 中对字段首次匹配，需要监听生命周期的钩子 <code>onFieldInit</code>
        </p>
      </div>
    }
    form={form}
    header={
      <h2>
        异步联动：<code>SchemaReactions</code> 用例
      </h2>
    }
  >
    <SchemaField scope={{ asyncVisible }}>
      <SchemaField.String
        default="visible"
        name="select"
        title="控制者"
        x-component="Select"
        x-decorator="FormItem"
        enum={[
          { label: "显示", value: "visible" },
          { label: "隐藏", value: "none" },
          { label: "隐藏-保留值", value: "hide" },
        ]}
        x-reactions={[
          {
            target: "input",
            effects: ["onFieldInit", "onFieldValueChange"],
            fulfill: {
              run: "{{asyncVisible($self, $target)}}",
            },
          },
        ]}
      />
      <SchemaField.String
        name="input"
        title="受控者"
        x-component="Input"
        x-decorator="FormItem"
        x-visible={false}
      />
    </SchemaField>
  </Panel>
);

export default AsyncSchema;
