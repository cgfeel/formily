import { createForm } from "@formily/core";
import { Select } from "@formily/antd-v5";
import { FC } from "react";
import Panel from "../../Panel";
import SchemaField from "./SchemaField";
import useStyles from "./styles";

const form = createForm();

const JsonSchema: FC = () => {
  const { styles } = useStyles();
  return (
    <Panel
      footer={
        <p>
          可以在已声明的 <code>schemaField</code>{" "}
          对象中通过组件属性的方式动态添加：局部作用域、组件、
          <code>json schema</code>等
        </p>
      }
      form={form}
      header={<h2>Json Schema</h2>}
    >
      <SchemaField components={{ Select }}>
        <SchemaField.String
          name="input"
          x-component="Input"
          x-decorator="FormItem"
          x-component-props={{ allowClear: true }}
        />
        <SchemaField.String
          name="select"
          x-component="Select"
          x-decorator="FormItem"
          x-decorator-props={{ className: styles }}
        />
      </SchemaField>
    </Panel>
  );
};

export default JsonSchema;
