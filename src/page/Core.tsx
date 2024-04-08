import { Tabs, TabsProps } from "antd";
import { FC } from "react";
import CreateForm from "../core/createForm";
import FieldEffectHooks from "../core/fieldEffectHooks";
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
        label: "Form Effect Hooks",
        children: <FormEffectHooks />,
    },
    {
        key: "fieldEffectHooks",
        label: "Field Effect Hooks",
        children: <FieldEffectHooks />,
    },
];

const Core: FC = () => {
    return <Tabs defaultActiveKey="createForm" tabPosition="left" items={items} destroyInactiveTabPane />;
};

export default Core;
