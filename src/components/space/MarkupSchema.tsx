import { createForm } from "@formily/core";
import { FC } from "react";
import Panel from "./Panel";
import SchemaField from "./SchemaField";

const form = createForm();

const MarkupSchema: FC = () => (
    <Panel
        form={form}
        header={
            <h2>
                通过<code>Markup Schema</code>实现<code>Space</code>
            </h2>
        }>
        <SchemaField>
            <SchemaField.Void
                title="姓名"
                x-component="Space"
                x-decorator="FormItem"
                x-decorator-props={{
                    asterisk: true,
                    feedbackLayout: "none",
                }}>
                <SchemaField.String name="first-name" x-component="Input" x-decorator="FormItem" required />
                <SchemaField.String name="last-name" x-component="Input" x-decorator="FormItem" required />
            </SchemaField.Void>
            <SchemaField.Void
                title="文本串联"
                x-component="Space"
                x-decorator="FormItem"
                x-decorator-props={{
                    asterisk: true,
                    feedbackLayout: "none",
                }}>
                <SchemaField.String
                    name="aa"
                    x-component="Input"
                    x-decorator="FormItem"
                    x-decorator-props={{ addonAfter: "单位" }}
                    required
                />
                <SchemaField.String
                    name="bb"
                    x-component="Input"
                    x-decorator="FormItem"
                    x-decorator-props={{ addonAfter: "单位" }}
                    required
                />
                <SchemaField.String
                    name="cc"
                    x-component="Input"
                    x-decorator="FormItem"
                    x-decorator-props={{ addonAfter: "单位" }}
                    required
                />
            </SchemaField.Void>
            <SchemaField.String name="textarea" title="文本框" x-component="TextArea" x-decorator="FormItem" required />
        </SchemaField>
    </Panel>
);

export default MarkupSchema;
