import { createForm } from "@formily/core";
import { FC } from "react";
import Panel from "../../Panel";
import SchemaField from "./SchemaField";

const form = createForm();

const UseFieldSchema: FC = () => (
  <Panel
    footer={
      <div>
        <p>
          主要在自定义组件中读取当前字段的 <code>Schema</code> 信息，该 <code>hook</code> 只能用在{" "}
          <code>SchemaField</code> 或者 <code>RecursionField</code> 的子树中使用
        </p>
        <p>
          <code>useField</code> 和 <code>useFieldSchema</code> 的区别在于，<code>useField</code>{" "}
          返回的是 <a href="https://core.formilyjs.org/zh-CN/api/models/field">Field</a> 对象，而{" "}
          <code>useFieldSchema</code> 返回的是{" "}
          <a href="https://react.formilyjs.org/zh-CN/api/shared/schema">Schema</a> 对象
        </p>
      </div>
    }
    form={form}
    header={
      <h2>
        <code>useFieldSchema</code>
      </h2>
    }
  >
    <SchemaField>
      <SchemaField.Object
        name="custom"
        title="Custom"
        x-component="Custom"
        x-component-props={{
          schema_field: {
            type: "object",
            properties: {
              input: {
                type: "string",
                "x-component": "Custom",
              },
            },
          },
        }}
      />
    </SchemaField>
  </Panel>
);

export default UseFieldSchema;
