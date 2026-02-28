import { autorun, toJS, observable } from "@formily/reactive";
import { FC } from "react";
import ButtonRun from "./components/ButtonRun";
import Panel from "./components/Panel";

const obs = observable({ aa: { bb: { cc: 123 } } });
const js = toJS(obs);

autorun(() => {
  console.log("toJS", js.aa.bb.cc);
});

const ToJS: FC = () => (
  <Panel
    footer={
      <p>
        注意：如果对一个已经是 observable 的对象标记 markRaw，那么 toJS，是不会将它转换成普通对象的
      </p>
    }
    header={<h2>toJS</h2>}
  >
    <ButtonRun
      tips="普通 JS 对象"
      onClick={() => {
        js.aa.bb.cc = Date.now();
      }}
    >
      不会触发响应
    </ButtonRun>
  </Panel>
);

export default ToJS;
