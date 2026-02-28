import { observer } from "@formily/react";
import { createStyles, css } from "antd-style";
import { FC } from "react";
import extractMode, { CounterEnum } from "./Store";

const useStyle = createStyles(css`
  & button {
    margin-right: 10px;
  }
`);

const ObserverMode: FC<ObserverModeProps> = ({ id, mode, update }) => {
  const { styles } = useStyle();
  const counterStore = extractMode(id);
  const type = mode === "cat" ? "fish" : "cat";

  return (
    <div>
      <h2>按钮：{id + 1}</h2>
      <p>
        当前 <code>mode</code> 为：{mode}，当前值：{counterStore[mode]}
      </p>
      <div className={styles}>
        <button onClick={() => counterStore.inc(mode)}>+1</button>
        <button onClick={() => counterStore.dec(mode)}>-1</button>
        <button onClick={() => update(type)}>切换为：{type}</button>
      </div>
    </div>
  );
};

interface ObserverModeProps {
  id: number;
  mode: CounterEnum;
  update: (mode: CounterEnum) => void;
}

export { useStyle };

export default observer(ObserverMode);
