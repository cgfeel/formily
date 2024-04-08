import { Tabs, TabsProps } from "antd";
import { FC } from "react";
import CreateForm from "../core/createForm";
import FormEffectHooks from "../core/formEffectHooks";

const items: TabsProps["items"] = [
    {
        disabled: true,
        key: "entry",
        label: "Entry",
    },
    {
        key: "createForm",
        label: "createForm",
        children: <CreateForm />,
    },
    {
        key: "formEffectHooks",
        label: "formEffectHooks",
        children: <FormEffectHooks />,
    },
];

const Core: FC = () => {
    return <Tabs defaultActiveKey="createForm" tabPosition="left" items={items} destroyInactiveTabPane />;
};

export default Core;
