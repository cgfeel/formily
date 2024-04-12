import { Flex, Segmented } from "antd";
import { FC, useState } from "react";
import Deconstruct from "./components/Deconstruct";
import Dot from "./components/Dot";
import Relative from "./components/Relative";
import Subscript from "./components/Subscript";

const items = {
    dataPath: (
        <>
            <Dot />
            <Subscript />
            <Deconstruct />
            <Relative />
        </>
    ),
    matchPath: <>matchPath</>,
    method: <>method</>,
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
