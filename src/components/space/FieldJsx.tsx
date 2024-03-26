import { Input, Space } from "@formily/antd-v5";
import { createForm } from "@formily/core";
import { Field } from "@formily/react";
import { FC } from "react";
import Panel from "./Panel";
import FormItem from "../formItem/form-item";
import { createStyles, css } from "antd-style";

const form = createForm();
const useStyles = createStyles(css`
    width: 400px;
`);

const FieldJsx: FC = () => {
    const { styles } = useStyles();
    return (
        <Panel
            form={form}
            header={
                <h2>
                    通过<code>Field Jsx</code>实现<code>Space</code>
                </h2>
            }>
            <Field
                name="name"
                title="姓名"
                component={[Space]}
                decorator={[FormItem, { asterisk: true, feedbackLayout: "none" }]}>
                <Field name="first-name" component={[Input]} decorator={[FormItem]} required />
                <Field name="last-name" component={[Input]} decorator={[FormItem]} required />
            </Field>
            <Field
                name="texts"
                title="纯文本"
                component={[Space]}
                decorator={[FormItem, { asterisk: true, feedbackLayout: "none" }]}>
                <Field name="aa" component={[Input]} decorator={[FormItem, { addonAfter: "单位" }]} required />
                <Field name="bb" component={[Input]} decorator={[FormItem, { addonAfter: "单位" }]} required />
                <Field name="cc" component={[Input]} decorator={[FormItem, { addonAfter: "单位" }]} required />
            </Field>
            <Field
                name="textarea"
                title="文本框"
                component={[Input.TextArea, { className: styles }]}
                decorator={[FormItem]}
                required
            />
        </Panel>
    );
};

export default FieldJsx;
