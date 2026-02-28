import { createForm } from "@formily/core";
import { ISchema } from "@formily/react";
import { FC } from "react";
import Pannel from "./Pannel";
import SchemaField from "./SchemaField";
import { effects } from "./component/ArrayObject";
import { array, array_unshift, string_array } from "./fields";

const form = createForm({
  validateFirst: true,
  effects,
});

const schema: ISchema = {
  type: "object",
  properties: {
    string_array,
    array,
    array_unshift,
  },
};

const JsonSchema: FC = () => (
  <Pannel
    form={form}
    header={
      <h2>
        通过<code>Json Schema</code>创建自增折叠表单
      </h2>
    }
  >
    <SchemaField schema={schema} />
  </Pannel>
);

export default JsonSchema;
