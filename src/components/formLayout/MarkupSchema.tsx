import { createForm } from "@formily/core";
import { FC } from "react";
import Panel from "./Panel";
import SchemaField from "./SchemaField";

const form = createForm();

const MarkupSchema: FC = () => (
  <Panel
    buttonItem={{ labelCol: 6, wrapperCol: 16 }}
    form={form}
    header={
      <h2>
        通过<code>Markup Schema</code>创建 <code>FormLayout</code>
      </h2>
    }
  >
    <SchemaField>
      <SchemaField.Void x-component="CustomCom">
        <SchemaField.Void x-component="CustomSub" />
      </SchemaField.Void>
      <SchemaField.Void
        x-component="FormLayout"
        x-component-props={{
          labelCol: 6,
          wrapperCol: 16,
        }}
      >
        <SchemaField.String
          name="name"
          title="姓名"
          x-component="Input"
          x-decorator="FormItem"
          x-decorator-props={{
            tooltip: <div>123</div>,
          }}
          required
        />
        <SchemaField.String
          name="sex"
          title="性别"
          x-component="Select"
          x-decorator="FormItem"
          enum={[
            { label: "男", value: 1 },
            { label: "女", value: 2 },
          ]}
          required
        />
      </SchemaField.Void>
    </SchemaField>
  </Panel>
);

export default MarkupSchema;
