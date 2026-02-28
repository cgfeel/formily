import { Tabs, TabsProps } from "antd";
import { FC } from "react";
import componentsItems from "../react/componentItems";
import hooksItems from "../react/hooksItems";
import sharedItems from "../react/sharedItems";

const items: TabsProps["items"] = [...componentsItems, ...hooksItems, ...sharedItems];

const ReactLibrary: FC = () => (
  <Tabs defaultActiveKey="field" tabPosition="left" items={items} destroyInactiveTabPane />
);

export default ReactLibrary;
