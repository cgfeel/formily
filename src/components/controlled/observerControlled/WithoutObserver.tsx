import { createForm } from "@formily/core";
import { observable } from "@formily/reactive";
import { FC, useMemo, useState } from "react";
import Panel from "../Panel";
import Wraper from "../valueControlled/Wraper";
import FormCom from "./FormCom";
import { ObserverInner } from ".";

const values = observable({ input: "" });
const form = createForm({ values });

const ControlledCard1: FC = () => (
  <Wraper
    footer={<FormCom form={form} />}
    name="Controller 组件"
    title="控制者去掉 `observer`"
    values={values}
    update={input => {
      values.input = input;
    }}
  />
);

const ControlledCard2: FC = () => {
  const [values, setValues] = useState({ input: "" });
  const form = useMemo(() => createForm(), []);
  return (
    <Wraper
      footer={<FormCom form={form} />}
      name="Controller 组件"
      title="控制者替换 `observer` 为 `state`，受控者去掉 `observable`"
      values={values}
      update={input => setValues({ input })}
    />
  );
};

const WithoutObserver: FC = () => {
  return (
    <Panel footer={<p>分别对比 3 模式</p>} header={<h2>反模式</h2>}>
      <ObserverInner title="响应式值受控" />
      <ControlledCard1 />
      <ControlledCard2 />
    </Panel>
  );
};

export default WithoutObserver;
