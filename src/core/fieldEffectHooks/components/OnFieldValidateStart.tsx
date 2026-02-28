import { createForm, onFieldValidateStart } from "@formily/core";
import { FC, useMemo, useState } from "react";
import ActionResponse from "../../ActionResponse";
import Panel from "../Panel";
import { onValidateEffects } from "../action";

const OnFieldValidateStart: FC = () => {
  const [response, setResponse] = useState("");
  const form = useMemo(
    () =>
      createForm({
        effects: () => {
          onValidateEffects("target");
          onFieldValidateStart("target", () => {
            setResponse("target校验开始");
          });
        },
      }),
    [setResponse],
  );
  return (
    <Panel
      footer={
        <div>
          <p>字段触发验证不会冒泡到表单发起表单验证，字段验证时每次都触发，顺序如下：</p>
          <ol>
            <li>onFieldValidateStart</li>
            <li>onValidate</li>
            <li>onFieldValidateEnd</li>
            <li>onFieldValidateSuccess {"<--"} 验证成功触发</li>
          </ol>
        </div>
      }
      header={<h2>onFieldValidateStart - 监听某个字段校验触发开始</h2>}
    >
      <ActionResponse response={response}>
        <button
          onClick={() => {
            const field = form.createField({
              name: "target",
              validator: () => {
                console.log("onValidate");
                return true;
              },
            });
            field.onInput((field.value || 0) + 1);
          }}
        >
          触发验证
        </button>
      </ActionResponse>
    </Panel>
  );
};

export default OnFieldValidateStart;
