import { Tabs, TabsProps } from "antd";
import { FC, Suspense, lazy } from "react";

const ArrayField = lazy(() => import("../react/components/arrayField"));
const ArrayFieldRenderProps = lazy(() => import("../react/components/arrayField/RenderProps"));
const Field = lazy(() => import("../react/components/FieldCom"));
const ObjectField = lazy(() => import("../react/components/objectField"));
const ObjectFieldRenderProps = lazy(() => import("../react/components/objectField/RenderProps"));

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
];

const ReactLibrary: FC = () => (
    <Tabs defaultActiveKey="field" tabPosition="left" items={items} destroyInactiveTabPane />
);

export default ReactLibrary;
