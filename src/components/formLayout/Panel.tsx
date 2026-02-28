import { FormButtonGroup, IFormItemProps, Submit } from "@formily/antd-v5";
import { FormProvider, IProviderProps } from "@formily/react";
import { Card } from "antd";
import { createStyles, css } from "antd-style";
import { FC, PropsWithChildren, ReactNode } from "react";
import useStylish from "../commonStylish";

const useStyles = createStyles(css`
  width: 600px;
`);

const Panel: FC<PropsWithChildren<PanelProps>> = ({
  buttonItem,
  children,
  footer,
  form,
  header,
}) => {
  const { styles } = useStyles();
  const stylish = useStylish();
  return (
    <div className={stylish.wraper}>
      {header}
      <div className={stylish.pannel}>
        <Card className={styles}>
          <FormProvider form={form}>
            {children}
            <FormButtonGroup.FormItem {...buttonItem}>
              <Submit onSubmit={console.log} onSubmitFailed={console.log} block>
                提交
              </Submit>
            </FormButtonGroup.FormItem>
          </FormProvider>
        </Card>
      </div>
      {footer}
    </div>
  );
};

export interface PanelProps extends IProviderProps {
  buttonItem?: IFormItemProps;
  footer?: ReactNode;
  header?: ReactNode;
}

export default Panel;
