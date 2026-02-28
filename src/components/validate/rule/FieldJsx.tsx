import { createForm } from "@formily/core";
import { FC } from "react";
import Panel from "../Panel";
import InputLength from "../component/fiexd/InputLength";
import InputNumberRule from "../component/fiexd/InputNumberRule";
import InputRequired from "../component/fiexd/InputRequired";
import NumberMax from "../component/fiexd/NumberMax";
import NumberMin from "../component/fiexd/NumberMin";

const form = createForm();

const FieldJsx: FC = () => (
  <Panel
    footer={
      <p>
        <code>Field Jsx</code>对于每个规则分别有 2 种设置模式：①
        <code>x-validator</code>传递对象、②<code>validator</code>传递数组对象（少数规则除外，例如：
        <code>required</code>）。
      </p>
    }
    form={form}
    header={
      <h2>
        内置规则校验 - <code>Fiexd Jsx</code>
      </h2>
    }
  >
    <InputRequired />
    <NumberMax />
    <NumberMin />
    <InputLength />
    <InputNumberRule />
  </Panel>
);

export default FieldJsx;
