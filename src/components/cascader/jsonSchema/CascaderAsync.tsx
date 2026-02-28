import { createForm } from "@formily/core";
import { ISchema } from "@formily/react";
import { FC } from "react";
import { fetchAddress } from "../../register/action";
import Panel from "../Panel";
import SchemaField from "../SchemaField";

const form = createForm();
const schema: ISchema = {
  type: "object",
  properties: {
    cascader: {
      required: true,
      title: "选择框",
      type: "string",
      "x-component": "Cascader",
      "x-decorator": "FormItem",
      "x-reactions": "{{fetchAddress}}",
    },
  },
};

const CascaderAsync: FC = () => (
  <Panel
    form={form}
    header={
      <h2>
        <code>Json Schema</code> 异步数据源案例
      </h2>
    }
  >
    <SchemaField schema={schema} scope={{ fetchAddress }} />
  </Panel>
);

export default CascaderAsync;
