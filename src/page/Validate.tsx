import { FC } from "react";
import FormatMarkupSchema from "../components/validate/format/MarkupSchema";
import RuleFieldJsx from "../components/validate/rule/FieldJsx";
import RuleJsonSchema from "../components/validate/rule/JsonSchema";
import RuleMarkupSchema from "../components/validate/rule/MarkupSchema";

const Validate: FC = () => (
    <>
        <RuleMarkupSchema />
        <RuleJsonSchema />
        <RuleFieldJsx />
        <FormatMarkupSchema />
    </>
);

export default Validate;
