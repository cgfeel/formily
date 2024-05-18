import { Tabs, TabsProps } from "antd";
import { FC, Suspense, lazy } from "react";

const CoreReactive = lazy(() => import("../fishedee/coreReactive"));
const Count = lazy(() => import("../fishedee/count"));

const items: TabsProps["items"] = [
    {
        disabled: true,
        key: "reactive",
        label: "reactive",
    },
    {
        key: "observer-count",
        label: "计数器",
        children: (
            <Suspense fallback={<>loading...</>}>
                <Count />
            </Suspense>
        ),
    },
    {
        key: "reactive-form",
        label: "reactive 实现表单",
        children: (
            <Suspense fallback={<>loading...</>}>
                <CoreReactive />
            </Suspense>
        ),
    },
];

const Fishedee: FC = () => (
    <Tabs defaultActiveKey="observer-count" tabPosition="left" items={items} destroyInactiveTabPane />
);

export default Fishedee;
