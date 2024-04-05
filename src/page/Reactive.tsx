import { Alert, Tabs, TabsProps } from "antd";
import { FC } from "react";
import Autorun from "../reactive/Autorun";
import Observable from "../reactive/Observable";
import Reaction from "../reactive/Reaction";

const items: TabsProps["items"] = [
    {
        key: "observable",
        label: "observable",
        children: <Observable />,
    },
    {
        key: "autorun",
        label: "autorun",
        children: <Autorun />,
    },
    {
        key: "reaction",
        label: "reaction",
        children: <Reaction />,
    },
];

const Reactive: FC = () => (
    <>
        <Alert message="调试面板查看看输出信息" type="warning" style={{ marginBottom: 16, marginTop: 16 }} />
        <Tabs tabPosition="left" items={items} />
    </>
);

export default Reactive;
