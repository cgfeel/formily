import { FC } from "react";
import CollapseJsonSchema from "../components/formCollapse/JsonSchema";
import CollapseMarkupSchema from "../components/formCollapse/MarkupSchema";
import TabsJsonSchema from "../components/formTab/JsonSchema";
import TabsMarkupSchema from "../components/formTab/MarkupSchema";

const TabCollapse: FC = () => (
    <>
        <TabsMarkupSchema />
        <TabsJsonSchema />
        <CollapseMarkupSchema />
        <CollapseJsonSchema />
    </>
);

export default TabCollapse;
