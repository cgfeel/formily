import { FC } from "react";
import TabsJsonSchema from "../components/tab/JsonSchema";
import TabsMarkupSchema from "../components/tab/MarkupSchema";

const TabCollapse: FC = () => (
    <>
        <TabsMarkupSchema />
        <TabsJsonSchema />
    </>
);

export default TabCollapse;
