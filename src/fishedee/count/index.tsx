import { autorun, observable } from "@formily/reactive";
import { observer } from "@formily/react";
import { FC } from "react";
import Panel from "../Panel";
import ObserverMode, { useStyle } from "./ObserverMode";
import { CounterEnum, list } from "./Store";

const data = observable({ button: ["fish"] as CounterEnum[], open: true });
autorun(() => {
    if (data.button.length === 0) {
        list.clear();
    }
});

const Tool: FC = () => {
    const { styles } = useStyle();
    return (
        <div className={styles}>
            <button onClick={() => data.button.push("fish")}>添加 1 个</button>
            <button onClick={() => (data.button = [])}>清除</button>
            <button onClick={() => (data.open = !data.open)}>{data.open ? "关闭" : "打开"}</button>
        </div>
    );
};

const Count: FC = () => (
    <Panel
        footer={
            <div>
                <p>修改线上 Demo：</p>
                <ul>
                    <li>支持多计数器加减互不干扰</li>
                    <li>支持隐藏、展示</li>
                    <li>支持清空数据，并且响应清空将存储的数据一并清空</li>
                    <li>支持恢复展示后保留原先数据</li>
                </ul>
            </div>
        }
        header={<h2>多计数器</h2>}>
        <Tool />
        {data.open &&
            data.button.map((mode, id) => (
                <ObserverMode mode={mode} id={id} key={id} update={mode => (data.button[id] = mode)} />
            ))}
    </Panel>
);

export default observer(Count);
