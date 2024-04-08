import { createForm, onFormSubmit } from "@formily/core";
import { FC, useMemo, useState } from "react";
import ActionResponse from "../ActionResponse";
import Panel from "../Panel";

const OnFormSubmit: FC = () => {
    const [response, setResponse] = useState("");
    const form = useMemo(
        () =>
            createForm({
                effects: () => {
                    onFormSubmit(() => {
                        setResponse("表单已提交");
                    });
                },
            }),
        [setResponse],
    );

    return (
        <Panel header={<h2>onFormSubmit - 监听表单提交</h2>}>
            <ActionResponse response={response}>
                <button onClick={() => form.submit()}>Hello World</button>
            </ActionResponse>
        </Panel>
    );
};

export default OnFormSubmit;
