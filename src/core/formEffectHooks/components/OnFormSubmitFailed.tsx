import { createForm, onFormSubmitFailed } from "@formily/core";
import { FC, useMemo, useState } from "react";
import ActionResponse from "../../ActionResponse";
import Panel from "../Panel";
import { onSubmitEffects, onSubmitPromise, onSubmitPromiseFailed } from "../action";

const OnFormSubmitFailed: FC = () => {
  const [response, setResponse] = useState("");
  const form1 = useMemo(
    () =>
      createForm({
        effects: () => {
          onSubmitEffects();
          onFormSubmitFailed(() => {
            setResponse("表单提交失败");
          });
        },
      }),
    [setResponse],
  );
  const form2 = useMemo(
    () =>
      createForm({
        effects: () => {
          onSubmitEffects();
          onFormSubmitFailed(() => {
            setResponse("表单校验失败");
          });
        },
      }),
    [setResponse],
  );

  return (
    <Panel
      footer={
        <div>
          <p>只有提交失败才能触发</p>
          <p>
            <code>Runtime Error</code>执行顺序如下：
          </p>
          <ol>
            <li>onFormSubmitStart</li>
            <li>onFormSubmitValidateStart {"<--"} 开始校验</li>
            <li>onFormSubmitValidateSuccess</li>
            <li>onFormSubmitValidateEnd</li>
            <li>onSubmitPromise {"<--"} 开始执行异步提交，完成后继续执行</li>
            <li>onFormSubmitEnd</li>
            <li>onFormSubmitFailed {"<--"} 异步提交错误返回</li>
            <li>onFormSubmit</li>
            <li>Runtime Error {"<--"} 捕获错误</li>
          </ol>
          <p>
            <code>Validate Error</code>执行顺序如下：
          </p>
          <ol>
            <li>onFormSubmitStart</li>
            <li>onFormSubmitValidateStart {"<--"} 开始校验</li>
            <li>onFormSubmitValidateFailed</li>
            <li>onFormSubmitValidateEnd</li>
            <li>onFormSubmitEnd {"<--"} 跳过了onSubmitPromise</li>
            <li>onFormSubmitFailed {"<--"} 提交错误返回</li>
            <li>onFormSubmit</li>
            <li>Validate Error {"<--"} 捕获错误</li>
          </ol>
          <p>
            提交错误和验证错误都会触发 <code>onFormSubmitFailed</code>，为了做区分验证错误建议通过{" "}
            <code>onFormSubmitValidateFailed</code>
          </p>
        </div>
      }
      header={<h2>onFormSubmitFailed - 监听表单提交失败</h2>}
    >
      <ActionResponse response={response}>
        <button
          onClick={() =>
            form1.submit(onSubmitPromiseFailed).catch(info => console.log("Runtime Error", info))
          }
        >
          Submit Runtime Error
        </button>
        <button
          onClick={() => {
            form2.createField({ name: "input", required: true });
            form2.submit(onSubmitPromise).catch(info => console.log("Validate Error", info));
          }}
        >
          Submit Validate Error
        </button>
      </ActionResponse>
    </Panel>
  );
};

export default OnFormSubmitFailed;
