import { createForm, registerValidateFormats } from "@formily/core";
import { FC } from "react";
import Panel from "../Panel";
import CustomFormat from "../component/fiexd/CustomFormat";

registerValidateFormats({ custom_format: /123/ });
const form = createForm();

const FieldJsx: FC = () => (
    <Panel
        footer={
            <p>
                在 <code>Json Field</code> 是不能通过 <code>props</code> 去匹配自定义格式，它缺少全局匹配的{" "}
                <code>format</code>，然而局部定义的 <code>pattern</code> 是用来作为表单展示模式的，例如只读数据{" "}
                <code>readonly</code>，而不能用于数据格式匹配
            </p>
        }
        form={form}
        header={
            <h2>
                自定义格式校验 - <code>Json Field</code>
            </h2>
        }>
        <CustomFormat />
    </Panel>
);

export default FieldJsx;
