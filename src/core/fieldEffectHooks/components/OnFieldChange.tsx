import { createForm, isField, onFieldChange } from "@formily/core";
import { FC, useMemo, useState } from "react";
import ActionResponse from "../../ActionResponse";
import Panel from "../Panel";

const OnFieldChange: FC = () => {
    const [response, setResponse] = useState("");
    const form = useMemo(
        () =>
            createForm({
                effects: () => {
                    onFieldChange("target", field => {
                        isField(field) && setResponse("target 值变化：" + field.value);
                    });
                    onFieldChange("target", ["component"], field => {
                        Array.isArray(field.component) && setResponse(`target组件变化：${field.component[0]}`);
                    });
                },
            }),
        [setResponse],
    );
    return (
        <Panel
            footer={
                <div>
                    <p>
                        在设置字段组件的时候会先经监控值变化，然后再监控组件变化（上下文顺序），设置的{" "}
                        <code>response</code> 也因此发生了覆盖
                    </p>
                    <p>
                        <code>onFieldChange</code> 可以监控字段所有的 <code>state</code>，并不局限于{" "}
                        <code>component</code>
                    </p>
                </div>
            }
            header={<h2>onFieldChange - 监听某个字段的属性变化的副作用</h2>}>
            <ActionResponse response={response}>
                <button
                    onClick={() => {
                        const field = form.createField({ name: "target" });
                        field.setValue((field.value || 0) + 1);
                    }}>
                    设置值
                </button>
                <button
                    onClick={() => {
                        const field = form.createField({ name: "target" });
                        field.setComponent(
                            Array.isArray(field.component) && field.component[0] === "Input" ? "Select" : "Input",
                        );
                    }}>
                    设置组件
                </button>
            </ActionResponse>
        </Panel>
    );
};

export default OnFieldChange;
