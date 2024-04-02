import { createForm } from "@formily/core";
import { FC } from "react";
import Panel from "../Panel";
import SchemaField from "../SchemaField";

const form = createForm();

const ChainSchema: FC = () => (
    <Panel
        footer={
            <div>
                <p>
                    <code>reactions</code>可以一层一层匹配联动
                </p>
            </div>
        }
        form={form}
        header={
            <h2>
                链式联动：<code>SchemaReactions</code> 用例
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
                x-reactions={{
                    dependencies: ["select"],
                    fulfill: {
                        state: {
                            visible: "{{!!$deps[0]}}",
                        },
                    },
                }}
            />
            <SchemaField.String
                name="input2"
                title="受控者"
                x-component="Input"
                x-decorator="FormItem"
                x-reactions={{
                    dependencies: ["input1"],
                    fulfill: {
                        state: {
                            visible: "{{!!$deps[0]}}",
                        },
                    },
                }}
            />
        </SchemaField>
    </Panel>
);

export default ChainSchema;
