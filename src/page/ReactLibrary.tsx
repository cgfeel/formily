import { Tabs, TabsProps } from "antd";
import { FC, Suspense, lazy } from "react";

const ArrayField = lazy(() => import("../react/components/arrayField"));
const ArrayFieldRenderProps = lazy(() => import("../react/components/arrayField/RenderProps"));
const ExpressionScope = lazy(() => import("../react/components/ExpressionScope"));
const Field = lazy(() => import("../react/components/field"));
const FormConsumer = lazy(() => import("../react/components/formConsumer"));
const FormProvider = lazy(() => import("../react/components/formProvider"));
const JsonSchema = lazy(() => import("../react/components/schemaField/JsonSchema"));
const MarkupSchema = lazy(() => import("../react/components/schemaField/MarkupSchema"));
const ObjectField = lazy(() => import("../react/components/objectField"));
const ObjectFieldRenderProps = lazy(() => import("../react/components/objectField/RenderProps"));
const ResuresionIncrementIncrement = lazy(() => import("../react/components/resursionField/Increment"));
const ResuresionFieldSimple = lazy(() => import("../react/components/resursionField/Simple"));
const VoidField = lazy(() => import("../react/components/voidField"));

const items: TabsProps["items"] = [
    {
        disabled: true,
        key: "components",
        label: "Components",
    },
    {
        key: "field",
        label: "Field",
        children: (
            <Suspense fallback={<>Loading</>}>
                <Field />
            </Suspense>
        ),
    },
    {
        key: "arrayField",
        label: "ArrayField",
        children: (
            <Suspense fallback={<>Loading</>}>
                <ArrayField />
                <ArrayFieldRenderProps />
            </Suspense>
        ),
    },
    {
        key: "objectField",
        label: "ObjectField",
        children: (
            <Suspense fallback={<>Loading</>}>
                <ObjectField />
                <ObjectFieldRenderProps />
            </Suspense>
        ),
    },
    {
        key: "voidField",
        label: "VoidField",
        children: (
            <Suspense fallback={<>Loading</>}>
                <VoidField />
            </Suspense>
        ),
    },
    {
        key: "schemaField",
        label: "SchemaField",
        children: (
            <Suspense fallback={<>Loading</>}>
                <MarkupSchema />
                <JsonSchema />
            </Suspense>
        ),
    },
    {
        key: "resursionField",
        label: "ResursionField",
        children: (
            <Suspense fallback={<>Loading</>}>
                <ResuresionFieldSimple />
                <ResuresionIncrementIncrement />
            </Suspense>
        ),
    },
    {
        key: "formProvider",
        label: "FormProvider",
        children: (
            <Suspense fallback={<>Loading</>}>
                <FormProvider />
            </Suspense>
        ),
    },
    {
        key: "formConsumer",
        label: "FormConsumer",
        children: (
            <Suspense fallback={<>Loading</>}>
                <FormConsumer />
            </Suspense>
        ),
    },
    {
        key: "expressionScope",
        label: "ExpressionScope",
        children: (
            <Suspense fallback={<>Loading</>}>
                <ExpressionScope />
            </Suspense>
        ),
    },
];

const ReactLibrary: FC = () => (
    <Tabs defaultActiveKey="field" tabPosition="left" items={items} destroyInactiveTabPane />
);

export default ReactLibrary;
