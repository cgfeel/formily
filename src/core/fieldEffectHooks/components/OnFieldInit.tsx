import { createForm, onFieldInit } from "@formily/core";
import { FC, useMemo, useState } from "react";
import ActionResponse from "../../ActionResponse";
import Panel from "../Panel";

const OnFieldInit: FC = () => {
  const [response, setResponse] = useState("");
  const form = useMemo(
    () =>
      createForm({
        effects: () => {
          onFieldInit("target", () => setResponse("字段已初始化"));
        },
      }),
    [setResponse],
  );
  return (
    <Panel
      footer={
        <div>
          <p>
            用于监听某个字段初始化的副作用钩子，我们在调用 <code>createField</code>{" "}
            的时候就会触发字段初始化事件
          </p>
          <p>
            可以重复创建字段 <code>createField</code>，<code>formily</code> 会自动处理，
            <code>onFieldInit</code> 不会重复触发
          </p>
        </div>
      }
      header={<h2>onFieldInit - 字段初始化</h2>}
    >
      <ActionResponse response={response}>
        <button onClick={() => form.createField({ name: "target" })}>创建字段</button>
      </ActionResponse>
    </Panel>
  );
};

export default OnFieldInit;
