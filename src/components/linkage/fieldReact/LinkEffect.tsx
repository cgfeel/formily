import { createForm, isField, onFieldReact } from "@formily/core";
import { FC } from "react";
import Panel from "../Panel";
import SchemaField from "../SchemaField";

const form = createForm({
    effects: () => {
        onFieldReact("result", field => {
            if (isField(field)) {
                field.value = field.query("dim_1").value() * field.query("dim_2").value();
            }
        });
    },
});

const LinkEffect: FC = () => (
    <Panel
        footer={
            <div>
                <p>
                    通过 <code>field.query</code> 匹配其他字段实现依赖联动
                </p>
            </div>
        }
        form={form}
        header={
            <h2>
                依赖联动：<code>Effects</code> 用例
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
                x-component="NumberPicker"
                x-decorator="FormItem"
                x-pattern="readPretty"
            />
        </SchemaField>
    </Panel>
);

export default LinkEffect;
