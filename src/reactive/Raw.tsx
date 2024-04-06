import { observable, raw } from "@formily/reactive";
import { FC } from "react";
import ButtonRun from "./components/ButtonRun";
import Panel from "./components/Panel";

const obs = observable({ aa: {} });
obs.aa = { bb: 123 };

const Raw: FC = () => (
    <Panel header={<h2>obs</h2>}>
        <ButtonRun tips="获取源数据" onClick={() => console.log("raw", raw(obs))}>
            click it
        </ButtonRun>
        <ButtonRun tips="获取源数据对象" onClick={() => console.log("raw", raw(obs.aa))}>
            click it
        </ButtonRun>
    </Panel>
);

export default Raw;
