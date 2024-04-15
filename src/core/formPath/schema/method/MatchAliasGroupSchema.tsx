import { FC } from "react";
import SchemaField from "../SchemaPropertyField";
import SingleSchema from "./SingleSchema";

const MatchAliasGroupSchema: FC = () => (
    <SingleSchema feedbackText="别名组匹配，在 formily 中主要用来匹配 address 和 path" name="matchAliasGroup">
        <SchemaField.Object name="matchAliasGroup-array" x-component="Space" x-decorator="FormItem">
            <SchemaField.String
                default="aa.bb.cc"
                name="input1"
                title="pattern"
                x-component="Input"
                x-decorator="FormItem"
                x-component-props={{
                    allowClear: true,
                    placeholder: "选填，例如：kk.oo",
                }}
            />
            <SchemaField.String
                default="aa.cc"
                name="input2"
                title="alias"
                x-component="Input"
                x-decorator="FormItem"
                x-component-props={{
                    allowClear: true,
                    placeholder: "选填，例如：kk.oo",
                }}
            />
        </SchemaField.Object>
    </SingleSchema>
);

export default MatchAliasGroupSchema;
