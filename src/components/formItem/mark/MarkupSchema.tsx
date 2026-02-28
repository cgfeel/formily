import { FC } from "react";
import Layout from "./Layout";
import SchemaField from "../SchemaField";

const MarkupSchema: FC = () => (
  <Layout>
    <SchemaField>
      <SchemaField.String
        name="input1"
        title="我是必填项"
        x-component="Input"
        x-decorator="FormItem"
        required
      />
      <SchemaField.String
        name="input2"
        title="我是选填项"
        x-component="Input"
        x-decorator="FormItem"
      />
      <SchemaField.String
        default="字段不可编辑时，始终隐藏必填/选填标识"
        name="input3"
        title="不可编辑"
        x-component="Input"
        x-decorator="FormItem"
        x-editable={false}
      />
      <SchemaField.String
        default="不可编辑"
        name="input4"
        title="我是必填项"
        x-component="Input"
        x-decorator="FormItem"
        x-editable={false}
        required
      />
      <SchemaField.String
        default="不可编辑"
        name="input5"
        title="我是选填项"
        x-component="Input"
        x-decorator="FormItem"
        x-editable={false}
      />
    </SchemaField>
  </Layout>
);

export default MarkupSchema;
