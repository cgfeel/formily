import { createForm } from "@formily/core";
import { FC } from "react";
import Panel from "../Panel";
import SchemaField from "../SchemaField";
import InputLength from "../component/markup/InputLength";
import InputNumberRule from "../component/markup/InputNumberRule";
import InputRequired from "../component/markup/InputRequired";
import NumberMax from "../component/markup/NumberMax";
import NumberMin from "../component/markup/NumberMin";

const form = createForm();

const MarkupSchema: FC = () => (
  <Panel
    footer={
      <p>
        <code>Schema</code>对于每个规则分别有 3 种设置模式：①<code>props</code>设置、②
        <code>x-validator</code>传递对象、③<code>x-validator</code>传递数组对象。
      </p>
    }
    form={form}
    header={
      <h2>
        内置规则校验 - <code>Markup Schema</code>
      </h2>
    }
  >
    <SchemaField>
      <InputRequired />
      <NumberMax />
      <NumberMin />
      <InputLength />
      <InputNumberRule />
    </SchemaField>
  </Panel>
);

export default MarkupSchema;
