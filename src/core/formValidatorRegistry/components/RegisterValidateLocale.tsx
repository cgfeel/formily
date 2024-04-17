import { createForm, registerValidateLocale, setValidateLanguage } from "@formily/core";
import { FC } from "react";
import Panel from "../Panel";
import SchemaField from "../SchemaField";
import TabList from "../TabList";

setValidateLanguage("ja");
registerValidateLocale({
    ja: {
        required: "この項目は必須です!!!",
    },
});

const form = createForm();

const RegisterValidateLocale: FC = () => (
    <TabList>
        <Panel
            footer={
                <p>
                    <code>setValidateLanguage</code> 定制语言，<code>registerValidateLocale</code> 定制提示
                </p>
            }
            form={form}
            header={
                <h2>
                    <code>registerValidateLocale</code> + <code>setValidateLanguage</code>
                </h2>
            }>
            <SchemaField>
                <SchemaField.String name="input" title="输入框" x-component="Input" x-decorator="FormItem" required />
            </SchemaField>
        </Panel>
    </TabList>
);

export default RegisterValidateLocale;
