import { createForm } from "@formily/core";
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

const MarkupSchema: FC = () => (
  <FormBase
    footer={
      <div>
        <p>
          和 1: <code>Field</code> 实践案例不同的是，在 <code>schema</code> 中{" "}
          <code>ArrayField</code> 中的组件是通过 <code>useFieldSchema</code> +{" "}
          <code>RecursionField</code> 来渲染数组字段中的 <code>item</code> （在{" "}
          <code>MarkupSchema</code> 中 <code>children</code> 第一个是 <code>item</code>
          ，之后全部为 <code>properties</code>）
        </p>
        <p>
          <code>SchemaField</code> 和 <code>Field</code> 的区别：
        </p>
        <ul>
          <li>
            <code>SchemaField</code> 用来收集模型字段，如果是 <code>MarkupSchema</code> 会将收集的{" "}
            <code>schema</code> 转义一份完整的 <code>JsonSchema</code> 作为 <code>context</code>
          </li>
          <li>
            然后将 <code>JsonSchema</code> 按照节点转义成 <code>Field props</code>{" "}
            创建响应字段，并在渲染过程中包裹在指定 <code>schema</code> 节点{" "}
            <code>ContextProvider</code> 下
          </li>
          <li>
            而 <code>Field</code> 只作为收集字段属性以及渲染组件和渲染包装组件，如果是在{" "}
            <code>schema</code> 模式下，这部分属性通过 <code>SchemaField</code> 转义并以{" "}
            <code>props</code>、<code>context</code> 的形式传递过来
          </li>
          <li>
            <code>Field</code> 下的组件会通过 <code>createElement</code> 组合成嵌套关系，并因此享有{" "}
            <code>schema</code> 节点的 <code>context</code>，以及字段的 <code>props</code>
          </li>
        </ul>
      </div>
    }
    form={form}
    header={
      <h2>
        React.2: 使用 <code>MarkupSchema</code> + <code>RecursionField</code> 实现表单
      </h2>
    }
  >
    <SchemaField>
      <SchemaField.Object name="person" title="个人信息" x-decorator="VoidComponent">
        <SchemaField.String
          name="name"
          title="姓名"
          x-component="Input"
          x-decorator="FormItem"
          required
        />
        <SchemaField.Number
          name="age"
          title="年龄"
          x-component="InputDigit"
          x-decorator="FormItem"
          required
        />
      </SchemaField.Object>
      <SchemaField.Array
        name="contact"
        title="联系信息"
        x-component="ArrayItems"
        x-decorator="VoidComponent"
      >
        <SchemaField.Object title="信息" x-decorator="FormItem">
          <SchemaField.String
            format="phone"
            name="phone"
            x-component="Input"
            x-decorator="FormItem"
            x-component-props={{ placeholder: "电话" }}
            required
          />
          <SchemaField.String
            format="email"
            name="mail"
            x-component="Input"
            x-decorator="FormItem"
            x-component-props={{ placeholder: "邮箱" }}
            required
          />
        </SchemaField.Object>
      </SchemaField.Array>
    </SchemaField>
  </FormBase>
);

export default MarkupSchema;
