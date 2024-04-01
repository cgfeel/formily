import { createForm, isField, onFieldValueChange } from "@formily/core";
import { FC } from "react";
import Panel from "../Panel";
import SchemaField from "../SchemaField";

const form = createForm({
    effects: () => {
        onFieldValueChange("select", field => {
            // 对于初始联动，如果字段找不到，setFieldState会将更新推入更新队列，直到字段出现再执行操作
            isField(field) &&
                form.setFieldState("*(input1,input2)", state => {
                    state.display = field.value;
                });
        });
    },
});

const ManyEffect: FC = () => (
    <Panel
        footer={
            <p>
                和一对一联动是一样的，唯一的区别在于路径使用通用匹配付：<code>*(input1,input2)</code>
            </p>
        }
        form={form}
        header={
            <h2>
                主动模式：一对多联动 - <code>Effects</code> 用例
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
            <SchemaField.String name="input1" title="受控者" x-component="Input" x-decorator="FormItem" />
            <SchemaField.String name="input2" title="受控者" x-component="Input" x-decorator="FormItem" />
        </SchemaField>
    </Panel>
);

export default ManyEffect;
