import { Tabs, TabsProps } from "antd";
import { FC, Suspense, lazy } from "react";

const CreateForm = lazy(() => import("../core/createForm"));
const FieldEffectHooks = lazy(() => import("../core/fieldEffectHooks"));
const FormEffectHooks = lazy(() => import("../core/formEffectHooks"));
const CreateEffectContext = lazy(() => import("../core/formHooksAPI/CreateEffectContext"));
const CreateEffectHook = lazy(() => import("../core/formHooksAPI/CreateEffectHook"));

const items: TabsProps["items"] = [
    {
        disabled: true,
        key: "entry",
        label: "Entry",
    },
    {
        key: "createForm",
        label: "createForm",
        children: (
            <Suspense fallback={<>loading...</>}>
                <CreateForm />
            </Suspense>
        ),
    },
    {
        key: "formEffectHooks",
        label: "Form Effect Hooks",
        children: (
            <Suspense fallback={<>loading...</>}>
                <FormEffectHooks />
            </Suspense>
        ),
    },
    {
        key: "fieldEffectHooks",
        label: "Field Effect Hooks",
        children: (
            <Suspense fallback={<>loading...</>}>
                <FieldEffectHooks />
            </Suspense>
        ),
    },
    {
        key: "formHooksAPI",
        label: "Form Hooks API",
        children: (
            <Suspense fallback={<>loading...</>}>
                <CreateEffectHook />
                <CreateEffectContext />
            </Suspense>
        ),
    },
];

const Core: FC = () => {
    return <Tabs defaultActiveKey="createForm" tabPosition="left" items={items} destroyInactiveTabPane />;
};

export default Core;
