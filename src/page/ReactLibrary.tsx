import { Tabs, TabsProps } from "antd";
import { FC } from "react";
import componentsItems from "../react/componentItems";
import hooksItems from "../react/hooksItems";

const items: TabsProps["items"] = [...componentsItems, ...hooksItems];

const ReactLibrary: FC = () => (
    <Tabs defaultActiveKey="field" tabPosition="left" items={items} destroyInactiveTabPane />
);

export default ReactLibrary;
