import { createForm, onFieldReact } from "@formily/core";
import { FC, useMemo, useState } from "react";
import ActionResponse from "../../ActionResponse";
import Panel from "../Panel";

const OnFieldReact: FC = () => {
    const [response, setResponse] = useState("");
    const form = useMemo(
        () =>
            createForm({
                effects: () => {
                    onFieldReact("target", () => {
                        switch (form.values.target) {
                            case undefined:
                                setResponse("字段已挂载");
                                break;
                            case null:
                                setResponse("字段null");
                                break;
                            case 123:
                                setResponse("字段123");
                                break;
                        }
                    });
                },
            }),
        [setResponse],
    );
    return (
        <Panel
            footer={
                <p>
                    用于监听某个字段已卸载的副作用钩子，我们在调用 <code>onUnmount</code> 的时候就会触发卸载事件
                </p>
            }
            header={<h2>onFieldReact - 实现字段响应式逻辑</h2>}>
            <ActionResponse response={response}>
                <button
                    onClick={() => {
                        form.clearFormGraph("target");
                        form.createField({ name: "target" });
                    }}>
                    初始化target
                </button>
                <button
                    onClick={() => {
                        const field = form.createField({ name: "target" });
                        field.setValue(123);
                    }}>
                    赋值target = 123
                </button>
                <button
                    onClick={() => {
                        const field = form.createField({ name: "target" });
                        field.setValue(null);
                    }}>
                    赋值target = null
                </button>
            </ActionResponse>
        </Panel>
    );
};

export default OnFieldReact;
