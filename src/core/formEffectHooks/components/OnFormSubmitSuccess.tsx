import { createForm, onFormSubmitSuccess } from "@formily/core";
import { FC, useMemo, useState } from "react";
import ActionResponse from "../ActionResponse";
import Panel from "../Panel";
import { onSubmitEffects, onSubmitPromise } from "../action";

const OnFormSubmitSuccess: FC = () => {
    const [response, setResponse] = useState("");
    const form = useMemo(
        () =>
            createForm({
                effects: () => {
                    onSubmitEffects();
                    onFormSubmitSuccess(() => {
                        setResponse("表单提交成功");
                    });
                },
            }),
        [setResponse],
    );

    return (
        <Panel
            footer={<p>点击按钮在控制面板查看执行顺序，只有提交成功才会触发</p>}
            header={<h2>onFormSubmitSuccess - 监听表单提交成功</h2>}>
            <ActionResponse response={response}>
                <button onClick={() => form.submit(onSubmitPromise)}>Submit</button>
            </ActionResponse>
        </Panel>
    );
};

export default OnFormSubmitSuccess;
