import { FormItem, FormLayout, Input, Select } from "@formily/antd-v5";
import { createForm } from "@formily/core";
import { Field } from "@formily/react";
import { FC } from "react";
import Panel from "./Panel";

const form = createForm();

const FieldJsx: FC = () => (
  <Panel
    buttonItem={{ labelCol: 6, wrapperCol: 16 }}
    form={form}
    header={
      <h2>
        通过<code>Field Jsx</code>创建 <code>FormLayout</code>
      </h2>
    }
  >
    <FormLayout
      breakpoints={[680]}
      labelAlign={["left", "right"]}
      labelCol={[24, 6]}
      layout={["vertical", "horizontal"]}
      wrapperCol={[24, 16]}
    >
      <Field name="name" title="姓名" component={[Input]} decorator={[FormItem]} required />
      <Field
        name="sex"
        title="性别"
        component={[Select]}
        dataSource={[
          { label: "男", value: 1 },
          { label: "女", value: 2 },
        ]}
        decorator={[FormItem]}
        required
      />
    </FormLayout>
  </Panel>
);

export default FieldJsx;
