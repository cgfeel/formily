import { createForm } from "@formily/core";
import { FC } from "react";
import Panel from "../Panel";
import SchemaField from "../SchemaField";

const form = createForm();

const LinkSchema: FC = () => (
  <Panel
    footer={
      <div>
        <p>
          通过 <code>dependencies</code> 匹配其他字段实现依赖联动
        </p>
        <p>
          巩固：只要 <code>reactions</code> 中有 <code>target</code> 就一定是主动联动
        </p>
      </div>
    }
    form={form}
    header={
      <h2>
        依赖联动：<code>SchemaReactions</code> 用例
      </h2>
    }
  >
    <SchemaField>
      <SchemaField.Number
        default={0}
        name="dim_1"
        title="控制者"
        x-component="NumberPicker"
        x-decorator="FormItem"
        x-reactions={{
          dependencies: ["dim_2"],
          target: "result",
          fulfill: {
            state: {
              value: "{{($self.value||0) * ($deps[0]||0)}}",
            },
          },
        }}
      />
      <SchemaField.Number
        default={0}
        name="dim_2"
        title="控制者"
        x-component="NumberPicker"
        x-decorator="FormItem"
        x-reactions={{
          dependencies: ["dim_1"],
          target: "result",
          fulfill: {
            state: {
              value: "{{($self.value||0) * ($deps[0]||0)}}",
            },
          },
        }}
      />
      <SchemaField.Number
        name="result"
        title="受控者"
        x-pattern="readPretty"
        x-component="NumberPicker"
        x-decorator="FormItem"
      />
    </SchemaField>
  </Panel>
);

export default LinkSchema;
