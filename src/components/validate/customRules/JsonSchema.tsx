import { createForm, registerValidateRules } from "@formily/core";
import { ISchema } from "@formily/react";
import { FC } from "react";
import Panel from "../Panel";
import SchemaField from "../SchemaField";
import { schemaRules } from "../data/customRule";
import { validateRules } from "../data/validateRules";

registerValidateRules(validateRules);

const form = createForm();
const schema: ISchema = {
  type: "object",
  properties: schemaRules,
};

const JsonSchema: FC = () => (
  <Panel
    footer={
      <p>
        和文档不同的是，局部注册验证方法我是通过追加 <code>scope</code>{" "}
        动态实现的，这样在验证时只要添加对应的 <code>scope properties</code> 即可，这样写{" "}
        <code>Json Schema</code> 更优雅。为了验证动态添加的局域注册验证，这里将验证名称全部都改名。
      </p>
    }
    form={form}
    header={
      <h2>
        自定义规则校验 - <code>Json Schema</code>
      </h2>
    }
  >
    <SchemaField
      schema={schema}
      scope={{
        validator_1: validateRules.global_1,
        validator_2: validateRules.global_2,
        validator_3: validateRules.global_3,
        validator_4: validateRules.global_4,
      }}
    />
  </Panel>
);

export default JsonSchema;
