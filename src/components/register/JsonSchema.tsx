import { createForm } from "@formily/core";
import { FC } from "react";
import SchemaField from "./SchemaField";
import Pannel from "./components/Pannel";
import { schema } from "./components/service";

const form = createForm({
  validateFirst: true,
});

const JsonSchema: FC = () => (
  <Pannel
    footer={
      <p>
        在<code>Json Schema</code>配置信息中是没有办法通过<code>antd-style</code>
        设置组件样式，这里通过
        <code>@emotion/styled</code>的<code>styled</code>包括要设置样式组件解决问题
      </p>
    }
    form={form}
    header={
      <h2>
        通过<code>Json Schema</code>创建注册
      </h2>
    }
  >
    <SchemaField schema={schema} />
  </Pannel>
);

export default JsonSchema;
