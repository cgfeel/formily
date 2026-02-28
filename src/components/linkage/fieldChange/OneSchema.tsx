import { createForm } from "@formily/core";
import { FC } from "react";
import Panel from "../Panel";
import SchemaField from "../SchemaField";

const form = createForm();

const OneSchema: FC = () => (
  <Panel
    footer={
      <p>
        <code>reactions</code>中添加<code>target</code>实现主动监控
      </p>
    }
    form={form}
    header={
      <h2>
        一对一联动：<code>SchemaReactions</code> 用例
      </h2>
    }
  >
    <SchemaField>
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
        x-reactions={{
          target: "input",
          fulfill: {
            state: {
              display: "{{$self.value}}",
            },
          },
        }}
      />
      <SchemaField.String name="input" title="受控者" x-component="Input" x-decorator="FormItem" />
    </SchemaField>
  </Panel>
);

export default OneSchema;
