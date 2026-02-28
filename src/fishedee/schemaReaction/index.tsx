import { Alert, Tabs, TabsProps } from "antd";
import { FC, Suspense, lazy } from "react";

const ArrayReaction = lazy(() => import("./arrayReaction"));
const BaseReaction = lazy(() => import("./schema"));
const Calculator = lazy(() => import("../../page/Calculator"));

const item: TabsProps["items"] = [
  {
    key: "base",
    label: "5.1-5.3: 联动操作",
    children: (
      <Suspense fallback={<>loading...</>}>
        <BaseReaction />
      </Suspense>
    ),
  },
  {
    key: "calculator",
    label: "5.4.1: 联动计算",
    children: (
      <Suspense fallback={<>loading...</>}>
        <Alert message="这个演示来自官方文档表格联动计算，建议放大窗口查看演示" type="warning" />
        <Calculator />
      </Suspense>
    ),
  },
  {
    key: "array-reaction",
    label: "5.4.2: 子集联动",
    children: (
      <Suspense fallback={<>loading...</>}>
        <ArrayReaction />
      </Suspense>
    ),
  },
];

const SchemaReaction: FC = () => <Tabs items={item} />;

export default SchemaReaction;
