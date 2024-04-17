import { FC } from "react";
import SelectList from "../components/SearchList";
import SingleSchema from "../schema/method/SingleSchema";
import { extraCode, fieldData } from "../action/propertyAction";
import DescItemSchema from "../schema/method/DescItemSchema";
import SchemaField from "../schema/SchemaPropertyField";

const defaultSelect = [
    { tips: "点路径", value: "aa.bb.cc" },
    { tips: "局部匹配", value: "aa.bb.*" },
    { tips: "分组匹配", value: "*(aa,bb,cc)" },
];

const Property: FC = () => (
    <SelectList defaultSelect={defaultSelect} extraCode={extraCode} fieldData={fieldData}>
        <SingleSchema feedbackText="如果路径为非匹配型路径，则可以读取路径的长度" name="length" />
        <SingleSchema feedbackText="路径完整字符串，与入参数据一致" name="entire" />
        <DescItemSchema feedbackText="解析后的 AST 树" name="segments">
            <SchemaField.String
                name="segments-print"
                title="输出"
                x-component="CodePretty"
                x-decorator="FormItem"
                x-reactions="{{fieldData($self)}}"
            />
        </DescItemSchema>
        <SingleSchema feedbackText="该路径是否是匹配型路径" name="isMatchPattern" />
        <SingleSchema feedbackText="该路径是否是全通配路径，比如 `a.b.*`" name="isWildMatchPattern" />
        <SingleSchema feedbackText="该路径是否存在反向匹配，比如 `*(!a.b.c)`" name="haveExcludePattern" />
        <DescItemSchema feedbackText="解析后的 AST 树" name="tree">
            <SchemaField.String
                name="tree-print"
                title="输出"
                x-component="CodePretty"
                x-decorator="FormItem"
                x-reactions="{{fieldData($self)}}"
            />
        </DescItemSchema>
    </SelectList>
);

export default Property;
