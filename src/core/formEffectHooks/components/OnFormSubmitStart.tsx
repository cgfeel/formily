import { createForm, onFormSubmitStart } from "@formily/core";
import { FC, useMemo, useState } from "react";
import ActionResponse from "../ActionResponse";
import Panel from "../Panel";
import { onSubmitEffects, onSubmitPromise } from "../action";

const OnFormSubmitStart: FC = () => {
    const [response, setResponse] = useState("");
    const form = useMemo(
        () =>
            createForm({
                effects: () => {
                    onSubmitEffects();
                    onFormSubmitStart(() => {
                        setResponse("表单开始提交");
                    });
                },
            }),
        [setResponse],
    );

    return (
        <Panel
            footer={
                <p>
                    点击按钮在控制面板查看执行顺序，执行顺序和 <code>onFormSubmit</code>{" "}
                    一样，无论提交结果如何，提交时都会触发
                </p>
            }
            header={<h2>OnFormSubmitStart - 监听表单开始提交</h2>}>
            <ActionResponse response={response}>
                <button onClick={() => form.submit(onSubmitPromise)}>Submit</button>
            </ActionResponse>
        </Panel>
    );
};

export default OnFormSubmitStart;
