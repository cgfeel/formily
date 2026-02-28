import { createForm, registerValidateFormats } from "@formily/core";
import { FC } from "react";
import Panel from "../Panel";
import CustomFormat from "../component/markup/CustomFormat";

registerValidateFormats({ custom_format: /123/ });
const form = createForm();

const MarkupSchema: FC = () => (
  <Panel
    footer={
      <p>
        校验方式和内置格式一样，不同在于局部定义格式通过 <code>pattern</code> 而不是{" "}
        <code>format</code>
      </p>
    }
    form={form}
    header={
      <h2>
        自定义格式校验 - <code>Markup Schema</code>
      </h2>
    }
  >
    <CustomFormat />
  </Panel>
);

export default MarkupSchema;
