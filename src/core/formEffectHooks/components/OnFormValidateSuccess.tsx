import { createForm, onFormValidateSuccess } from "@formily/core";
import { FC, useMemo, useState } from "react";
import ActionResponse from "../ActionResponse";
import Panel from "../Panel";
import { onValidateEffects } from "../action";

const OnFormValidateSuccess: FC = () => {
    const [response, setResponse] = useState("");
    const form = useMemo(
        () =>
            createForm({
                effects: () => {
                    onValidateEffects();
                    onFormValidateSuccess(() => {
                        setResponse("表单校验成功");
                    });
                },
            }),
        [setResponse],
    );

    return (
        <Panel footer={<p>只有校验成功才触发</p>} header={<h2>onFormValidateSuccess - 监听表单校验成功</h2>}>
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

export default OnFormValidateSuccess;
