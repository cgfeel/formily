import { Tracker as TrackerRaw, observable } from "@formily/reactive";
import { FC } from "react";
import ButtonRun from "./components/ButtonRun";
import Panel from "./components/Panel";

const obs = observable({ aa: 0 });
const view = () => console.log("Tracker", obs.aa);

const tracker = new TrackerRaw(() => {
  // 当再次调用的时候会执行构造函数中的 scheduler，借此再次执行跟踪
  tracker.track(view);
});

// 在外部执行一次跟踪，不再继续
tracker.track(view);

const Tracker: FC = () => (
  <Panel
    footer={
      <p>
        手动跟踪依赖，每次执行完就结束，下次再次更新将会触发构造函数中的 <code>scheduler</code>
        ，在函数内部再次添加跟踪，直至执行 <code>dispose</code>
      </p>
    }
    header={<h2>Tracker</h2>}
  >
    <ButtonRun
      tips="手动跟踪依赖"
      onClick={() => {
        if (obs.aa++ === 2) tracker.dispose();
      }}
    >
      最多跟踪 3 次
    </ButtonRun>
  </Panel>
);

export default Tracker;
