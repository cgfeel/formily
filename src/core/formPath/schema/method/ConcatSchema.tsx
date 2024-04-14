import { FC } from "react";
import SchemaField from "../SchemaPropertyField";
import DescItemSchema from "./DescItemSchema";

const ConcatSchema: FC = () => (
    <DescItemSchema feedbackText="连接数据操作型路径" name="concat">
        <SchemaField.Object name="concat-array" title="数组节点" x-component="Space" x-decorator="FormItem">
            <SchemaField.String
                name="input1"
                x-component="FieldInput"
                x-decorator="FormItem"
                x-component-props={{
                    allowClear: true,
                    placeholder: "选填，字母或数字",
                    style: { width: 150 },
                }}
                x-reactions={{
                    dependencies: ["path"],
                    when: "{{!$self.value}}",
                    fulfill: {
                        state: {
                            initialValue: "dd",
                        },
                    },
                }}
            />
            <SchemaField.String
                name="input2"
                x-component="FieldInput"
                x-decorator="FormItem"
                x-component-props={{
                    allowClear: true,
                    placeholder: "选填，字母或数字",
                    style: { width: 150 },
                }}
                x-reactions={{
                    dependencies: ["path"],
                    when: "{{!$self.value}}",
                    fulfill: {
                        state: {
                            initialValue: "ee",
                        },
                    },
                }}
            />
            <SchemaField.String
                name="input3"
                x-component="FieldInput"
                x-decorator="FormItem"
                x-component-props={{
                    allowClear: true,
                    placeholder: "选填，字母或数字",
                    style: { width: 150 },
                }}
                x-reactions={{
                    dependencies: ["path"],
                    when: "{{!$self.value}}",
                    fulfill: {
                        state: {
                            initialValue: "mm",
                        },
                    },
                }}
            />
        </SchemaField.Object>
        <SchemaField.String
            name="concat-input"
            title="字符节点"
            x-component="FieldInput"
            x-decorator="FormItem"
            x-component-props={{
                allowClear: true,
                patten: /[^\d\w.]/g,
                placeholder: "选填，例如：kk.oo",
            }}
            x-reactions={{
                dependencies: ["path"],
                when: "{{!$self.value}}",
                fulfill: {
                    state: {
                        initialValue: "kk.oo",
                    },
                },
            }}
        />
        <SchemaField.String
            name="concat-print"
            title="输出"
            x-component="CodePretty"
            x-decorator="FormItem"
            x-pattern="readPretty"
            x-reactions="{{fieldData($self)}}"
        />
    </DescItemSchema>
);

export default ConcatSchema;
