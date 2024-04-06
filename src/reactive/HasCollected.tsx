import { autorun, hasCollected, markObservable, markRaw, observable, toJS } from "@formily/reactive";
import { FC } from "react";
import ButtonRun from "./components/ButtonRun";
import Panel from "./components/Panel";

class A {
    property = "";
    toJS() {}
}
class B {
    property = "";
}

const a = observable(new A());
const b = observable(markObservable(new A()));
const c = observable(new B());
const d = observable(markRaw(new B()));
const js = toJS(c);

autorun(() => {
    console.log(
        "hasCollected-a",
        hasCollected(() => a.property),
    );
});

autorun(() => {
    console.log(
        "hasCollected-b",
        hasCollected(() => b.property),
    );
});

autorun(() => {
    console.log(
        "hasCollected-c",
        hasCollected(() => c.property),
    );
});

autorun(() => {
    console.log(
        "hasCollected-d",
        hasCollected(() => d.property),
    );
});

autorun(() => {
    console.log(
        "hasCollected-js",
        hasCollected(() => js.property),
    );
});

const HasCollected: FC = () => (
    <Panel
        footer={
            <div>
                <p>
                    这里分别鉴定 <code>toJS</code> 属性对象、<code>markObservable</code>对象、正常的{" "}
                    <code>observable</code> 对象、<code>markRaw</code> 对象、<code>toJS</code>对象进行测试
                </p>
                <p>
                    只有 <code>markObservable</code>对象、正常的 <code>observable</code>对象能够正常依赖
                </p>
            </div>
        }
        header={<h2>hasCollected</h2>}>
        <ButtonRun
            tips="鉴定否存在依赖收集"
            onClick={() => {
                a.property = Date.now().toString();
                b.property = Date.now().toString();
                c.property = Date.now().toString();
                d.property = Date.now().toString();
                js.property = Date.now().toString();
            }}>
            click it
        </ButtonRun>
    </Panel>
);

export default HasCollected;
