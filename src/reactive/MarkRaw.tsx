import { autorun, markRaw, observable } from "@formily/reactive";
import { FC } from "react";
import ButtonRun from "./components/ButtonRun";
import Panel from "./components/Panel";

class A {
    property = "";
}

class B {
    property = "";
}

markRaw(B);

const a = observable(new A());
const b = observable(markRaw(new A()));
const c = observable(new B());

autorun(() => {
    console.log("markRaw", a.property);
});

autorun(() => {
    console.log("markRaw", b.property);
});

autorun(() => {
    console.log("markRaw", c.property);
});

const MarkRaw: FC = () => (
    <Panel
        footer={
            <div>
                <p>2 个特性：</p>
                <ul>
                    <li>
                        优先级比 <code>markObservable</code> 高
                    </li>
                    <li>
                        如果对一个已经是 <code>observable</code> 的对象标记 <code>markRaw</code>，那么 <code>toJS</code>
                        ，是不会将它转换成普通对象的
                    </li>
                </ul>
            </div>
        }
        header={<h2>MarkRaw</h2>}>
        <ButtonRun
            tips="正常响应"
            onClick={() => {
                a.property = Date.now().toString();
            }}>
            click it
        </ButtonRun>
        <ButtonRun
            tips="markRaw包裹对象不响应"
            onClick={() => {
                b.property = Date.now().toString();
            }}>
            click it
        </ButtonRun>
        <ButtonRun
            tips="markRaw类级标记不响应"
            onClick={() => {
                c.property = Date.now().toString();
            }}>
            click it
        </ButtonRun>
    </Panel>
);

export default MarkRaw;
