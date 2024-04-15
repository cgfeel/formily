import { FC } from "react";
import SchemaField from "../SchemaPropertyField";
import SingleSchema, { SingleSchemaProps } from "./SingleSchema";

const NodeAppendSchema: FC<NodeAppendSchemaProps> = ({ name, ...props }) => (
    <SingleSchema {...props} name={name}>
        <SchemaField.Object name={`${name}-array`} title="数组节点" x-component="Space" x-decorator="FormItem">
            <SchemaField.String
                name="input1"
                x-component="FieldInput"
                x-decorator="FormItem"
                x-component-props={{
                    allowClear: true,
                    placeholder: "选填，字母或数字",
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
            name={`${name}-input`}
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
    </SingleSchema>
);

interface NodeAppendSchemaProps extends SingleSchemaProps {}

export default NodeAppendSchema;
