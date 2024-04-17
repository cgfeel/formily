import { createForm, registerValidateFormats } from "@formily/core";
import { FC } from "react";
import CustomFormat from "../../../components/validate/component/markup/CustomFormat";
import SchemaField from "../../../components/validate/SchemaField";
import Panel from "../Panel";
import TabList from "../TabList";

registerValidateFormats({
    custom_format: /123/,
    integer: /^[+-]?\d+$/,
});

const form = createForm();

const RegistryValidateFormate: FC = () => (
    <TabList>
        <Panel
            footer={
                <p>
                    注册通用正则规则，目前内置正则库参考：
                    <a href="https://github.com/alibaba/formily/blob/formily_next/packages/core/src/shared/checkers.ts">
                        formats.ts
                    </a>
                    ，<code>registerValidateFormats</code> 用于自定义校验规则，在字段中需要通过 <code>validator</code>{" "}
                    引入
                </p>
            }
            form={form}
            header={<h2>registerValidateFormats</h2>}>
            <CustomFormat>
                <SchemaField.String
                    name="number-input"
                    title="仅限正负数值"
                    x-component="Input"
                    x-decorator="FormItem"
                    x-validator={{
                        format: "integer",
                        message: "错误❎",
                    }}
                    required
                />
            </CustomFormat>
        </Panel>
    </TabList>
);

export default RegistryValidateFormate;
