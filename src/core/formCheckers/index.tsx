import { Flex, Segmented } from "antd";
import { FC, useState } from "react";
import StateChecker from "./StateChecker";
import TargetChecker from "./TargetChecker";

const items = {
  target: <TargetChecker />,
  state: <StateChecker />,
};

const FormChecker: FC = () => {
  const [key, setKey] = useState<ItemKey>("target");
  const Component = items[key];
  return (
    <Flex gap={12} vertical>
      <Segmented<ItemKey>
        defaultValue="target"
        size="large"
        options={[
          { value: "target", label: "对象检查" },
          { value: "state", label: "状态检查" },
        ]}
        onChange={setKey}
      />
      {Component}
    </Flex>
  );
};

type ItemKey = keyof typeof items;

export default FormChecker;
