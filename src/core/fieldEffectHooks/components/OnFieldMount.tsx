import { createForm, onFieldMount } from "@formily/core";
import { FC, useMemo, useState } from "react";
import ActionResponse from "../../ActionResponse";
import Panel from "../Panel";

const OnFieldMount: FC = () => {
    const [response, setResponse] = useState("");
    const form = useMemo(
        () =>
            createForm({
                effects: () => {
                    onFieldMount("target", () => setResponse("字段已挂载"));
                },
            }),
        [setResponse],
    );
    return (
        <Panel
            footer={
                <p>
                    用于监听某个字段已挂载的副作用钩子，我们在调用 <code>onMount</code> 的时候就会触发字段挂载事件
                </p>
            }
            header={<h2>onFieldMount - 监听某个字段已挂载</h2>}>
            <ActionResponse response={response}>
                <button onClick={() => form.createField({ name: "target" }).onMount()}>创建字段</button>
            </ActionResponse>
        </Panel>
    );
};

export default OnFieldMount;
