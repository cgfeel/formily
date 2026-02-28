import { createForm } from "@formily/core";
import { FC } from "react";
import Panel from "../Panel";

const form = createForm();

const Schema: FC = () => (
  <Panel form={form} header={<h2>Schema</h2>}>
    <p>
      <code>@formily/react</code> 协议驱动最核心的部分，它主要有几个核心能力：
    </p>
    <ul>
      <li>
        解析 <code>json-schema</code> 的能力
      </li>
      <li>
        将 <code>json-schema</code> 转换成 <code>Field Model</code> 的能力
      </li>
      <li>
        编译 <code>json-schema</code> 表达式的能力
      </li>
    </ul>
    <p>可以通过以下方法了解：</p>
    <ul>
      <li>
        单元测试：<code>./src/__tests__/react/</code>
      </li>
      <li>
        通过文档：
        <a href="https://react.formilyjs.org/zh-CN/api/shared/schem">
          https://react.formilyjs.org/zh-CN/api/shared/schem
        </a>
      </li>
    </ul>
  </Panel>
);

export default Schema;
