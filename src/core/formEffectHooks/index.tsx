import { Flex, Segmented } from "antd";
import { FC, useState } from "react";
import OnFormInit from "./components/OnFormInit";
import OnFormInitialValuesChange from "./components/OnFormInitialValuesChange";
import OnFormInput from "./components/OnFormInputChange";
import OnFormMount from "./components/OnFormMount";
import OnFormReact from "./components/OnFormReact";
import OnFormSubmit from "./components/OnFormSubmit";
import OnFormSubmitEnd from "./components/OnFormSubmitEnd";
import OnFormSubmitFailed from "./components/OnFormSubmitFailed";
import OnFormSubmitStart from "./components/OnFormSubmitStart";
import OnFormSubmitSuccess from "./components/OnFormSubmitSuccess";
import OnFormSubmitValidateEnd from "./components/OnFormSubmitValidateEnd";
import OnFormSubmitValidateFailed from "./components/OnFormSubmitValidateFailed";
import OnFormSubmitValidateStart from "./components/OnFormSubmitValidateStart";
import OnFormSubmitValidateSuccess from "./components/OnFormSubmitValidateSuccess";
import OnFormUnmount from "./components/OnFormUnmount";
import OnFormValidateEnd from "./components/OnFormValidateEnd";
import OnFormValidateFailed from "./components/OnFormValidateFailed";
import OnFormValidateStart from "./components/OnFormValidateStart";
import OnFormValidateSuccess from "./components/OnFormValidateSuccess";
import OnFormValuesChange from "./components/OnFormValueChange";

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
      <OnFormSubmitStart />
      <OnFormSubmitEnd />
      <OnFormSubmitFailed />
      <OnFormSubmitSuccess />
      <OnFormSubmitValidateStart />
      <OnFormSubmitValidateEnd />
      <OnFormSubmitValidateFailed />
      <OnFormSubmitValidateSuccess />
    </>
  ),
  validate: (
    <>
      <OnFormValidateStart />
      <OnFormValidateEnd />
      <OnFormValidateFailed />
      <OnFormValidateSuccess />
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
          { value: "validate", label: "表单验证" },
        ]}
        onChange={value => setKey(value)}
      />
      {Component}
    </Flex>
  );
};

type ItemKey = keyof typeof items;

export default FormEffectHooks;
