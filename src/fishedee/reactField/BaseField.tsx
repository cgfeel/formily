import { FormItem } from "@formily/antd-v5";
import { createForm } from "@formily/core";
import { ArrayField, Field, FormConsumer, ObjectField, VoidField } from "@formily/react";
import { FC } from "react";
import Input from "../coreReactive/Input";
import InputDigit from "../coreReactive/InputDigit";
import Wrapper from "../fieldAction/Wrapper";
import VoidComponent from "./VoidComponent";

const defaultPlaceholder = { placeholder: "Please Input" };

const form = createForm({
  initialValues: {
    age: 18,
    name: "levi",
    array: ["react", "formily"],
    field: "field",
    object: {
      name: "levi",
      age: 18,
    },
  },
});

const BaseField: FC = () => (
  <Wrapper
    footer={<p>对于数组字段还有对象字段在官方文档有自增案例，如下：</p>}
    form={form}
    header={
      <h2>
        React.1: <code>Formily</code> 字段的 <code>React</code> 实现
      </h2>
    }
  >
    <Field
      name="field"
      title="field"
      component={[Input, defaultPlaceholder]}
      decorator={[FormItem]}
    />
    <ObjectField name="object" title="object" decorator={[VoidComponent]}>
      <Field
        name="name"
        title="name"
        component={[Input, defaultPlaceholder]}
        decorator={[FormItem]}
      />
      <Field
        name="age"
        title="age"
        component={[InputDigit, defaultPlaceholder]}
        decorator={[FormItem]}
      />
    </ObjectField>
    <ArrayField name="array" title="array" decorator={[VoidComponent]}>
      <Field
        name="0"
        title="array.0"
        component={[Input, defaultPlaceholder]}
        decorator={[FormItem]}
      />
      <Field
        name="1"
        title="array.1"
        component={[Input, defaultPlaceholder]}
        decorator={[FormItem]}
      />
    </ArrayField>
    <VoidField
      description={
        <div>
          补充：虚拟节点不仅没有 <code>value</code>
          ，在获取子节点时，虚拟路径可以忽略，通常有两个作用：① 布局；② 收集 <code>schema</code>
        </div>
      }
      name="void"
      title="void"
      decorator={[VoidComponent]}
    >
      <Field
        name="name"
        title="name"
        component={[Input, defaultPlaceholder]}
        decorator={[FormItem]}
      />
      <Field
        name="age"
        title="age"
        component={[InputDigit, defaultPlaceholder]}
        decorator={[FormItem]}
      />
    </VoidField>
    <code className="consumer">
      <pre>
        <FormConsumer>{form => JSON.stringify(form.values, null, 2)}</FormConsumer>
      </pre>
    </code>
  </Wrapper>
);

export default BaseField;
