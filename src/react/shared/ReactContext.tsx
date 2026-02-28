import { createForm } from "@formily/core";
import { FC } from "react";
import Panel from "../Panel";

const form = createForm();

const ReactContext: FC = () => (
  <Panel form={form} header={<h2>context</h2>}>
    <p>
      <code>@formily/react</code> 的所有 <code>React Context</code>
      ，方便用户做更复杂的个性化定制，我们可以通过 <code>useContext</code> 来消费这些上下文
    </p>
    <p>可以通过以下方法了解：</p>
    <ul>
      <li>
        单元测试：<code>./src/__tests__/react/</code>
      </li>
      <li>
        通过 <code>@formily/antd-v5</code> 组件源码：
        <a href="https://github.com/formilyjs/antd/tree/master/packages/components">
          https://github.com/formilyjs/antd/tree/master/packages/components
        </a>
      </li>
    </ul>
  </Panel>
);

export default ReactContext;
