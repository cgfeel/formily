import { createForm, setValidateLanguage } from "@formily/core";
import { FC } from "react";
import Panel from "../Panel";
import SchemaField from "../SchemaField";
import TabList from "../TabList";

setValidateLanguage("zh-CN");
const form = createForm();

const SetValidateLanguageZhCn: FC = () => (
    <TabList>
        <Panel
            footer={<p>默认为中文，可以不用单独设置，表单不要填写内容直接点击提交按钮查看演示</p>}
            form={form}
            header={
                <h2>
                    <code>setValidateLanguage</code> - 设置中文
                </h2>
            }>
            <SchemaField>
                <SchemaField.String name="input" title="输入" x-component="Input" x-decorator="FormItem" required />
            </SchemaField>
        </Panel>
    </TabList>
);

export default SetValidateLanguageZhCn;
