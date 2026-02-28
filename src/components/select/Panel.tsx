import { Submit } from "@formily/antd-v5";
import { FormProvider, IProviderProps } from "@formily/react";
import { Card } from "antd";
import { createStyles, css } from "antd-style";
import { FC, PropsWithChildren, ReactNode } from "react";
import useStylish from "../commonStylish";
import FormButtonGroup from "../formButtonGroup/form-button-group";
import FormLayout from "../formLayout/form-layout";

const useStyles = createStyles(css`
  width: 600px;
`);

const Panel: FC<PropsWithChildren<PanelProps>> = ({ children, footer, form, header }) => {
  const { styles } = useStyles();
  const stylish = useStylish();
  return (
    <div className={stylish.wraper}>
      {header}
      <div className={stylish.pannel}>
        <Card className={styles}>
          <FormProvider form={form}>
            <FormLayout labelCol={6}>
              {children}
              <FormButtonGroup.FormItem>
                <Submit onSubmit={console.log} onSubmitFailed={console.log}>
                  提交
                </Submit>
              </FormButtonGroup.FormItem>
            </FormLayout>
          </FormProvider>
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
