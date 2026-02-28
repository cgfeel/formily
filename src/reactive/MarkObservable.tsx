import { autorun, markObservable, observable } from "@formily/reactive";
import { FC } from "react";
import ButtonRun from "./components/ButtonRun";
import Panel from "./components/Panel";

class A {
  property = "";
  toJSON() {}
}

class B {
  property = "";
  toJSON() {}
}

markObservable(B);

const a = observable(new A());
const b = observable(markObservable(new A()));
const c = observable(new B());

autorun(() => {
  console.log("markObservable", a.property);
});

autorun(() => {
  console.log("markObservable", b.property);
});

autorun(() => {
  console.log("markObservable", c.property);
});

const MarkObservable: FC = () => (
  <Panel
    footer={
      <p>
        标记 <code>observable</code> 时，在 <code>@formily/reactive</code> 中会自动绕过{" "}
        <code>React Node</code> 与带有 <code>toJSON/toJS</code> 方法的对象
      </p>
    }
    header={<h2>markObservable</h2>}
  >
    <ButtonRun
      tips="不响应带有 toJSON 的对象"
      onClick={() => {
        a.property = Date.now().toString();
      }}
    >
      click it
    </ButtonRun>
    <ButtonRun
      tips="通过 markObservable 使对象响应"
      onClick={() => {
        b.property = Date.now().toString();
      }}
    >
      click it
    </ButtonRun>
    <ButtonRun
      tips="通过 markObservable 类级标记响应"
      onClick={() => {
        c.property = Date.now().toString();
      }}
    >
      click it
    </ButtonRun>
  </Panel>
);

export default MarkObservable;
