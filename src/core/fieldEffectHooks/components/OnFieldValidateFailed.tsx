import { createForm, onFieldValidateFailed } from "@formily/core";
import { FC, useMemo, useState } from "react";
import ActionResponse from "../../ActionResponse";
import Panel from "../Panel";
import { onValidateEffects } from "../action";

const OnFieldValidateFailed: FC = () => {
    const [response, setResponse] = useState("");
    const form = useMemo(
        () =>
            createForm({
                effects: () => {
                    onValidateEffects("target");
                    onFieldValidateFailed("target", () => {
                        setResponse("target校验失败");
                    });
                },
            }),
        [setResponse],
    );
    return (
        <Panel
            footer={
                <div>
                    <p>字段验证失败时触发，顺序如下：</p>
                    <ol>
                        <li>onFieldValidateStart</li>
                        <li>onValidate</li>
                        <li>onFieldValidateEnd</li>
                        <li>onFieldValidateFailed</li>
                    </ol>
                </div>
            }
            header={<h2>onFieldValidateFailed - 监听某个字段校验触发失败</h2>}>
            <ActionResponse response={response}>
                <button
                    onClick={() => {
                        const field = form.createField({
                            name: "target",
                            validator: () => {
                                console.log("onValidate");
                                return false;
                            },
                        });
                        field.onInput((field.value || 0) + 1);
                    }}>
                    触发验证
                </button>
            </ActionResponse>
        </Panel>
    );
};

export default OnFieldValidateFailed;
