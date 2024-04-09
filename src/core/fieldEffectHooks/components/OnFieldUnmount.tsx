import { createForm, onFieldMount, onFieldUnmount } from "@formily/core";
import { FC, useMemo, useState } from "react";
import ActionResponse from "../../ActionResponse";
import Panel from "../Panel";

const OnFieldUnmount: FC = () => {
    const [response, setResponse] = useState("");
    const form = useMemo(
        () =>
            createForm({
                effects: () => {
                    onFieldMount("target", () => setResponse("字段已挂载"));
                    onFieldUnmount("target", () => setResponse("字段已卸载"));
                },
            }),
        [setResponse],
    );
    return (
        <Panel
            footer={
                <p>
                    用于监听某个字段已卸载的副作用钩子，我们在调用 <code>onUnmount</code> 的时候就会触发卸载事件
                </p>
            }
            header={<h2>onFieldUnmount - 监听某个字段已卸载</h2>}>
            <ActionResponse response={response}>
                <button onClick={() => form.createField({ name: "target" }).onMount()}>创建并挂载字段</button>
                <button onClick={() => form.createField({ name: "target" }).onUnmount()}>卸载字段</button>
            </ActionResponse>
        </Panel>
    );
};

export default OnFieldUnmount;
