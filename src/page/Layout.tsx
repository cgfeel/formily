import { Tabs, TabsProps } from "antd";
import { FC } from "react";
import LayoutFieldJsx from "../components/formLayout/FieldJsx";
import LayoutJsonSchema from "../components/formLayout/JsonSchema";
import LayoutMarkupSchema from "../components/formLayout/MarkupSchema";
import Grid from "./Grid";

const items: TabsProps["items"] = [
    {
        key: "formLayout",
        label: "FormLayout",
        children: (
            <>
                <LayoutMarkupSchema />
                <LayoutJsonSchema />
                <LayoutFieldJsx />
            </>
        ),
    },
    {
        key: "formItem",
        label: "FormItem",
        children: (
            <>
                <p>FormItem</p>
            </>
        ),
    },
    {
        key: "formGrid",
        label: "FormGird",
        children: <Grid />,
    },
    {
        key: "space",
        label: "Space",
        children: (
            <>
                <p>Space</p>
            </>
        ),
    },
];

const Layout: FC = () => <Tabs defaultActiveKey="formLayout" items={items} />;

export default Layout;
