import { batch, observable, reaction } from "@formily/reactive";
import { FC } from "react";
import Panel from "./components/Panel";
import ButtonRun from "./components/ButtonRun";

const obs = observable({ aa: 1, bb: 2 });
const dispose = reaction(() => {
    console.log("reaction");
    return obs.aa + obs.bb;
}, console.log);

const Reaction: FC = () => (
    <Panel
        footer={
            <div>
                <p>执行顺序如下：</p>
                <ol>
                    <li>
                        初始化：执行 <code>reaction</code> 中的 <code>tracker</code>，首次触发跳过脏检查
                    </li>
                    <li>
                        点击第一步按钮：执行 <code>reaction</code> 中的 <code>tracker</code>，<code>aa</code> 和{" "}
                        <code>bb</code> 数据互换，返回数据没变化跳过回调函数
                    </li>
                    <li>
                        点击第二步按钮：执行 <code>reaction</code> 中的 <code>tracker</code>，修改 <code>aa</code>{" "}
                        的值，由于 <code>bb</code> 上一步修改为 1，所以结果是 5，触发回调函数
                    </li>
                    <li>
                        <code>dispose</code> 停止后续响应观察
                    </li>
                </ol>
            </div>
        }
        header={<h2>reaction</h2>}>
        <ButtonRun
            tips="第一步：先点击，不触发更新"
            onClick={() =>
                batch(() => {
                    obs.aa = 2;
                    obs.bb = 1;
                })
            }>
            click it
        </ButtonRun>
        <ButtonRun
            tips="第二步：点击触发更新后停止响应"
            onClick={() => {
                obs.aa = 4;
                dispose();
            }}>
            click it
        </ButtonRun>
    </Panel>
);

export default Reaction;
