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
      />
      <SchemaField.Number
        default={0}
        name="dim_2"
        title="控制者"
        x-component="NumberPicker"
        x-decorator="FormItem"
      />
      <SchemaField.Number
        name="result"
        title="受控者"
        x-component="NumberPicker"
        x-decorator="FormItem"
        x-pattern="readPretty"
        x-reactions={{
          dependencies: ["dim_1", "dim_2"],
          fulfill: {
            state: {
              value: "{{$deps[0] * $deps[1]}}",
            },
          },
        }}
      />
    </SchemaField>
  </Panel>
);

export default LinkSchema;
