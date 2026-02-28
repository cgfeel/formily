import { FC } from "react";
import ArrayCollapsJsonSchema from "../components/arrayCollapse/JsonSchema";
import ArrayCollapseMarkupSchema from "../components/arrayCollapse/MarkupSchema";
import ArrayTabsJsonSchema from "../components/arrayTabs/JsonSchema";
import ArrayTabsMarkupSchema from "../components/arrayTabs/MarkupSchema";
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
    <ArrayTabsMarkupSchema />
    <ArrayTabsJsonSchema />
    <ArrayCollapseMarkupSchema />
    <ArrayCollapsJsonSchema />
  </>
);

export default TabCollapse;
