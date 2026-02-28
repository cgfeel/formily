import { createForm, onFormUnmount } from "@formily/core";
import { FC, useMemo, useState } from "react";
import ActionResponse from "../../ActionResponse";
import Panel from "../Panel";

const OnFormUnmount: FC = () => {
  const [response, setResponse] = useState("");
  const form = useMemo(
    () =>
      createForm({
        effects: () => {
          onFormUnmount(() => setResponse("表单已卸载"));
        },
      }),
    [setResponse],
  );

  return (
    <Panel
      footer={
        <p>
          用于监听表单已卸载的副作用钩子，我们在调用 <code>onUnmount</code> 的时候就会触发卸载事件
        </p>
      }
      header={<h2>onFormUnmount - 卸载表单</h2>}
    >
      <ActionResponse response={response}>
        <button onClick={() => form.onUnmount()}>卸载表单</button>
      </ActionResponse>
    </Panel>
  );
};

export default OnFormUnmount;
