import { FC } from "react";
import SchemaField from "./SchemaField";

const FieldRevise: FC = () => (
    <SchemaField.Object
        description={
            <p>
                <code>dependencies</code> 不仅仅可以收集字段的 <code>value</code>，也可以是其他属性
            </p>
        }
        name="revise"
        title="纠正文档"
        x-decorator="VoidComponent">
        <SchemaField.String
            description="输入 123"
            name="input"
            title="控制者"
            x-component="Input"
            x-decorator="FormItem"
            x-reactions={{
                target: "revise.input2",
                fulfill: {
                    state: { visible: "{{$self.value === '123'}}" },
                },
            }}
        />
        <SchemaField.String name="input2" title="受控者 1" x-component="Input" x-decorator="FormItem" />
        <SchemaField.String
            name="input3"
            title="受控者 2"
            x-component="Input"
            x-decorator="FormItem"
            x-reactions={{
                dependencies: [".input2#visible", ".input2"],
                fulfill: {
                    state: {
                        visible: "{{$deps[0]}}",
                        value: "{{$deps[1]}}",
                    },
                },
            }}
        />
    </SchemaField.Object>
);

export default FieldRevise;
