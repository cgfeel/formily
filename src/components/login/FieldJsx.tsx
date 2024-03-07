import { FC } from "react";
import NormalJsx from "./component/NormalJsx";
import PhoneJsx from "./component/PhoneJsx";
import TabsPannel, { TabsPannelProps } from "./component/TabsPannel";

const items: TabsPannelProps["items"] = [
    {
        children: <NormalJsx />,
        key: "1",
        label: "账号登录",
    },
    {
        children: <PhoneJsx />,
        key: "2",
        label: "手机登录",
    },
];

const FieldJsx: FC = () => (
    <TabsPannel
        footer={
            <p>
                包括：<code>jsx</code>和<code>schema</code>的不同，以及优缺点
            </p>
        }
        header={
            <h2>
                通过<code>Jsx</code>创建登录
            </h2>
        }
        items={items}
    />
);

export default FieldJsx;
