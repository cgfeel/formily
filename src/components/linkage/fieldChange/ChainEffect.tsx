import { createForm, isField, onFieldValueChange } from "@formily/core";
import { FC } from "react";
import Panel from "../Panel";
import SchemaField from "../SchemaField";

const form = createForm({
    effects: () => {
        onFieldValueChange("select", field => {
            isField(field) &&
                form.setFieldState("input1", state => {
                    state.visible = !!field.value;
                });
        });
        onFieldValueChange("input1", field => {
            isField(field) &&
                form.setFieldState("input2", state => {
                    state.visible = !!field.value;
                });
        });
    },
});

const ChainEffect: FC = () => (
    <Panel
        footer={
            <p>
                <code>onFieldValueChange</code>可以一层一层匹配联动，需要注意的是，设置 <code>state.visible</code>{" "}
                不能直接赋值 <code>field.value</code>，而需要强制转意一下：<code>!!field.value</code>
                ，其原因有可能在初始联动时找不到字段得到的值不正确
            </p>
        }
        form={form}
        header={
            <h2>
                主动模式：链式联动 - <code>Effects</code> 用例
            </h2>
        }>
        <SchemaField>
            <SchemaField.Boolean
                default={false}
                name="select"
                title="控制者"
                x-component="Select"
                x-decorator="FormItem"
                enum={[
                    { label: "显示", value: true },
                    { label: "隐藏", value: false },
                ]}
            />
            <SchemaField.Boolean
                default={true}
                name="input1"
                title="受控者"
                x-component="Select"
                x-decorator="FormItem"
                enum={[
                    { label: "显示", value: true },
                    { label: "隐藏", value: false },
                ]}
            />
            <SchemaField.String name="input2" title="受控者" x-component="Input" x-decorator="FormItem" />
        </SchemaField>
    </Panel>
);

export default ChainEffect;
