import { autorun, observable, untracked } from "@formily/reactive";
import { FC } from "react";
import ButtonRun from "./components/ButtonRun";
import Panel from "./components/Panel";

const obs = observable({ aa: 0 });
autorun(() => {
  console.log(
    "untracked",
    untracked(() => obs.aa),
  );
});

const Untracked: FC = () => (
  <Panel header={<h2>untracked</h2>}>
    <ButtonRun tips="触发的不会执行响应" onClick={() => obs.aa++}>
      click it
    </ButtonRun>
  </Panel>
);

export default Untracked;
