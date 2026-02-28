import { createForm } from "@formily/core";
import { FC } from "react";
import Panel from "../Panel";
import SchemaField from "../SchemaField";

const form = createForm();

const ChainSchema: FC = () => (
  <Panel
    footer={
      <p>
        <code>reactions</code>可以一层一层匹配联动，需要注意的是，设置 <code>$self.value</code>{" "}
        时需要强制转意一下：<code>!!$self.value</code>
        ，其原因有可能在初始联动时找不到字段得到的值不正确
      </p>
    }
    form={form}
    header={
      <h2>
        链式联动：<code>SchemaReactions</code> 用例
      </h2>
    }
  >
    <SchemaField>
      <SchemaField.Boolean
        default={false}
        name="select"
        title="控制者"
        x-component="Select"
        x-decorator="FormItem"
        enum={[
          { label: "显示", value: true },
          { label: "隐藏", value: false },
        ]}
        x-reactions={{
          target: "input1",
          fulfill: {
            state: {
              visible: "{{!!$self.value}}",
            },
          },
        }}
      />
      <SchemaField.Boolean
        default={true}
        name="input1"
        title="受控者"
        x-component="Select"
        x-decorator="FormItem"
        enum={[
          { label: "显示", value: true },
          { label: "隐藏", value: false },
        ]}
        x-reactions={{
          target: "input2",
          fulfill: {
            state: {
              visible: "{{!!$self.value}}",
            },
          },
        }}
      />
      <SchemaField.String name="input2" title="受控者" x-component="Input" x-decorator="FormItem" />
    </SchemaField>
  </Panel>
);

export default ChainSchema;
