import { createForm } from "@formily/core";
import { FC } from "react";
import Panel from "../../Panel";
import { ArrayField } from "@formily/react";
import ArrayFieldTypeCom from "./ArrayFieldTypeCom";

const form = createForm();

const RenderProps: FC = () => (
  <Panel
    footer={
      <div>
        <p>
          将函数作为 <code>children props</code> 取代 <code>component props</code>
          ，无论哪种方式如果需要将受控的组件分离出去，一定需要使用 <code>observer</code> 进行受控
        </p>
      </div>
    }
    form={form}
    header={<h2>RenderProps</h2>}
  >
    <ArrayField name="array">{field => <ArrayFieldTypeCom field={field} />}</ArrayField>
  </Panel>
);

export default RenderProps;
