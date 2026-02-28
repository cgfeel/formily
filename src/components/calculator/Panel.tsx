import { Submit } from "@formily/antd-v5";
import { IProviderProps } from "@formily/react";
import { Card } from "antd";
import { FC, PropsWithChildren, ReactNode } from "react";
import useStylish from "../commonStylish";
import Form from "../form/form";
import FormButtonGroup from "../formButtonGroup/form-button-group";

const Panel: FC<PropsWithChildren<PanelProps>> = ({ children, footer, form, header }) => {
  const stylish = useStylish();
  return (
    <div className={stylish.wraper}>
      {header}
      <div className={stylish.pannel}>
        <Card>
          <Form layout="vertical" form={form}>
            {children}
            <FormButtonGroup>
              <Submit onSubmit={console.log} onSubmitFailed={console.log}>
                提交
              </Submit>
            </FormButtonGroup>
          </Form>
        </Card>
      </div>
      {footer}
    </div>
  );
};

export interface PanelProps extends IProviderProps {
  footer?: ReactNode;
  header?: ReactNode;
}

export default Panel;
