import { createForm } from "@formily/core";
import { FC } from "react";
import Panel from "../Panel";
import SchemaField from "../SchemaField";

const form = createForm();

const OneSchema: FC = () => (
  <Panel
    footer={
      <div>
        <p>
          通过 <code>schema</code> 中使用 <code>reactions</code> 实现被动响应
        </p>
        <p>
          响应对象即可以是一个数组 <code>[]</code>，也可以是单个对象 <code>[]</code>
        </p>
        <p>
          巩固：只要 <code>schema</code> 响应对象中没有 <code>target</code> 就是被动依赖
        </p>
      </div>
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
          { label: "隐藏-保留值", value: "hidden" },
        ]}
      />
      <SchemaField.String
        name="input"
        title="受控者"
        x-component="Input"
        x-decorator="FormItem"
        x-reactions={{
          dependencies: ["select"],
          fulfill: {
            state: {
              display: "{{$deps[0]}}",
            },
          },
        }}
      />
    </SchemaField>
  </Panel>
);

export default OneSchema;
