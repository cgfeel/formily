import { createForm, setValidateLanguage } from "@formily/core";
import { FC } from "react";
import Panel from "../Panel";
import SchemaField from "../SchemaField";
import TabList from "../TabList";

setValidateLanguage("en-US");
const form = createForm();

const SetValidateLanguageEnUs: FC = () => (
    <TabList>
        <Panel
            footer={
                <p>
                    表单不要填写内容直接点击提交按钮查看演示，默认的提示信息和自带的语言查看：
                    <a href="https://github.com/alibaba/formily/blob/master/packages/validator/src/locale.ts">
                        locale.ts
                    </a>
                </p>
            }
            form={form}
            header={
                <h2>
                    <code>setValidateLanguage</code> - 设置英文
                </h2>
            }>
            <SchemaField>
                <SchemaField.String name="input" title="输入" x-component="Input" x-decorator="FormItem" required />
            </SchemaField>
        </Panel>
    </TabList>
);

export default SetValidateLanguageEnUs;
