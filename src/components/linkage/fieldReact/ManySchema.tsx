import { createForm } from "@formily/core";
import { FC } from "react";
import Panel from "../Panel";
import SchemaField from "../SchemaField";

const form = createForm();

const ManySchema: FC = () => (
    <Panel
        footer={
            <div>
                <p>
                    和一对一联动是一样的，唯一的区别在于路径使用通用匹配付：<code>*(input1,input2)</code>
                </p>
                <p>
                    从这个例子再次说明了：如果需要监听一个字段改变其他多个字段建议使用主动联动；如果需要监听多个字段改变指定字段建议使用被动联动
                </p>
            </div>
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
                    { label: "隐藏-保留值", value: "hidden" },
                ]}
            />
            <SchemaField.String
                name="input1"
                title="受控者"
                x-component="Input"
                x-decorator="FormItem"
                x-reactions={{
                    dependencies: ["select"],
                    fulfill: {
                        state: {
                            display: "{{$deps[0]}}",
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
                    dependencies: ["select"],
                    fulfill: {
                        state: {
                            display: "{{$deps[0]}}",
                        },
                    },
                }}
            />
        </SchemaField>
    </Panel>
);

export default ManySchema;
