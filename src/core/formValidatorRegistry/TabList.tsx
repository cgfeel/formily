import { FC, PropsWithChildren } from "react";
import registerList from "./list";
import { Button, Flex, Space } from "antd";

const objectKeys = <T extends object, K = keyof T>(obj: T) => Object.keys(obj) as Array<K>;
const TabListTips: FC = () => (
    <p>
        由于当前所有的配置都是页面顶层，避免演示过程中 SPA 对页面的缓存，所以采用单独链接的方式打开页面 [{" "}
        <a href="/core">返回 Core Library</a>]
    </p>
);

const TabList: FC<PropsWithChildren> = ({ children }) => (
    <Flex gap={12} vertical>
        <TabListTips />
        <Space>
            {objectKeys(registerList).map(key => (
                <Button
                    key={key}
                    disabled={key === window.location.pathname}
                    onClick={() => {
                        window.location.pathname = key;
                    }}>
                    {registerList[key].name}
                </Button>
            ))}
        </Space>
        {children}
    </Flex>
);

export { TabListTips };

export default TabList;
