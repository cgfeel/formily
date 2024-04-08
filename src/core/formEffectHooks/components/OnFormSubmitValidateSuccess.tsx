import { createForm, onFormSubmitValidateSuccess } from "@formily/core";
import { FC, useMemo, useState } from "react";
import ActionResponse from "../ActionResponse";
import Panel from "../Panel";
import { onSubmitEffects, onSubmitPromise } from "../action";

const OnFormSubmitValidateSuccess: FC = () => {
    const [response, setResponse] = useState("");
    const form = useMemo(
        () =>
            createForm({
                effects: () => {
                    onSubmitEffects();
                    onFormSubmitValidateSuccess(() => {
                        setResponse("表单提交校验成功");
                    });
                },
            }),
        [setResponse],
    );

    return (
        <Panel
            footer={<p>只有提交表单时验证通过才会触发</p>}
            header={<h2>onFormSubmitValidateSuccess - 监听表单提交过程的字段校验成功</h2>}>
            <ActionResponse response={response}>
                <button onClick={() => form.submit(onSubmitPromise)}>Submit</button>
            </ActionResponse>
        </Panel>
    );
};

export default OnFormSubmitValidateSuccess;
