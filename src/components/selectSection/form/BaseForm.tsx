import { Form, Input } from "antd";
import { ComponentProps, FC, PropsWithChildren, ReactNode } from "react";
import SectionFace from "./SectionFace";

const BaseForm: FC<PropsWithChildren<BaseFormProps>> = ({ append, children, onFormFinish }) => {
  return (
    <Form.Provider onFormFinish={onFormFinish}>
      <Form name="baseForm" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
        <SectionFace />
        <Form.Item label="参与成员" name="section">
          <Input />
        </Form.Item>
        <Form.Item colon={false} label={` `}>
          {append}
        </Form.Item>
      </Form>
      {children}
    </Form.Provider>
  );
};

export default BaseForm;

interface BaseFormProps extends Pick<ComponentProps<typeof Form.Provider>, "onFormFinish"> {
  append?: ReactNode;
}
