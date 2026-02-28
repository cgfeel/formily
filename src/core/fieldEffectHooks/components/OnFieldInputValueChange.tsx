import { createForm, isField, onFieldInputValueChange } from "@formily/core";
import { FC, useMemo, useState } from "react";
import ActionResponse from "../../ActionResponse";
import Panel from "../Panel";

const OnFieldInputValueChange: FC = () => {
  const [response, setResponse] = useState("");
  const form = useMemo(
    () =>
      createForm({
        effects: () => {
          onFieldInputValueChange("target", field => {
            isField(field) && setResponse("target 值变化：" + field.value);
          });
        },
      }),
    [setResponse],
  );
  return (
    <Panel header={<h2>onFieldInputValueChange - 监听某个字段 onInput 触发</h2>}>
      <ActionResponse response={response}>
        <button
          onClick={() => {
            const field = form.createField({ name: "target" });
            field.onInput((field.value || 0) + 1);
          }}
        >
          调用 onInput
        </button>
      </ActionResponse>
    </Panel>
  );
};

export default OnFieldInputValueChange;
