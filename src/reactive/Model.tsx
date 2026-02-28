import { autorun, model } from "@formily/reactive";
import { Button, Space } from "antd";
import { FC } from "react";
import Line from "./components/Line";
import Panel from "./components/Panel";

const obs = model({
  aa: 1,
  bb: 2,
  get cc() {
    return this.aa + this.bb;
  },
  update(aa: number, bb: number) {
    this.aa = aa;
    this.bb = bb;
  },
});

autorun(() => {
  console.log("model", obs.cc);
});

const Model: FC = () => (
  <Panel
    footer={
      <div>
        <p>会对模型属性做自动声明：</p>
        <ul>
          <li>
            <code>getter/setter</code> 属性自动声明 <code>computed</code>
          </li>
          <li>
            函数自动声明 <code>action</code>
          </li>
          <li>
            普通属性自动声明 <code>observable</code>
          </li>
        </ul>
      </div>
    }
    header={<h2>model</h2>}
  >
    <Line tips="快速定义领域模型">
      <Space>
        <Button
          onClick={() => {
            obs.aa = 3;
          }}
        >
          obs.aa = 3
        </Button>
        <Button
          onClick={() => {
            obs.update(4, 6);
          }}
        >
          obs.update(4, 6);
        </Button>
      </Space>
      <p>重复点击按钮，不会重复执行</p>
    </Line>
  </Panel>
);

export default Model;
