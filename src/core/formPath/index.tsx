import { Flex, Segmented } from "antd";
import { FC, lazy, useState } from "react";

const DataPath = lazy(() => import("./items/DataPath"));
const MatchPath = lazy(() => import("./items/MatchPath"));
const MehodCom = lazy(() => import("./items/MethodCom"));

const items = {
    dataPath: <DataPath />,
    matchPath: <MatchPath />,
    method: <MehodCom />,
};

const FormPath: FC = () => {
    const [key, setKey] = useState<ItemKey>("dataPath");
    const Component = items[key];
    return (
        <Flex gap={12} vertical>
            <Segmented<ItemKey>
                defaultValue="dataPath"
                size="large"
                options={[
                    { value: "dataPath", label: "数据路径语法" },
                    { value: "matchPath", label: "匹配路径语法" },
                    { value: "method", label: "方法" },
                ]}
                onChange={value => setKey(value)}
            />
            {Component}
        </Flex>
    );
};

type ItemKey = keyof typeof items;

export default FormPath;
