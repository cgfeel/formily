import { FormItem, NumberPicker } from "@formily/antd-v5";
import { createForm, registerValidateLocale } from "@formily/core";
import { Field } from "@formily/react";
import { FC } from "react";
import Panel from "../Panel";

registerValidateLocale({
    "zh-CN": {
        required: "定制的必填校验文案",
    },
});
const form = createForm();

const FieldJsx: FC = () => (
    <Panel
        footer={
            <p>
                和文档相同，这里是通过<code>reactions</code>传递一个方法作为响应
            </p>
        }
        form={form}
        header={
            <h2>
                联动校验 + 自定义文案 - <code>Fiexd Jsx</code>
            </h2>
        }>
        <Field
            name="aa"
            title="AA"
            component={[NumberPicker]}
            decorator={[FormItem]}
            reactions={field => {
                field.selfErrors = field.query("bb").value() >= field.value ? ["AA必须大于BB"] : [];
            }}
            required
        />
        <Field
            name="bb"
            title="BB"
            component={[NumberPicker]}
            decorator={[FormItem]}
            reactions={field => {
                field.selfErrors = field.query("aa").value() <= field.value ? ["AA必须大于BB"] : [];
            }}
            required
        />
    </Panel>
);

export default FieldJsx;
