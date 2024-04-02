import { createForm, onFieldReact } from "@formily/core";
import { FC } from "react";
import Panel from "../Panel";
import SchemaField from "../SchemaField";

const form = createForm({
    effects: () => {
        onFieldReact("input1", field => {
            field.visible = !!field.query("select").value();
        });
        onFieldReact("input2", field => {
            field.visible = !!field.query("input1").value();
        });
    },
});

const ChainEffect: FC = () => (
    <Panel
        footer={
            <div>
                <p>
                    <code>onFieldReact</code>可以一层一层匹配联动
                </p>
            </div>
        }
        form={form}
        header={
            <h2>
                链式联动：<code>Effects</code> 用例
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
