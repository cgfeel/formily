import { Flex, Segmented } from "antd";
import { FC, useState } from "react";
import OnFieldChange from "./components/OnFieldChange";
import OnFieldInit from "./components/OnFieldInit";
import OnFieldInitialValueChange from "./components/OnFieldInitialValueChange";
import OnFieldInputValueChange from "./components/OnFieldInputValueChange";
import OnFieldMount from "./components/OnFieldMount";
import OnFieldReact from "./components/OnFieldReact";
import OnFieldUnmount from "./components/OnFieldUnmount";
import OnFieldValidateEnd from "./components/OnFieldValidateEnd";
import OnFieldValidateFailed from "./components/OnFieldValidateFailed";
import OnFieldValidateStart from "./components/OnFieldValidateStart";
import OnFieldValueChange from "./components/OnFieldValueChange";
import OnFieldValidateSuccess from "./components/OnFieldValidateSuccess";

const items = {
    init: (
        <>
            <OnFieldInit />
            <OnFieldMount />
            <OnFieldUnmount />
        </>
    ),
    change: (
        <>
            <OnFieldReact />
            <OnFieldChange />
            <OnFieldValueChange />
            <OnFieldInitialValueChange />
            <OnFieldInputValueChange />
        </>
    ),
    validate: (
        <>
            <OnFieldValidateStart />
            <OnFieldValidateEnd />
            <OnFieldValidateFailed />
            <OnFieldValidateSuccess />
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
                options={[
                    { value: "init", label: "初始化" },
                    { value: "change", label: "修改字段" },
                    { value: "validate", label: "字段验证" },
                ]}
                onChange={value => setKey(value)}
            />
            {Component}
        </Flex>
    );
};

type ItemKey = keyof typeof items;

export default FieldEffectHooks;
