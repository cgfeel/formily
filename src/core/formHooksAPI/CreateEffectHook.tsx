import { Form, createEffectHook, createForm } from "@formily/core";
import { FC, useMemo, useState } from "react";
import ActionResponse from "../ActionResponse";
import Panel from "./Panel";

const onCustomEvent = createEffectHook<CustomeEventType>(
    "custom-event",
    (payload, form) => listener => listener(payload, form),
);

const CreateEffectHook: FC = () => {
    const [response, setResponse] = useState("");
    const form = useMemo(
        () =>
            createForm({
                effects: () => {
                    onCustomEvent((payload, form) => {
                        setResponse(`${payload} Form: ${form.id}`);
                    });
                },
            }),
        [setResponse],
    );
    return (
        <Panel
            footer={
                <div>
                    <p>
                        通过 <code>form.notify</code> 调用自定义的 <code>createEffectHook</code>
                        ，第一个参数是事件名，第二个参数是要传递的 <code>payload</code>。 在 <code>Form</code> 和{" "}
                        <code>Field</code> 对象中触发 <code>Effect Hooks</code> 都是通过 <code>notify</code> 将事件广播
                    </p>
                    <p>
                        <code>createEffectHook</code> 是一个高阶函数，通过第二个 <code>callback</code> 返回可调用的函数
                    </p>
                </div>
            }
            header={<h2>createEffectHook - 创建自定义钩子监听器</h2>}>
            <ActionResponse response={response}>
                <button onClick={() => form.notify("custom-event", "This is Custom Event")}>Notify</button>
            </ActionResponse>
        </Panel>
    );
};

type CustomeEventType = (...args: Parameters<ListenerType>) => (listener: ListenerType) => void;

type ListenerType = (payload: string, form: Form) => void;

export default CreateEffectHook;
