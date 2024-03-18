import { FC } from "react";
import JsonSchema from "../components/collapse/JsonSchema";
import MarkupSchema from "../components/collapse/MarkupSchema";
import TabsJsonSchema from "../components/tab/JsonSchema";
import TabsMarkupSchema from "../components/tab/MarkupSchema";

const TabCollapse: FC = () => (
    <>
        <TabsMarkupSchema />
        <TabsJsonSchema />
        <MarkupSchema />
        <JsonSchema />
    </>
);

export default TabCollapse;
