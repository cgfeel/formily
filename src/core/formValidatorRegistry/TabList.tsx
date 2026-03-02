import pathList from "@/routers/pathList";
import { Button, Flex, Space } from "antd";
import { FC, PropsWithChildren } from "react";
import { Link, useLocation, useNavigate } from "react-router";

const TabListTips: FC = () => (
  <p>
    由于当前所有的配置都是页面顶层，避免演示过程中 SPA 对页面的缓存，所以采用单独链接的方式打开页面
    [ <Link to={{ pathname: "/core" }}>返回 Core Library</Link>]
  </p>
);

const TabList: FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <Flex gap={12} vertical>
      <TabListTips />
      <Space>
        {pathList
          .filter(({ hidden }) => hidden)
          .map(({ name, url }) => (
            <Button
              key={url}
              disabled={url === location.pathname}
              onClick={() => {
                navigate(url);
              }}
            >
              {name}
            </Button>
          ))}
      </Space>
      {children}
    </Flex>
  );
};

export { TabListTips };

export default TabList;
