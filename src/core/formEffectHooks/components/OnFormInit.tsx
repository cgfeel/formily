import { createForm, onFormInit } from "@formily/core";
import { FC, useMemo, useState } from "react";
import ActionResponse from "../ActionResponse";
import Panel from "../Panel";

const OnFormInit: FC = () => {
    const [response, setResponse] = useState("");
    useMemo(
        () =>
            createForm({
                effects: () => {
                    onFormInit(() => setResponse("表单已初始化"));
                },
            }),
        [setResponse],
    );

    return (
        <Panel
            footer={
                <p>
                    用于监听某个表单初始化的副作用钩子，我们在调用 <code>createForm</code> 的时候就会触发初始化事件
                </p>
            }
            header={<h2>onFormInit - 表单初始化</h2>}>
            <ActionResponse response={response} />
        </Panel>
    );
};

export default OnFormInit;
