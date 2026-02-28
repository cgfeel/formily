import { createForm } from "@formily/core";
import { FC } from "react";
import Panel from "../../Panel";
import SchemaField from "./SchemaField";

const form = createForm();

const Simple: FC = () => (
  <Panel
    footer={
      <p>
        递归渲染组件，主要基于{" "}
        <a href="https://react.formilyjs.org/api/shared/schema">JSON-Schema</a> 做递归渲染，它是{" "}
        <a href="https://react.formilyjs.org/api/components/schema-field">SchemaField</a>{" "}
        组件内部的核心渲染组件，当然，它是可以独立于 <code>SchemaField</code>{" "}
        单独使用的，我们使用的时候主要是在自定义组件中使用，用于实现具有递归渲染能力的自定义组件
      </p>
    }
    form={form}
    header={
      <h2>
        <code>RecursionField</code> - 简单递归
      </h2>
    }
  >
    <SchemaField>
      <SchemaField.Object
        name="custom"
        x-component="Custom"
        x-component-props={{
          schema: {
            type: "object",
            properties: {
              input: {
                type: "string",
                "x-component": "Input",
                "x-decorator": "FormItem",
              },
            },
          },
        }}
      />
    </SchemaField>
  </Panel>
);

export default Simple;
