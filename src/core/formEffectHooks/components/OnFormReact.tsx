import { createForm, onFormReact } from "@formily/core";
import { FC, useMemo, useState } from "react";
import ActionResponse from "../ActionResponse";
import Panel from "../Panel";

const OnFormReact: FC = () => {
    const [response, setResponse] = useState("");
    const form = useMemo(
        () =>
            createForm({
                effects: () => {
                    onFormReact(form => {
                        switch (form.values.input) {
                            case "hello":
                                setResponse("响应 Hello");
                                break;
                            case "world":
                                setResponse("响应 World");
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
                    <p>
                        用于实现表单响应式逻辑的副作用钩子，它的核心原理就是表单初始化的时候会执行回调函数，同时自动追踪依赖，依赖数据发生变化时回调函数会重复执行
                    </p>
                    <p>实际开发过程中，当表单项的值编辑修改后，会触发执行</p>
                    <p>
                        有一个被动受控的 Hook <code>onFieldReact</code> 用于表单项的被动受控响应，同理这个 Hook
                        用于整个表单的受控
                    </p>
                </div>
            }
            header={<h2>onFormReact - 表单响应式逻辑</h2>}>
            <ActionResponse response={response}>
                <button onClick={() => form.setValuesIn("input", "hello")}>Hello</button>
                <button onClick={() => form.setValuesIn("input", "world")}>World</button>
            </ActionResponse>
        </Panel>
    );
};

export default OnFormReact;
