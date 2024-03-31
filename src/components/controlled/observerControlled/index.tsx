import { observable } from "@formily/reactive";
import { observer } from "@formily/reactive-react";
import { FC, useMemo, useRef } from "react";
import Panel from "../Panel";
import Wraper, { WraperProps } from "../valueControlled/Wraper";
import MyForm from "./MyForm";

const WraperObserver = observer(Wraper);

const ObserverInner: FC<Pick<WraperProps, "title">> = ({ title }) => {
    const count = useRef(1);
    const values = useMemo(() => observable({ input: "" }), []);
    return (
        <WraperObserver
            name="Controller 组件"
            footer={
                <div>
                    <MyForm values={values} />
                    根组件渲染次数：{count.current++}
                </div>
            }
            title={title}
            values={values}
            update={input => {
                values.input = input;
            }}
        />
    );
};

const ObserverControlled: FC = () => (
    <Panel
        footer={
            <p>
                通过 <code>observable</code> 创建受控数据，<code>observer</code>{" "}
                创建受控组件实现双向绑定，在使用受控数据的表单中可以做到不消费一点表单外层组件的 <code>React</code>{" "}
                性能，去实现表单交互
            </p>
        }
        header={<h2>响应式值受控</h2>}>
        <ObserverInner />
    </Panel>
);

export { ObserverInner };

export default ObserverControlled;
