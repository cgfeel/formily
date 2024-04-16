import { Flex, Segmented } from "antd";
import { FC, lazy, useState } from "react";

const DataPath = lazy(() => import("./items/DataPath"));
const MatchPath = lazy(() => import("./items/MatchPath"));
const MehodCom = lazy(() => import("./items/MethodCom"));
const Property = lazy(() => import("./items/Property"));
const StaticMethod = lazy(() => import("./items/StaticMethod"));

const items = {
    property: <Property />,
    dataPath: <DataPath />,
    matchPath: <MatchPath />,
    method: <MehodCom />,
    staticMethod: <StaticMethod />,
};

const FormPath: FC = () => {
    const [key, setKey] = useState<ItemKey>("property");
    const Component = items[key];
    return (
        <Flex gap={12} vertical>
            <Segmented<ItemKey>
                size="large"
                options={[
                    { value: "property", label: "属性" },
                    { value: "dataPath", label: "数据路径语法" },
                    { value: "matchPath", label: "匹配路径语法" },
                    { value: "method", label: "方法" },
                    { value: "staticMethod", label: " 静态方法" },
                ]}
                onChange={value => setKey(value)}
            />
            {Component}
        </Flex>
    );
};

type ItemKey = keyof typeof items;

export default FormPath;
