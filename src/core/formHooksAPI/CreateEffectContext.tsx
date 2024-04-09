import { createEffectContext, createForm, onFormSubmit, useEffectForm as getEffectForm } from "@formily/core";
import { FC, useMemo, useState } from "react";
import ActionResponse from "../ActionResponse";
import Panel from "./Panel";

const { consume, provide } = createEffectContext<CustomType>();
const onMyHook = () => {
    const form = getEffectForm();
    const setResponse = consume();
    onFormSubmit(() => setResponse(`上下文通讯成功：${form.id}`));
};

const CreateEffectContext: FC = () => {
    const [response, setResponse] = useState("");
    const form = useMemo(
        () =>
            createForm({
                effects: () => {
                    provide(setResponse);
                    onMyHook();
                },
            }),
        [setResponse],
    );
    return (
        <Panel
            footer={
                <div>
                    <p>
                        <strong>createEffectContext：</strong>
                    </p>
                    <p>
                        在 <code>effects</code> 函数中如果我们抽象了很多细粒度的 <code>hooks</code>，想要在{" "}
                        <code>hooks</code> 里读到顶层上下文数据就需要层层传递，这样明显是很低效的事情，所以{" "}
                        <code>formily</code> 提供了 <code>createEffectContext</code> 帮助用户快速获取上下文数据
                    </p>
                    <p>
                        <code>createEffectContext</code> 返回一个提供方法 <code>provide</code> 和一个消费方法{" "}
                        <code>consume</code>，通过在 <code>provide</code> 提供 <code>setState</code>，将{" "}
                        <code>React</code> 默认的 <code>Hook</code> 转发到外部作为表单提交后使用
                    </p>
                    <p>
                        <strong>useEffectForm：</strong>
                    </p>
                    <p>
                        <code>useEffectForm</code> 其实是 <code>EffectContext</code>{" "}
                        的便利用法，因为大多数场景用户都会读取 <code>Form</code> 实例，所以就不需要手动定义一个{" "}
                        <code>EffectFormContext</code>
                    </p>
                </div>
            }
            header={<h2>createEffectContext、useEffectForm</h2>}>
            <ActionResponse response={response}>
                <button onClick={() => form.submit()}>提交</button>
            </ActionResponse>
        </Panel>
    );
};

type CustomType = (value: string) => void;

export default CreateEffectContext;
