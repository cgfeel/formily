import { createForm, onFormSubmitValidateStart } from "@formily/core";
import { FC, useMemo, useState } from "react";
import ActionResponse from "../../ActionResponse";
import Panel from "../Panel";
import { onSubmitEffects, onSubmitPromise } from "../action";

const OnFormSubmitValidateStart: FC = () => {
  const [response, setResponse] = useState("");
  const form = useMemo(
    () =>
      createForm({
        effects: () => {
          onSubmitEffects();
          onFormSubmitValidateStart(() => {
            setResponse("表单提交校验开始");
          });
        },
      }),
    [setResponse],
  );

  return (
    <Panel
      footer={
        <p>
          点击按钮在控制面板查看执行顺序，执行顺序和 <code>onFormSubmit</code>{" "}
          一样，无论提交结果如何，提交时都会触发
        </p>
      }
      header={<h2>onFormSubmitValidateStart - 监听表单提交过程的字段校验开始</h2>}
    >
      <ActionResponse response={response}>
        <button onClick={() => form.submit(onSubmitPromise)}>Submit</button>
      </ActionResponse>
    </Panel>
  );
};

export default OnFormSubmitValidateStart;
