import { Form, FormInstance } from "antd";
import { ComponentProps, FC, PropsWithChildren, ReactNode } from "react";
import SectionFace from "./SectionFace";

const BaseForm: FC<PropsWithChildren<BaseFormProps>> = ({
  append,
  children,
  form,
  onFormFinish,
  name = "baseForm",
}) => {
  return (
    <Form.Provider onFormFinish={onFormFinish}>
      <Form form={form} name={name} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
        <Form.Item label="部门员工" name="section">
          <SectionFace />
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
  form?: FormInstance;
  name?: string;
}
