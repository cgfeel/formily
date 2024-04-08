import { createForm, onFormInputChange } from "@formily/core";
import { FC, useMemo, useState } from "react";
import ActionResponse from "../../ActionResponse";
import Panel from "../Panel";

const OnFormInput: FC = () => {
    const [response, setResponse] = useState("");
    const form = useMemo(
        () =>
            createForm({
                effects: () => {
                    onFormInputChange(form => {
                        setResponse(`字符输入变化 ${form.values.input}`);
                    });
                },
            }),
        [setResponse],
    );

    return (
        <Panel
            footer={
                <div>
                    <p>用于监听字段输入的副作用钩子</p>
                </div>
            }
            header={<h2>onFormInputChange - 监听字段输入</h2>}>
            <ActionResponse response={response}>
                <button onClick={() => form.createField({ name: "input" }).onInput("Hello World")}>Hello World</button>
            </ActionResponse>
        </Panel>
    );
};

export default OnFormInput;
