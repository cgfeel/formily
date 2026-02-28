import { action, autorun, define, observable } from "@formily/reactive";
import { Button, Space } from "antd";
import { FC } from "react";
import Line from "./components/Line";
import Panel from "./components/Panel";

class DomainModel {
  deep = { aa: 1 };
  shallow = {};
  box = observable.box(0);
  ref = "";

  constructor() {
    define(this, {
      // box: observable.box,
      computed: observable.computed,
      deep: observable,
      shallow: observable.shallow,
      ref: observable.ref,
      action,
    });
  }
  get computed() {
    return this.deep.aa + this.box.get();
  }
  action(aa: number, box: number) {
    this.deep.aa = aa;
    this.box.set(box);
  }
}

const model = new DomainModel();
autorun(() => {
  console.log("define", model.computed);
});

const DefineClass: FC = () => (
  <Panel
    footer={
      <p>
        对于 <code>observable.box</code> 并没有通过 <code>define</code> 调用，因为初始{" "}
        <code>box</code> 为 <code>number</code> 是没有 <code>get/set</code> 的
      </p>
    }
    header={<h2>define</h2>}
  >
    <Line tips="手动定义领域模型">
      <Space direction="vertical">
        <Button onClick={() => model.action(1, 2)}>计算(1, 2)</Button>
        <Button onClick={() => model.action(3, 4)}>计算(3, 4)</Button>
      </Space>
      <p>
        重复点击按钮，不会重复调用 <code>action</code>
      </p>
    </Line>
  </Panel>
);

export default DefineClass;
