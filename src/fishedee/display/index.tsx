import { createForm, onFormInit } from "@formily/core";
import { FormConsumer } from "@formily/react";
import { Space } from "antd";
import { FC } from "react";
import Wrapper from "../fieldAction/Wrapper";
import Button from "./Button";

const form = createForm({
  values: {
    name: 123,
    name2: 321,
  },
  effects: () => {
    onFormInit(form => {
      form.createField({ name: "name" });
      form.createField({ name: "name2" });
    });
  },
});

const Display: FC = () => {
  return (
    <Wrapper form={form} header={<h2>Core.2 展示状态</h2>}>
      <Space>
        <Button name="name" type="none" form={form} />
        <Button name="name2" form={form} />
      </Space>
      <code className="consumer">
        <pre>
          <FormConsumer>{form => JSON.stringify(form.values, null, 2)}</FormConsumer>
        </pre>
      </code>
    </Wrapper>
  );
};

export default Display;
