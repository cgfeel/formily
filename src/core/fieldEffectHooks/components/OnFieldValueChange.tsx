import { createForm, isField, onFieldChange, onFieldValueChange } from "@formily/core";
import { FC, useMemo, useState } from "react";
import ActionResponse from "../../ActionResponse";
import Panel from "../Panel";

const OnFieldValueChange: FC = () => {
    const [response, setResponse] = useState("");
    const form = useMemo(
        () =>
            createForm({
                effects: () => {
                    onFieldValueChange("target", field => {
                        isField(field) && setResponse("target 值变化：" + field.value);
                    });
                    onFieldChange("target", ["component"], () => console.log("只触发 1 次"));
                },
            }),
        [setResponse],
    );
    return (
        <Panel
            footer={
                <p>
                    即便在演示中只修改了字段值，但对于字段的其它 <code>state</code>{" "}
                    监控，也会在第1次设置值时触发1次，打开控制面板点击按钮查看演示
                </p>
            }
            header={<h2>onFieldValueChange - 监听某个字段值变化</h2>}>
            <ActionResponse response={response}>
                <button
                    onClick={() => {
                        const field = form.createField({ name: "target" });
                        field.setValue((field.value || 0) + 1);
                    }}>
                    设置值
                </button>
            </ActionResponse>
        </Panel>
    );
};

export default OnFieldValueChange;
