import { createForm, onFormSubmitValidateFailed } from "@formily/core";
import { FC, useMemo, useState } from "react";
import ActionResponse from "../ActionResponse";
import Panel from "../Panel";
import { onSubmitEffects, onSubmitPromise } from "../action";

const OnFormSubmitValidateFailed: FC = () => {
    const [response, setResponse] = useState("");
    const form = useMemo(
        () =>
            createForm({
                effects: () => {
                    onSubmitEffects();
                    onFormSubmitValidateFailed(() => {
                        setResponse("表单提交校验失败");
                    });
                },
            }),
        [setResponse],
    );

    return (
        <Panel
            footer={
                <p>
                    点击按钮在控制面板查看执行顺序，执行顺序和 <code>onFormSubmitFailed</code> 中{" "}
                    <code>Validate Error</code> 一样，只有提交时验证失败的时候才会触发
                </p>
            }
            header={<h2>OnFormSubmitValidateFailed - 监听表单提交过程的字段校验失败</h2>}>
            <ActionResponse response={response}>
                <button
                    onClick={() => {
                        form.createField({ name: "input", required: true });
                        form.submit(onSubmitPromise).catch(info => console.log("Validate Error", info));
                    }}>
                    Submit
                </button>
            </ActionResponse>
        </Panel>
    );
};

export default OnFormSubmitValidateFailed;
