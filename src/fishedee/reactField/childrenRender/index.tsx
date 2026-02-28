import { FormItem } from "@formily/antd-v5";
import { createForm } from "@formily/core";
import { ArrayField, Field, ObjectField } from "@formily/react";
import { FC } from "react";
import Input from "../../coreReactive/Input";
import InputDigit from "../../coreReactive/InputDigit";
import VoidComponent from "../VoidComponent";
import ArrayItems from "./ArrayItems";
import FormBase from "./FormBase";

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

const ChildrenRender: FC = () => (
  <FormBase
    footer={
      <p>
        原理：通过 <code>props</code> 传递一个 <code>childrenRender</code>，然后在{" "}
        <code>arrayField</code> 组件内部通过 <code>useField</code> 获取 <code>componentProps</code>{" "}
        进行渲染
      </p>
    }
    form={form}
    header={
      <h2>
        React.1: 通过 <code>props</code> 传递 <code>ArrayField</code> 的 <code>item</code>
      </h2>
    }
  >
    <ObjectField name="person" title="个人信息" decorator={[VoidComponent]}>
      <Field name="name" title="姓名" component={[Input]} decorator={[FormItem]} required />
      <Field name="age" title="年龄" component={[InputDigit]} decorator={[FormItem]} required />
    </ObjectField>
    <ArrayField
      name="contact"
      title="联系信息"
      component={[
        ArrayItems,
        {
          defaultData: {},
          childrenRender: (index: number) => (
            <ObjectField title="信息" name={index} key={index} decorator={[FormItem]}>
              <Field
                name="phone"
                component={[Input, { placeholder: "电话" }]}
                decorator={[FormItem]}
                validator={{ format: "phone" }}
                required
              />
              <Field
                name="mail"
                component={[Input, { placeholder: "邮件" }]}
                decorator={[FormItem]}
                validator={{ format: "email" }}
                required
              />
            </ObjectField>
          ),
        },
      ]}
      decorator={[VoidComponent]}
    />
  </FormBase>
);

export default ChildrenRender;
