import { Alert, Tabs, TabsProps } from "antd";
import { FC, Suspense, lazy } from "react";

const Action = lazy(() => import("../reactive/Action"));
const Autorun = lazy(() => import("../reactive/Autorun"));
const Batch = lazy(() => import("../reactive/Batch"));
const DefineClass = lazy(() => import("../reactive/DefineClass"));
const HasCollected = lazy(() => import("../reactive/HasCollected"));
const MarkObservable = lazy(() => import("../reactive/MarkObservable"));
const MarkRaw = lazy(() => import("../reactive/MarkRaw"));
const Model = lazy(() => import("../reactive/Model"));
const Observable = lazy(() => import("../reactive/Observable"));
const Observe = lazy(() => import("../reactive/Observe"));
const Observer = lazy(() => import("../reactive/ObserverCom"));
const Raw = lazy(() => import("../reactive/Raw"));
const Reaction = lazy(() => import("../reactive/Reaction"));
const ToJS = lazy(() => import("../reactive/ToJS"));
const Tracker = lazy(() => import("../reactive/Tracker"));
const TypeChecker = lazy(() => import("../reactive/TypeChecker"));
const Untracked = lazy(() => import("../reactive/Untracked"));

const items: TabsProps["items"] = [
  {
    key: "observable",
    label: "observable",
    children: (
      <Suspense fallback={<>Loading...</>}>
        <Observable />
      </Suspense>
    ),
  },
  {
    key: "autorun",
    label: "autorun",
    children: (
      <Suspense fallback={<>Loading...</>}>
        <Autorun />
      </Suspense>
    ),
  },
  {
    key: "reaction",
    label: "reaction",
    children: (
      <Suspense fallback={<>Loading...</>}>
        <Reaction />
      </Suspense>
    ),
  },
  {
    key: "batch",
    label: "batch",
    children: (
      <Suspense fallback={<>Loading...</>}>
        <Batch />
      </Suspense>
    ),
  },
  {
    key: "action",
    label: "action",
    children: (
      <Suspense fallback={<>Loading...</>}>
        <Action />
      </Suspense>
    ),
  },
  {
    key: "define",
    label: "define",
    children: (
      <Suspense fallback={<>Loading...</>}>
        <DefineClass />
      </Suspense>
    ),
  },
  {
    key: "model",
    label: "model",
    children: (
      <Suspense fallback={<>Loading...</>}>
        <Model />
      </Suspense>
    ),
  },
  {
    key: "observe",
    label: "observe",
    children: (
      <Suspense fallback={<>Loading...</>}>
        <Observe />
      </Suspense>
    ),
  },
  {
    key: "markRaw",
    label: "markRaw",
    children: (
      <Suspense fallback={<>Loading...</>}>
        <MarkRaw />
      </Suspense>
    ),
  },
  {
    key: "markObservable",
    label: "markObservable",
    children: (
      <Suspense fallback={<>Loading...</>}>
        <MarkObservable />
      </Suspense>
    ),
  },
  {
    key: "raw",
    label: "raw",
    children: (
      <Suspense fallback={<>Loading...</>}>
        <Raw />
      </Suspense>
    ),
  },
  {
    key: "toJS",
    label: "toJS",
    children: (
      <Suspense fallback={<>Loading...</>}>
        <ToJS />
      </Suspense>
    ),
  },
  {
    key: "untracked",
    label: "untracked",
    children: (
      <Suspense fallback={<>Loading...</>}>
        <Untracked />
      </Suspense>
    ),
  },
  {
    key: "hasCollected",
    label: "hasCollected",
    children: (
      <Suspense fallback={<>Loading...</>}>
        <HasCollected />
      </Suspense>
    ),
  },
  {
    key: "tracker",
    label: "Tracker",
    children: (
      <Suspense fallback={<>Loading...</>}>
        <Tracker />
      </Suspense>
    ),
  },
  {
    key: "type-checker",
    label: "Type Check",
    children: (
      <Suspense fallback={<>Loading...</>}>
        <TypeChecker />
      </Suspense>
    ),
  },
  {
    key: "observer",
    label: "observer",
    children: (
      <Suspense fallback={<>Loading...</>}>
        <Observer
          footer={
            <p>
              可以把 <code>observer</code> 和 <code>Observer</code> 的关系看作是 <code>memo</code>{" "}
              和 <code>useMemo</code>
            </p>
          }
          header={<h2>observer、Observer</h2>}
        />
      </Suspense>
    ),
  },
];

const Reactive: FC = () => (
  <>
    <Alert
      message="调试面板查看看输出信息"
      type="warning"
      style={{ marginBottom: 16, marginTop: 16 }}
    />
    <Tabs
      tabPosition="left"
      items={items}
      onChange={() => console.clear()}
      destroyInactiveTabPane
    />
  </>
);

export default Reactive;
