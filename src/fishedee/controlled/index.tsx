import { Tabs, TabsProps } from "antd";
import { FC, Suspense, lazy } from "react";

const ControlledRaw = lazy(() => import("../../page/Controlled"));
const FieldControlled = lazy(() => import("./FieldControlled"));
const Observer = lazy(() => import("../../components/controlled/observerControlled"));

const items: TabsProps["items"] = [
    {
        key: "controlled",
        label: "实现表单受控",
        children: (
            <Suspense fallback={<>loading...</>}>
                <ControlledRaw />
            </Suspense>
        ),
    },
    {
        key: "field",
        label: "受控纠正",
        children: (
            <Suspense fallback={<>loading...</>}>
                <FieldControlled />
                <Observer />
            </Suspense>
        ),
    },
];

const Controlled: FC = () => <Tabs items={items} />;

export default Controlled;
