import { createForm, onFormValidateEnd } from "@formily/core";
import { FC, useMemo, useState } from "react";
import ActionResponse from "../../ActionResponse";
import Panel from "../Panel";
import { onValidateEffects } from "../action";

const OnFormValidateEnd: FC = () => {
    const [response, setResponse] = useState("");
    const form = useMemo(
        () =>
            createForm({
                effects: () => {
                    onValidateEffects();
                    onFormValidateEnd(() => {
                        setResponse("表单校验结束");
                    });
                },
            }),
        [setResponse],
    );

    return (
        <Panel
            footer={
                <p>
                    点击按钮在控制面板查看执行顺序，执行顺序和 <code>onFormValidateStart</code>{" "}
                    一样，无论结果如何，验证时都会触发
                </p>
            }
            header={<h2>onFormValidateEnd - 监听表单校验结束</h2>}>
            <ActionResponse response={response}>
                <button
                    onClick={() => {
                        form.createField({
                            name: "input",
                            validator: () => {
                                console.log("onValidator");
                                return true;
                            },
                        });
                        form.validate();
                    }}>
                    Submit
                </button>
            </ActionResponse>
        </Panel>
    );
};

export default OnFormValidateEnd;
