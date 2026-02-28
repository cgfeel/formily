import { FC } from "react";
import TabsPannel, { TabsPannelProps } from "./component/TabsPannel";
import NormalJson from "./component/NormalJson";
import PhoneJson from "./component/PhoneJson";

const items: TabsPannelProps["items"] = [
  {
    children: <NormalJson />,
    key: "1",
    label: "账号登录",
  },
  {
    children: <PhoneJson />,
    key: "2",
    label: "手机登录",
  },
];

const JsonSchema: FC = () => (
  <TabsPannel
    footer={
      <p>
        包含：<code>SchemaField</code>.<code>schema</code>，使用JSON配置表单验证及其优点
      </p>
    }
    header={
      <h2>
        通过<code>Json Schema</code>创建登录
      </h2>
    }
    items={items}
  />
);

export default JsonSchema;
