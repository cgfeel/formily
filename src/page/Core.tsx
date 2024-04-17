import { Tabs, TabsProps } from "antd";
import { FC, Suspense, lazy } from "react";

const CreateEffectContext = lazy(() => import("../core/formHooksAPI/CreateEffectContext"));
const CreateEffectHook = lazy(() => import("../core/formHooksAPI/CreateEffectHook"));
const CreateForm = lazy(() => import("../core/createForm"));
const FieldEffectHooks = lazy(() => import("../core/fieldEffectHooks"));
const Form = lazy(() => import("../core/form"));
const FormChecker = lazy(() => import("../core/formCheckers"));
const FormEffectHooks = lazy(() => import("../core/formEffectHooks"));
const FormPath = lazy(() => import("../core/formPath"));
const FormValidatorRegistry = lazy(() => import("../core/formValidatorRegistry"));

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
    {
        key: "formCheckers",
        label: "Form Checkers",
        children: (
            <Suspense fallback={<>loading...</>}>
                <FormChecker />
            </Suspense>
        ),
    },
    {
        key: "formPath",
        label: "Form Path",
        children: (
            <Suspense fallback={<>loading...</>}>
                <FormPath />
            </Suspense>
        ),
    },
    {
        key: "formValidatorRegistry",
        label: "Form Validator Registry",
        children: (
            <Suspense fallback={<>loading...</>}>
                <FormValidatorRegistry />
            </Suspense>
        ),
    },
    {
        disabled: true,
        key: "models",
        label: "Models",
    },
    {
        key: "form",
        label: "Form",
        children: (
            <Suspense fallback={<>loading...</>}>
                <Form />
            </Suspense>
        ),
    },
];

const Core: FC = () => {
    return <Tabs defaultActiveKey="createForm" tabPosition="left" items={items} destroyInactiveTabPane />;
};

export default Core;
