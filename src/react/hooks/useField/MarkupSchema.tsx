import { createForm } from "@formily/core";
import { FC } from "react";
import SchemaField from "./SchemaField";
import Wraper from "./Wraper";

const form = createForm();

const MarkupSchema: FC = () => (
  <Wraper
    footer={
      <div>
        <p>
          主要用在自定义组件内读取当前字段属性，操作字段状态等，在所有 <code>Field</code>{" "}
          组件的子树内都能使用，注意，拿到的是{" "}
          <a href="https://core.formilyjs.org/zh-CN/api/models/field#generalfield">GeneralField</a>
          ，如果需要对不同类型的字段做处理，请使用
          <a href="https://core.formilyjs.org/zh-CN/api/entry/form-checker">Type Checker</a>
        </p>
        <p>
          注意：如果要在自定义组件内使用 <code>useField</code>
          ，并响应字段模型变化，那需要给自定义组件包装 <code>observer</code>
        </p>
      </div>
    }
    form={form}
    header={
      <h2>
        <code>useField</code> - MarkupSchema
      </h2>
    }
  >
    <SchemaField>
      <SchemaField.String
        name="name"
        title="Name"
        x-component="Input"
        x-decorator="FormItem"
        required
      />
    </SchemaField>
  </Wraper>
);

export default MarkupSchema;
