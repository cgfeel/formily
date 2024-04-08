import { createForm, onFormSubmitEnd } from "@formily/core";
import { FC, useMemo, useState } from "react";
import ActionResponse from "../../ActionResponse";
import Panel from "../Panel";
import { onSubmitEffects, onSubmitPromise } from "../action";

const OnFormSubmitEnd: FC = () => {
    const [response, setResponse] = useState("");
    const form = useMemo(
        () =>
            createForm({
                effects: () => {
                    onSubmitEffects();
                    onFormSubmitEnd(() => {
                        setResponse("表单提交结束");
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
            header={<h2>onFormSubmitEnd - 监听表单提交结束</h2>}>
            <ActionResponse response={response}>
                <button onClick={() => form.submit(onSubmitPromise)}>Submit</button>
            </ActionResponse>
        </Panel>
    );
};

export default OnFormSubmitEnd;
