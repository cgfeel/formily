import { FC, useState } from "react";
import OnFormInit from "./components/OnFormInit";
import OnFormInitialValuesChange from "./components/OnFormInitialValuesChange";
import OnFormInput from "./components/OnFormInputChange";
import OnFormMount from "./components/OnFormMount";
import OnFormReact from "./components/OnFormReact";
import OnFormSubmit from "./components/OnFormSubmit";
import OnFormUnmount from "./components/OnFormUnmount";
import OnFormValuesChange from "./components/OnFormValueChange";
import { Flex, Segmented } from "antd";

const items = {
    init: (
        <>
            <OnFormInit />
            <OnFormMount />
            <OnFormUnmount />
        </>
    ),
    edit: (
        <>
            <OnFormReact />
            <OnFormValuesChange />
            <OnFormInitialValuesChange />
            <OnFormInput />
        </>
    ),
    submit: (
        <>
            <OnFormSubmit />
        </>
    ),
};

const FormEffectHooks: FC = () => {
    const [key, setKey] = useState<ItemKey>("init");
    const Component = items[key];
    return (
        <Flex gap={12} vertical>
            <Segmented<ItemKey>
                defaultValue="init"
                size="large"
                options={[
                    { value: "init", label: "初始化" },
                    { value: "edit", label: "修改表单" },
                    { value: "submit", label: "表单提交" },
                ]}
                onChange={value => setKey(value)}
            />
            {Component}
        </Flex>
    );
};

type ItemKey = keyof typeof items;

export default FormEffectHooks;
