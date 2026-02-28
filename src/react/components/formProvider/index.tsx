import { Input } from "@formily/antd-v5";
import { createForm } from "@formily/core";
import { Field } from "@formily/react";
import { FC } from "react";
import FormItem from "../../../components/formItem/form-item";
import Panel from "../../Panel";

const form = createForm();

const FormProvider: FC = () => (
  <Panel
    footer={
      <div>
        <p>
          入口组件，用于下发表单上下文给字段组件，负责整个表单状态的通讯，它相当于是一个通讯枢纽。
        </p>
        <p>
          演示中已拆分至 <code>Panel</code> 组件中
        </p>
      </div>
    }
    form={form}
    header={
      <h2>
        <code>FormProvider</code>
      </h2>
    }
  >
    <Field name="input" component={[Input]} decorator={[FormItem]} />
  </Panel>
);

export default FormProvider;
