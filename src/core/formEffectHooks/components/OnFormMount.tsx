import { createForm, onFormMount } from "@formily/core";
import { FC, useMemo, useState } from "react";
import ActionResponse from "../../ActionResponse";
import Panel from "../Panel";

const OnFormMount: FC = () => {
  const [response, setResponse] = useState("");
  const form = useMemo(
    () =>
      createForm({
        effects: () => {
          onFormMount(() => setResponse("表单已挂载"));
        },
      }),
    [setResponse],
  );

  return (
    <Panel
      footer={
        <div>
          <p>
            用于监听表单已挂载的副作用钩子，我们在调用 <code>onMount</code> 的时候就会触发挂载事件
          </p>
          <p>
            在实际开发过程中，一旦 <code>form</code> 挂载到 <code>Form</code> 或{" "}
            <code>FormProvider</code> 中的时候，会触发 <code>onMount</code>
          </p>
        </div>
      }
      header={<h2>onFormMount - 挂载表单</h2>}
    >
      <ActionResponse response={response}>
        <button onClick={() => form.onMount()}>挂载表单</button>
      </ActionResponse>
    </Panel>
  );
};

export default OnFormMount;
