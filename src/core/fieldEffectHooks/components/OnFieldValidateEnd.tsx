import { createForm, onFieldValidateEnd } from "@formily/core";
import { FC, useMemo, useState } from "react";
import ActionResponse from "../../ActionResponse";
import Panel from "../Panel";
import { onValidateEffects } from "../action";

const OnFieldValidateEnd: FC = () => {
  const [response, setResponse] = useState("");
  const form = useMemo(
    () =>
      createForm({
        effects: () => {
          onValidateEffects("target");
          onFieldValidateEnd("target", () => {
            setResponse("target校验结束");
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
            字段验证时每次都触发，顺序和 <code>onFieldValidateStart</code> 一样
          </p>
        </div>
      }
      header={<h2>onFieldValidateEnd - 监听某个字段校验触发结束</h2>}
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

export default OnFieldValidateEnd;
