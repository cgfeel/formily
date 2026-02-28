import { FC } from "react";
import Panel from "./Panel";
import { createForm } from "@formily/core";

const form = createForm();

const CoreForm: FC = () => (
  <Panel form={form} header={<h2>Core Models</h2>}>
    <p>
      请通过单元测试了解：<code>./src/__tests__/core/</code>，测试包含：
    </p>
    <ul>
      <li>
        <code>Form</code>
      </li>
      <li>
        <code>Field</code>
      </li>
      <li>
        <code>ArrayField</code>
      </li>
      <li>
        <code>ObjectField</code>
      </li>
      <li>
        <code>VoidField</code>
      </li>
      <li>
        <code>Query</code>
      </li>
    </ul>
    <p>
      测试结果命令行通过 <code> npm run test</code> 查看
    </p>
  </Panel>
);

export default CoreForm;
