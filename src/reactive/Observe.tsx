import { observable, observe } from "@formily/reactive";
import { FC } from "react";
import ButtonRun from "./components/ButtonRun";
import Panel from "./components/Panel";

const obs = observable({ aa: 0 });

const dispose = observe(obs, change => {
    console.log("observe", change);
});

const Observe: FC = () => (
    <Panel
        footer={
            <div>
                <p>
                    <code>observe</code> 默认监听 <code>observable</code> 深拷贝
                </p>
                <p>
                    和 <code>autorun</code> 不同，初始化不监听，只有值发生改变的时候才发生响应
                </p>
            </div>
        }
        header={<h2>observe</h2>}>
        <ButtonRun
            tips="监听 observable 所有操作"
            onClick={() => {
                if (obs.aa++ === 2) dispose();
            }}>
            最多响应 3 次
        </ButtonRun>
    </Panel>
);

export default Observe;
