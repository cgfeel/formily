import {
  action,
  isAnnotation,
  isObservable,
  isSupportObservable,
  observable,
  toJS,
} from "@formily/reactive";
import { Button, Space } from "antd";
import { FC } from "react";
import Line from "./components/Line";
import Panel from "./components/Panel";

class A {
  property = "";
}
class B {
  property = "";
  toJS() {}
}

const obs = observable({ aa: 1 });
const js = toJS(obs);

const TypeChecker: FC = () => (
  <Panel header={<h2>Type Checker</h2>}>
    <Line tips="isObservable">
      <Space>
        <Button onClick={() => console.log(isObservable(obs))}>{"observable({ aa: 1 })"}</Button>
        <Button onClick={() => console.log(isObservable(js))}>{"obs to js"}</Button>
      </Space>
    </Line>
    <Line tips="isAnnotation">
      <Space>
        <Button onClick={() => console.log(isAnnotation(action.bound))}>{"action.bound"}</Button>
        <Button onClick={() => console.log(isAnnotation(() => {}))}>{"normal function"}</Button>
      </Space>
    </Line>
    <Line tips="isSupportObservable">
      <Space>
        <Button onClick={() => console.log(isSupportObservable(new A()))}>{"new A()"}</Button>
        <Button onClick={() => console.log(isSupportObservable(new B()))}>
          {"new B() has toJS"}
        </Button>
      </Space>
    </Line>
  </Panel>
);

export default TypeChecker;
