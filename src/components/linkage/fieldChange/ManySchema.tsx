import { createForm } from "@formily/core";
import { FC } from "react";
import Panel from "../Panel";
import SchemaField from "../SchemaField";

const form = createForm();

const ManySchema: FC = () => (
    <Panel
        footer={
            <p>
                和一对一联动是一样的，唯一的区别在于路径使用通用匹配付：<code>*(input1,input2)</code>
            </p>
        }
        form={form}
        header={
            <h2>
                一对多联动：<code>SchemaReactions</code> 用例
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
                x-reactions={{
                    target: "*(input1,input2)",
                    fulfill: {
                        state: {
                            display: "{{$self.value}}",
                        },
                    },
                }}
            />
            <SchemaField.String name="input1" title="受控者" x-component="Input" x-decorator="FormItem" />
            <SchemaField.String name="input2" title="受控者" x-component="Input" x-decorator="FormItem" />
        </SchemaField>
    </Panel>
);

export default ManySchema;
