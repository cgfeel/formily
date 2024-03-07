import { FC } from "react";
import NormalMarkup from "./component/NormalMarkup";
import PhoneMarkup from "./component/PhoneMarkup";
import TabsPannel, { TabsPannelProps } from "./component/TabsPannel";

const items: TabsPannelProps["items"] = [
    {
        children: <NormalMarkup />,
        key: "1",
        label: "账号登录",
    },
    {
        children: <PhoneMarkup />,
        key: "2",
        label: "手机登录",
    },
];

const MarkupSchema: FC = () => (
    <TabsPannel
        footer={
            <p>
                包含，验证模式：<code>createForm</code>.<code>validateFirst</code>、字段说明：
                <code>SchemaField.String</code>
                、关联反应：
                <code>SchemaField</code>.<code>reactions</code>
            </p>
        }
        header={
            <h2>
                通过<code>Markup Schema</code>创建登录
            </h2>
        }
        items={items}
    />
);

export default MarkupSchema;
