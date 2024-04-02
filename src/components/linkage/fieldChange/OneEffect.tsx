import { createForm, isField, onFieldValueChange } from "@formily/core";
import { FC } from "react";
import Panel from "../Panel";
import SchemaField from "../SchemaField";

const form = createForm({
    effects: () => {
        onFieldValueChange("select", field => {
            // 对于初始联动，如果字段找不到，setFieldState会将更新推入更新队列，直到字段出现再执行操作
            isField(field) &&
                form.setFieldState("input", state => {
                    state.display = field.value;
                });
        });
    },
});

const OneEffect: FC = () => (
    <Panel
        footer={
            <p>
                <code>onFieldValueChange</code>：监听指定字段数据变化，也可以使用 <code>onFieldChange</code>
                ，如果仅需要监听字段值的变化建议使用<code>onFieldValueChange</code>
            </p>
        }
        form={form}
        header={
            <h2>
                一对一联动：<code>Effects</code> 用例
            </h2>
        }>
        <SchemaField>
            <SchemaField.String
                default="visible"
                name="select"
                title="控制者"
                x-component="Select"
                x-decorator="FormItem"
                enum={[
                    { label: "显示", value: "visible" },
                    { label: "隐藏", value: "none" },
                    { label: "隐藏-保留值", value: "hide" },
                ]}
            />
            <SchemaField.String name="input" title="受控者" x-component="Input" x-decorator="FormItem" />
        </SchemaField>
    </Panel>
);

export default OneEffect;
