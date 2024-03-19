import { FC } from "react";
// import MarkupSchema from "../components/arrayCollapse/MarkupSchema";
import ArrayJsonSchema from "../components/arrayTabs/JsonSchema";
import ArrayMarkupSchema from "../components/arrayTabs/MarkupSchema";
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
        <ArrayMarkupSchema />
        <ArrayJsonSchema />
        {/* <MarkupSchema /> */}
    </>
);

export default TabCollapse;
