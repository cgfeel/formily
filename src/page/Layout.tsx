import { Tabs, TabsProps } from "antd";
import { FC } from "react";
import ItemFieldJsx from "../components/formItem/FieldJsx";
import ItemJsonSchema from "../components/formItem/JsonSchema";
import ItemMarkupSchema from "../components/formItem/MarkupSchema";
import FeedbackMarkupSchema from "../components/formItem/feedback/MarkupSchema";
import MaskMarkupSchema from "../components/formItem/mark/MarkupSchema";
import PropsMarkupSchema from "../components/formItem/propretiesCase/MarkupSchema";
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
                <ItemMarkupSchema />
                <ItemJsonSchema />
                <ItemFieldJsx />
                <PropsMarkupSchema />
                <MaskMarkupSchema />
                <FeedbackMarkupSchema />
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

const Layout: FC = () => <Tabs defaultActiveKey="formItem" items={items} />;

export default Layout;
