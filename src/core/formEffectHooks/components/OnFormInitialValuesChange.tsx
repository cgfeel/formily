import { createForm, onFormInitialValuesChange } from "@formily/core";
import { FC, useMemo, useState } from "react";
import ActionResponse from "../../ActionResponse";
import Panel from "../Panel";

const OnFormInitialValuesChange: FC = () => {
  const [response, setResponse] = useState("");
  const form = useMemo(
    () =>
      createForm({
        effects: () => {
          onFormInitialValuesChange(form => {
            setResponse(`表单默认值变化 ${form.values.input}`);
          });
        },
      }),
    [setResponse],
  );

  return (
    <Panel
      footer={
        <div>
          <p>用于监听表单默认值变化的副作用钩子</p>
          <p>实际开发过程中，当表单项的默认值编辑修改后，会触发执行</p>
        </div>
      }
      header={<h2>onFormInitialValuesChange - 监听表单默认值变化</h2>}
    >
      <ActionResponse response={response}>
        <button onClick={() => form.setInitialValuesIn("input", "Hello World")}>Hello World</button>
      </ActionResponse>
    </Panel>
  );
};

export default OnFormInitialValuesChange;
