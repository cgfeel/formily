import { Tabs, TabsProps } from "antd";
import { FC } from "react";
import CustomFormatFieldJsx from "../components/validate/customFormat/FieldJsx";
import CustomFormatJsonSchema from "../components/validate/customFormat/JsonSchema";
import CustomFormatMarkupSchema from "../components/validate/customFormat/MarkupSchema";
import CustomRuleFieldJsx from "../components/validate/customRules/FieldJsx";
import CustomRuleJsonSchema from "../components/validate/customRules/JsonSchema";
import CustomRuleMarkupSchema from "../components/validate/customRules/MarkupSchema";
import FormatFieldJsx from "../components/validate/format/FieldJsx";
import FormatJsonSchema from "../components/validate/format/JsonSchema";
import FormatMarkupSchema from "../components/validate/format/MarkupSchema";
import RuleFieldJsx from "../components/validate/rule/FieldJsx";
import RuleJsonSchema from "../components/validate/rule/JsonSchema";
import RuleMarkupSchema from "../components/validate/rule/MarkupSchema";

const items: TabsProps["items"] = [
    {
        key: "rule",
        label: "内置规则校验",
        children: (
            <>
                <RuleMarkupSchema />
                <RuleJsonSchema />
                <RuleFieldJsx />
            </>
        ),
    },
    {
        key: "format",
        label: "内置格式校验",
        children: (
            <>
                <FormatMarkupSchema />
                <FormatJsonSchema />
                <FormatFieldJsx />
            </>
        ),
    },
    {
        key: "customRule",
        label: "自定义规则校验",
        children: (
            <>
                <CustomRuleMarkupSchema />
                <CustomRuleJsonSchema />
                <CustomRuleFieldJsx />
            </>
        ),
    },
    {
        key: "customFormat",
        label: "自定义格式校验",
        children: (
            <>
                <CustomFormatMarkupSchema />
                <CustomFormatJsonSchema />
                <CustomFormatFieldJsx />
            </>
        ),
    },
    {
        key: "others",
        label: "异步、联动、定制文案",
        children: (
            <>
                <p>others</p>
            </>
        ),
    },
];

const Validate: FC = () => <Tabs defaultActiveKey="rule" items={items} />;

export default Validate;
