import { createForm } from "@formily/core";
import { FC } from "react";
import Panel from "../Panel";
import { FORMATS } from "../SchemaField";
import InputFormat from "../component/fiexd/InputFormat";

const form = createForm();

const FieldJsx: FC = () => (
  <Panel
    footer={
      <p>
        <code>Field Jsx</code>模式下，不支持<code>props</code>设置格式，仅支持<code>validator</code>{" "}
        4 种格式设置
      </p>
    }
    form={form}
    header={
      <h2>
        内置格式校验 - <code>Field Jsx</code>
      </h2>
    }
  >
    {FORMATS.map(key => (
      <InputFormat format={key} key={key} />
    ))}
  </Panel>
);

export default FieldJsx;
