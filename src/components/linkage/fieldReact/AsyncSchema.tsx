import { createForm } from "@formily/core";
import { FC } from "react";
import Panel from "../Panel";
import SchemaField from "../SchemaField";
import { asyncReact } from "../server";

const form = createForm();

const AsyncSchema: FC = () => (
  <Panel
    footer={
      <div>
        <p>
          通过 <code>scope</code> 传递 <code>reaction</code> 依赖的异步函数
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
    <SchemaField scope={{ asyncReact }}>
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
        x-visible={false}
        x-reactions="{{asyncReact}}"
      />
    </SchemaField>
  </Panel>
);

export default AsyncSchema;
