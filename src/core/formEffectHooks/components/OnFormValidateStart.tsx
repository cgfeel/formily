import { createForm, onFormValidateStart } from "@formily/core";
import { FC, useMemo, useState } from "react";
import ActionResponse from "../../ActionResponse";
import Panel from "../Panel";
import { onValidateEffects } from "../action";

const OnFormValidateStart: FC = () => {
  const [response, setResponse] = useState("");
  const form = useMemo(
    () =>
      createForm({
        effects: () => {
          onValidateEffects();
          onFormValidateStart(() => {
            setResponse("表单校验开始");
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
            <li>onFormValidateStart</li>
            <li>onValidator {"<--"} 开始校验</li>
            <li>onFormValidateEnd</li>
            <li>onFormValidateSuccess</li>
          </ol>
          <p>无论结果如何，验证时都会触发</p>
        </div>
      }
      header={<h2>onFormValidateStart - 监听表单校验开始</h2>}
    >
      <ActionResponse response={response}>
        <button
          onClick={() => {
            form.createField({
              name: "input",
              validator: () => {
                console.log("onValidator");
                return true;
              },
            });
            form.validate();
          }}
        >
          Submit
        </button>
      </ActionResponse>
    </Panel>
  );
};

export default OnFormValidateStart;
