import { createForm, isField, onFieldInitialValueChange } from "@formily/core";
import { FC, useMemo, useState } from "react";
import ActionResponse from "../../ActionResponse";
import Panel from "../Panel";

const OnFieldInitialValueChange: FC = () => {
    const [response, setResponse] = useState("");
    const form = useMemo(
        () =>
            createForm({
                effects: () => {
                    onFieldInitialValueChange("target", field => {
                        isField(field) && setResponse("target 值变化：" + field.value);
                    });
                },
            }),
        [setResponse],
    );
    return (
        <Panel
            footer={<p>只监控默认值的改变，字段值的改变不产生任何反应</p>}
            header={<h2>onFieldInitialValueChange - 监听某个字段默认值变化</h2>}>
            <ActionResponse response={response}>
                <button
                    onClick={() => {
                        const field = form.createField({ name: "target" });
                        field.setInitialValue((field.value || 0) + 1);
                    }}>
                    设置值
                </button>
            </ActionResponse>
        </Panel>
    );
};

export default OnFieldInitialValueChange;
