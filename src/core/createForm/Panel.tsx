import { IFormLayoutProps, Reset, Submit } from "@formily/antd-v5";
import { IProviderProps } from "@formily/react";
import { Card } from "antd";
import { createStyles, css } from "antd-style";
import { FC, PropsWithChildren, ReactNode } from "react";
import useStylish from "../../components/commonStylish";
import Form from "../../components/form/form";
import FormButtonGroup from "../../components/formButtonGroup/form-button-group";

const useStyles = createStyles(css`
  width: 600px;
  & + & {
    margin-top: 16px;
  }
  & button + button {
    margin-left: 10px;
  }
`);

const PanelIner: FC<PropsWithChildren<PanelInerProps>> = ({ children, form, formProps = {} }) => {
  const { styles } = useStyles();
  return (
    <Card className={styles}>
      <Form {...formProps} form={form}>
        {children}
      </Form>
    </Card>
  );
};

const Panel: FC<PropsWithChildren<PanelProps>> = ({ children, extra, footer, form, header }) => {
  const stylish = useStylish();
  return (
    <div className={stylish.wraper}>
      {header}
      <div className={stylish.pannel}>
        {extra}
        <PanelIner form={form} formProps={{ labelCol: 6 }}>
          {children}
          <FormButtonGroup.FormItem>
            <Submit onSubmit={console.log} onSubmitFailed={console.log}>
              提交
            </Submit>
            <Reset>重置</Reset>
          </FormButtonGroup.FormItem>
        </PanelIner>
      </div>
      {footer}
    </div>
  );
};

interface PanelInerProps extends IProviderProps {
  formProps?: IFormLayoutProps;
}

export interface PanelProps extends Omit<PanelInerProps, "formProps"> {
  footer?: ReactNode;
  header?: ReactNode;
  extra?: ReactNode;
}

export { PanelIner };

export default Panel;
