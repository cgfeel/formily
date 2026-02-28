import { createForm } from "@formily/core";
import { ISchema } from "@formily/react";
import { FC } from "react";
import FormBase from "../reactField/childrenRender/FormBase";
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
          title: "姓名",
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
      "x-component": "ArrayItems",
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
              placeholder: "邮箱",
            },
          },
        },
      },
    },
  },
};

const JsonSchema: FC = () => (
  <FormBase
    footer={
      <p>
        <code>RecursionField</code>{" "}
        除了用于渲染数组字段节点以外，还可以用于联动过程中回收、渲染字段，如下
      </p>
    }
    form={form}
    header={
      <h2>
        使用 <code>JsonSchema</code> + <code>RecursionField</code> 实现表单
      </h2>
    }
  >
    <SchemaField schema={schema} />
  </FormBase>
);

export default JsonSchema;
