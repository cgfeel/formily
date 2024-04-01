import { createForm, isField, onFieldValueChange } from "@formily/core";
import { FC } from "react";
import Panel from "../Panel";
import SchemaField from "../SchemaField";

const form = createForm({
    effects: () => {
        onFieldValueChange("dim_1", field => {
            if (isField(field)) {
                const linker = field.query("dim_2").value() || 0;
                form.setFieldState("result", state => {
                    state.value = linker * (field.value || 0);
                });
            }
        });
        onFieldValueChange("dim_2", field => {
            if (isField(field)) {
                const linker = field.query("dim_1").value() || 0;
                form.setFieldState("result", state => {
                    state.value = linker * (field.value || 0);
                });
            }
        });
    },
});

const LinkEffect: FC = () => (
    <Panel
        footer={
            <p>
                通过 <code>field.query</code> 匹配其他字段实现依赖联动
            </p>
        }
        form={form}
        header={
            <h2>
                主动模式：依赖联动 - <code>Effects</code> 用例
            </h2>
        }>
        <SchemaField>
            <SchemaField.Number
                default={0}
                name="dim_1"
                title="控制者"
                x-component="NumberPicker"
                x-decorator="FormItem"
            />
            <SchemaField.Number
                default={0}
                name="dim_2"
                title="控制者"
                x-component="NumberPicker"
                x-decorator="FormItem"
            />
            <SchemaField.Number
                name="result"
                title="受控者"
                x-pattern="readPretty"
                x-component="NumberPicker"
                x-decorator="FormItem"
            />
        </SchemaField>
    </Panel>
);

export default LinkEffect;
