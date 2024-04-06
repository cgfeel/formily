import styled from "@emotion/styled";
import { observable } from "@formily/reactive";
import { Observer, observer } from "@formily/reactive-react";
import { FC, PropsWithChildren, ReactNode } from "react";
import Line from "./components/Line";
import Panel from "./components/Panel";

const obs1 = observable({ value: "hello world" });
const obs2 = observable({ value: "hello world" });

const Input = styled.input`
    border: 2px solid #888;
    border-radius: 3px;
    height: 28px;
    padding: 0 8px;
`;

const ObserverCom: FC = () => (
    <Panel
        footer={
            <p>
                可以把 <code>observer</code> 和 <code>Observer</code> 的关系看作是 <code>memo</code> 和{" "}
                <code>useMemo</code>
            </p>
        }
        header={<h2>observer、Observer</h2>}>
        <Line tips="observer">
            <ObservableWraper />
        </Line>
        <Line tips="Observer">
            <ObservableInner />
        </Line>
    </Panel>
);

const ObservableInner: FC = () => (
    <Wraper footer={<Observer>{() => <div>{obs2.value}</div>}</Observer>}>
        <Observer>
            {() => (
                <Input
                    value={obs2.value}
                    onChange={event => {
                        obs2.value = event.target.value;
                    }}
                />
            )}
        </Observer>
    </Wraper>
);

const ObservableWraper = observer(() => (
    <Wraper footer={<div>{obs1.value}</div>}>
        <Input
            value={obs1.value}
            onChange={event => {
                obs1.value = event.target.value;
            }}
        />
    </Wraper>
));

const Wraper: FC<PropsWithChildren<WraperProps>> = ({ children, footer }) => (
    <div>
        <div>{children}</div>
        {footer}
    </div>
);

interface WraperProps {
    footer?: ReactNode;
}

export default ObserverCom;
