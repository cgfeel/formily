import { ISubmitProps, Submit } from "@formily/antd-v5";
import { IProviderProps } from "@formily/react";
import { Card } from "antd";
import { createStyles, css } from "antd-style";
import { FC, PropsWithChildren, ReactNode } from "react";
import useStylish from "../commonStylish";
import Form from "../form/form";
import FormButtonGroup from "../formButtonGroup/form-button-group";
import { IFormLayoutProps } from "../formLayout/form-layout";

const useStyles = createStyles(css`
  width: 600px;
`);

const Panel: FC<PropsWithChildren<PanelProps>> = ({
  children,
  consumer,
  footer,
  form,
  header,
  labelCol = 6,
  submit = {},
}) => {
  const { onSubmit, ...submitProps } = submit;
  const { styles } = useStyles();
  const stylish = useStylish();
  return (
    <div className={stylish.wraper}>
      {header}
      <div className={stylish.pannel}>
        <Card className={styles}>
          <Form form={form} labelCol={labelCol}>
            {children}
            <FormButtonGroup.FormItem>
              <Submit
                {...submitProps}
                onSubmit={onSubmit || console.log}
                onSubmitFailed={console.log}
              >
                提交
              </Submit>
            </FormButtonGroup.FormItem>
            {consumer}
          </Form>
        </Card>
      </div>
      {footer}
    </div>
  );
};

export interface PanelProps extends IProviderProps {
  consumer?: ReactNode;
  footer?: ReactNode;
  header?: ReactNode;
  labelCol?: IFormLayoutProps["labelCol"];
  submit?: Omit<ISubmitProps, "children" | "onSubmitFailed">;
}

export default Panel;
