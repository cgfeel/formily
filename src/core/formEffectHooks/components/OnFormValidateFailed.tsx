import { createForm, onFormValidateFailed } from "@formily/core";
import { FC, useMemo, useState } from "react";
import ActionResponse from "../ActionResponse";
import Panel from "../Panel";
import { onValidateEffects } from "../action";

const OnFormValidateFailed: FC = () => {
    const [response, setResponse] = useState("");
    const form = useMemo(
        () =>
            createForm({
                effects: () => {
                    onValidateEffects();
                    onFormValidateFailed(() => {
                        setResponse("表单校验失败");
                    });
                },
            }),
        [setResponse],
    );

    return (
        <Panel
            footer={
                <div>
                    <p>当校验不通过的时候触发，执行顺序如下：</p>
                    <ol>
                        <li>onFormValidateStart</li>
                        <li>onValidator {"<--"} 开始校验</li>
                        <li>onFormValidateEnd</li>
                        <li>onFormValidateFailed</li>
                        <li>onValidateFailed {"<--"} 捕获错误</li>
                    </ol>
                </div>
            }
            header={<h2>onFormValidateFailed - 监听表单校验失败</h2>}>
            <ActionResponse response={response}>
                <button
                    onClick={() => {
                        form.createField({
                            name: "input",
                            validator: () => {
                                console.log("onValidator");
                                return {
                                    type: "error",
                                    message: "测试校验错误",
                                };
                            },
                        });
                        form.validate().catch(() => console.log("onValidateFailed"));
                    }}>
                    Submit
                </button>
            </ActionResponse>
        </Panel>
    );
};

export default OnFormValidateFailed;
