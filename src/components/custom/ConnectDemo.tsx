import { createForm } from "@formily/core";
import { FormConsumer } from "@formily/react";
import { FC } from "react";
import Panel from "./Panel";
import SchemaField from "./SchemaField";

const form = createForm();

const ConnectDemo: FC = () => (
  <Panel
    labelCol={0}
    consumer={
      <code className="consumer">
        <pre>
          <FormConsumer>{form => JSON.stringify(form.values, null, 2)}</FormConsumer>
        </pre>
      </code>
    }
    footer={
      <div>
        <p>
          <code>connect</code> 连接组件同时，搭配使用映射器：<code>mapProps</code> 和{" "}
          <code>mapReadPretty</code>；通常用于在表单中连接第三方组件库
        </p>
      </div>
    }
    form={form}
    header={
      <h2>
        通过 <code>connect</code> 接入组件库
      </h2>
    }
  >
    <SchemaField>
      <SchemaField.String
        default="editable"
        name="show"
        x-component="Radio.Group"
        x-decorator="FormItem"
        enum={[
          { label: "编辑", value: "editable" },
          { label: "只读", value: "readPretty" },
        ]}
        x-reactions={{
          dependencies: ["input#value"],
          fulfill: {
            state: {
              disabled: "{{!$deps[0]}}",
            },
          },
        }}
        required
      />
      <SchemaField.String
        name="input"
        x-component="ReactInput"
        x-decorator="FormItem"
        x-reactions={{
          dependencies: ["show#value"],
          fulfill: {
            schema: {
              "x-pattern": "{{$deps[0]}}",
            },
          },
        }}
        required
      />
    </SchemaField>
  </Panel>
);

export default ConnectDemo;
