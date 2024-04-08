import { Flex, Segmented } from "antd";
import { FC, useState } from "react";
import OnFieldInit from "./components/OnFieldInit";

const items = {
    init: (
        <>
            <OnFieldInit />
        </>
    ),
};

const FieldEffectHooks: FC = () => {
    const [key, setKey] = useState<ItemKey>("init");
    const Component = items[key];
    return (
        <Flex gap={12} vertical>
            <Segmented<ItemKey>
                defaultValue="init"
                size="large"
                options={[{ value: "init", label: "初始化" }]}
                onChange={value => setKey(value)}
            />
            {Component}
        </Flex>
    );
};

type ItemKey = keyof typeof items;

export default FieldEffectHooks;
