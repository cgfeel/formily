import { createForm, onFormSubmit } from "@formily/core";
import { FC, useMemo, useState } from "react";
import ActionResponse from "../../ActionResponse";
import Panel from "../Panel";
import { onSubmitEffects, onSubmitPromise } from "../action";

const OnFormSubmit: FC = () => {
  const [response, setResponse] = useState("");
  const form = useMemo(
    () =>
      createForm({
        effects: () => {
          onSubmitEffects();
          onFormSubmit(() => {
            setResponse("表单已提交");
          });
        },
      }),
    [setResponse],
  );

  return (
    <Panel
      footer={
        <div>
          <p>点击按钮在控制面板查看执行顺序，如下：</p>
          <ol>
            <li>onFormSubmitStart</li>
            <li>onFormSubmitValidateStart {"<--"} 开始校验</li>
            <li>onFormSubmitValidateSuccess</li>
            <li>onFormSubmitValidateEnd</li>
            <li>onSubmitPromise {"<--"} 开始执行异步提交，完成后继续执行</li>
            <li>onFormSubmitSuccess</li>
            <li>onFormSubmitEnd</li>
            <li>onFormSubmit</li>
          </ol>
          <p>无论提交结果如何，提交时都会触发</p>
        </div>
      }
      header={<h2>onFormSubmit - 监听表单提交</h2>}
    >
      <ActionResponse response={response}>
        <button onClick={() => form.submit(onSubmitPromise)}>Submit</button>
      </ActionResponse>
    </Panel>
  );
};

export default OnFormSubmit;
