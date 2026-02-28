import { createForm } from "@formily/core";
import { ISchema } from "@formily/react";
import { FC } from "react";
import { FormConsumer, FormProvider } from "../customField/Context";
import Panel from "../Panel";
import SchemaField from "./SchemaField";

const form = createForm({
  initialValues: {
    person: {
      name: "levi",
      age: 12,
    },
    contact: [
      {
        phone: "1234567890123",
        mail: "11@22.com",
      },
    ],
  },
});

const schema: ISchema = {
  type: "object",
  properties: {
    person: {
      title: "个人信息",
      type: "object",
      "x-decorator": "VoidComponent",
      properties: {
        name: {
          required: true,
          title: "名称",
          type: "string",
          "x-component": "Input",
          "x-decorator": "FormItem",
        },
        age: {
          required: true,
          title: "年龄",
          type: "number",
          "x-component": "InputDigit",
          "x-decorator": "FormItem",
        },
      },
    },
    contact: {
      title: "联系信息",
      type: "array",
      "x-component": "ArrayItem",
      "x-decorator": "VoidComponent",
      items: {
        title: "信息",
        type: "object",
        "x-decorator": "FormItem",
        properties: {
          phone: {
            format: "phone",
            required: true,
            type: "string",
            "x-component": "Input",
            "x-decorator": "FormItem",
            "x-component-props": {
              placeholder: "电话",
            },
          },
          mail: {
            format: "email",
            required: true,
            type: "string",
            "x-component": "Input",
            "x-decorator": "FormItem",
            "x-component-props": {
              placeholder: "邮件",
            },
          },
        },
      },
    },
  },
};

const JsonSchema: FC = () => (
  <Panel
    footer={
      <div>
        <p>优化：</p>
        <ul>
          <li>
            <code>schema</code> 的类型直接沿用了 <code>ISchema</code>，并没有像文档那样自定义
          </li>
          <li>
            完全按照 <code>formily</code> 来处理，通过 <code>createSchemaField</code> 返回一个{" "}
            <code>SchemaField</code> 组件用来解析 <code>Schema</code>
          </li>
          <li>
            完全按照 <code>React</code> 组件规范来，将模型渲染分成 3 个组件 <code>RenderCom</code>、
            <code>RenderProperties</code>、<code>RecursionField</code>
            ，而并非在一个组件中，通过传统函数的形式渲染
          </li>
        </ul>
        <p>
          渲染原理，三个方法递归 <code>schema</code> 实现（在“复现字段”基础上）：
        </p>
        <ul>
          <li>
            <code>RenderCom</code>：将 <code>Schema</code> 递归转化为 <code>Field Props</code>
            <ul>
              <li>
                如果 <code>type</code> 是 <code>object</code> 或 <code>array</code>，传递了{" "}
                <code>onlyRenderProperties</code> 属性，则会放弃自身渲染，将{" "}
                <code>schema.properties</code> 交给 <code>RenderProperties</code> 处理
              </li>
              <li>
                如果 <code>type</code> 是 <code>object</code> 会将 <code>schema.properties</code>{" "}
                交给 <code>RenderProperties</code> 处理
              </li>
              <li>
                其他情况只转换并传递 <code>Field Props</code> 进行渲染
              </li>
            </ul>
          </li>
          <li>
            <code>RecursionField</code>：提供 <code>FieldSchemaContext</code>，为每一个节点包裹{" "}
            <code>schema</code> 节点
          </li>
          <li>
            <code>RenderProperties</code>：遍历每一个 <code>schema.properties</code>，为它们包裹一个{" "}
            <code>RecursionField</code>，将上下文匹配到节点
          </li>
        </ul>
        <p>补充：</p>
        <ul>
          <li>
            对于 <code>createSchemaField</code> 目前只要了解{" "}
            <code>{"<RecursionField schema={baseSchema} onlyRenderProperties />"}</code>
            ，这个文件中其他都是为了 <code>MarkupSchema</code>
          </li>
          <li>
            <code>schema</code> 中的 <code>properties</code>、<code>items</code> 通过{" "}
            <code>JsonSchema</code> 写出来，不用在组件中去判断做区分
          </li>
          <li>
            整个过程就是不断递归遍历 <code>schema</code> 并将每一个节点包裹一个上下文，在节点{" "}
            <code>Field</code> 渲染在节点 <code>schema</code> 上下文内
          </li>
        </ul>
        <p>备注：</p>
        <ul>
          <li>
            <code>Schema</code> 中组件和包装组件渲染见 2: 字段模型 <code>SchemaField</code>
          </li>
        </ul>
      </div>
    }
    header={<h2>Core4.1: 复现 JsonSchema</h2>}
  >
    <FormProvider form={form}>
      <SchemaField schema={schema} />
      <code className="consumer">
        <pre>
          <FormConsumer>{form => JSON.stringify(form.values, null, 2)}</FormConsumer>
        </pre>
      </code>
    </FormProvider>
  </Panel>
);

export default JsonSchema;
