import { action, autorun, observable } from "@formily/reactive";
import { FC } from "react";
import ButtonRun from "./components/ButtonRun";
import Panel from "./components/Panel";

const obs = observable({ aa: 0, bb: 0, cc: "empty", dd: "empty" });
autorun(() => {
    console.log("action", obs.aa, obs.bb, obs.cc, obs.dd);
});

const Action: FC = () => (
    <Panel
        footer={
            <div>
                <p>
                    <code>code</code> 和 <code>batch</code> 一样的，不同在于：
                </p>
                <ul>
                    <li>不能收集依赖</li>
                    <li>
                        没有 <code>endpoint</code>
                    </li>
                </ul>
                <p>
                    收集依赖：例如在 <code>effects</code> 中通过 <code>{"field.query({path}).value()"}</code> 或者{" "}
                    <code>{"form.{path}.value"}</code> 收集依赖，或通过模型中的 <code>x-reactions</code> 添加{" "}
                    <code>depencies</code> 添加依赖
                </p>
                <p>
                    因此在 <code>action</code> 外部使用方法：
                </p>
                <ul>
                    <li>
                        <code>action.bound</code> 可作为 <code>promise</code>{" "}
                        回调方法，并通过第二个参数绑定上下文，方法内部可以避免收集依赖项
                    </li>
                    <li>
                        <code>action.scope</code> 目前来看和普通方法基本一致，在文档中也没有看到外部使用的案例
                    </li>
                </ul>
            </div>
        }
        header={<h2>action</h2>}>
        <ButtonRun
            tips="批量操作-拆分成不同的微任务"
            onClick={() =>
                action(() => {
                    Promise.resolve().then(
                        action.bound!(() => {
                            obs.cc = "cccc";
                        }),
                    );
                    action.scope!(() => {
                        obs.aa = 123;
                    });
                    obs.bb = 321;
                    obs.dd = "dddd";
                })
            }>
            click it
        </ButtonRun>
        <ButtonRun
            tips="批量操作-在同一个任务栈执行"
            onClick={() =>
                action(() => {
                    obs.aa = 0;
                    obs.cc = "empty";
                    obs.bb = 0;
                    obs.dd = "empty";
                })
            }>
            click it
        </ButtonRun>
    </Panel>
);

export default Action;
