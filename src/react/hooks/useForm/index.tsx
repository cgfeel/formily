import { Input } from "@formily/antd-v5";
import { createForm } from "@formily/core";
import { Field } from "@formily/react";
import { FC } from "react";
import FormItem from "../../../components/formItem/form-item";
import FormLayout from "../../../components/formLayout/form-layout";
import Panel from "../../Panel";
import Custom from "./Custom";

const form = createForm();

const UseForm: FC = () => (
  <Panel
    footer={
      <p>
        主要在自定义组件中读取当前 <code>Form</code> 实例，用于实现一些副作用依赖，比如依赖{" "}
        <code>Form</code> 的 <code>errors</code> 信息之类的，用于实现一些较为复杂的场景化组件
      </p>
    }
    form={form}
    header={
      <h2>
        <code>useForm</code>
      </h2>
    }
  >
    <FormLayout layout="vertical">
      <Field name="input" title="Input" component={[Input]} decorator={[FormItem]} required />
      <Field name="custom" component={[Custom]} />
    </FormLayout>
  </Panel>
);

export default UseForm;
