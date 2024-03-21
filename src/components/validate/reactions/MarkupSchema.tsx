import { createForm, onFieldReact, registerValidateLocale } from "@formily/core";
import { FC } from "react";
import Panel from "../Panel";
import SchemaField from "../SchemaField";

registerValidateLocale({
    "zh-CN": {
        required: "定制的必填校验文案",
    },
});

const form = createForm({
    effects: () => {
        onFieldReact("aa", field => {
            if ("selfErrors" in field && "value" in field) {
                field.selfErrors = field.query("bb").value() >= field.value ? ["AA必须大于BB"] : [];
            }
        });
        onFieldReact("bb", field => {
            if ("selfErrors" in field && "value" in field) {
                field.selfErrors = field.query("aa").value() <= field.value ? ["AA必须大于BB"] : [];
            }
        });
    },
});

const MarkupSchema: FC = () => (
    <Panel
        footer={
            <div>
                <p>
                    和文档不同，分别通过不同的形式进行联动，这里是在<code>createForm</code>中使用<code>effects</code>
                    进行操作
                </p>
                <p>
                    巩固：采用被动联动模式：<code>onFieldReact</code>
                    ，当关联对象和自身数据都发生变更的时候都会响应；而主动联动：<code>onFieldChange</code>
                    ，只适合监听自身数据改变去操作其他表单组件，而当其他表单组件数据发生变更的时候不会做出任何反应。
                </p>
            </div>
        }
        form={form}
        header={
            <h2>
                联动校验 + 自定义文案 - <code>Markup Schema</code>
            </h2>
        }>
        <SchemaField>
            <SchemaField.Number name="aa" title="AA" x-component="NumberPicker" x-decorator="FormItem" required />
            <SchemaField.Number name="bb" title="BB" x-component="NumberPicker" x-decorator="FormItem" required />
        </SchemaField>
    </Panel>
);

export default MarkupSchema;
