import { FC } from "react";
import MarkupSchema from "../../../components/validate/customRules/MarkupSchema";
import TabList from "../TabList";

const RegisterValidateRules: FC = () => (
  <TabList>
    <MarkupSchema
      footer={
        <p>
          注册通用校验规则，目前内置规则库参考：
          <a href="https://github.com/alibaba/formily/blob/master/packages/validator/src/rules.ts">
            rules.ts
          </a>
        </p>
      }
    />
  </TabList>
);

export default RegisterValidateRules;
