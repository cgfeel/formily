import { FC } from "react";
import { Alert, Tabs, TabsProps } from "antd";
import MarkupSchema from "../../components/arrayTabs/MarkupSchema";
import JsonSchema from "../../components/arrayTabs/JsonSchema";
import Table from "../../page/Table";
import ArrayReaction from "../schemaReaction/arrayReaction";

const items: TabsProps["items"] = [
  {
    key: "array-card",
    label: "4.1: ArrayCard",
    children: (
      <ArrayReaction
        header={
          <h2>
            Antd.4.1: <code>ArrayCard</code>
          </h2>
        }
      />
    ),
  },
  {
    key: "array-table",
    label: "4.2: ArrayTable",
    children: <Table />,
  },
  {
    key: "array-tabs",
    label: "4.3: ArrayTabs",
    children: (
      <>
        <MarkupSchema />
        <JsonSchema />
      </>
    ),
  },
];

const AntdArray: FC = () => (
  <>
    <Alert
      message="以下全部基于：ArrayBase，了解更多查看 React.6: 字段特性 - Core.6.4-6.7: ArrayTable 列表组件"
      type="warning"
    />
    <Tabs items={items} />
  </>
);

export default AntdArray;
