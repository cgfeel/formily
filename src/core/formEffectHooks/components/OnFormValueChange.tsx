import { createForm, onFormValuesChange } from "@formily/core";
import { FC, useMemo, useState } from "react";
import ActionResponse from "../../ActionResponse";
import Panel from "../Panel";

const OnFormValuesChange: FC = () => {
    const [response, setResponse] = useState("");
    const form = useMemo(
        () =>
            createForm({
                effects: () => {
                    onFormValuesChange(form => {
                        switch (form.values.input) {
                            case "hello":
                                setResponse("表单值变化 Hello");
                                break;
                            case "world":
                                setResponse("表单值变化 World");
                                break;
                        }
                    });
                },
            }),
        [setResponse],
    );

    return (
        <Panel
            footer={
                <div>
                    <p>用于监听表单值变化的副作用钩子</p>
                    <p>实际开发过程中，当表单项的值编辑修改后，会触发执行</p>
                    <p>
                        有一个主动受控的 Hook <code>onFieldValueChange</code> 用于表单项的主动受控响应，同理这个 Hook
                        用于整个表单的受控
                    </p>
                </div>
            }
            header={<h2>onFormValuesChange - 监听表单值变化</h2>}>
            <ActionResponse response={response}>
                <button onClick={() => form.setValuesIn("input", "hello")}>Hello</button>
                <button onClick={() => form.setValuesIn("input", "world")}>World</button>
            </ActionResponse>
        </Panel>
    );
};

export default OnFormValuesChange;
