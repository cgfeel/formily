import { Form, FormButtonGroup, FormProps, Submit } from "@formily/antd-v5";
import { Card } from "antd";
import { createStyles, css } from "antd-style";
import { FC, PropsWithChildren, ReactNode } from "react";
import useStylish from "../commonStylish";

const useStyles = createStyles(css`
  width: 600px;
`);

const Panel: FC<PropsWithChildren<PanelProps>> = ({
  children,
  footer,
  form,
  header,
  onAutoSubmit = console.log,
  onAutoSubmitFailed = console.log,
}) => {
  const { styles } = useStyles();
  const stylish = useStylish();
  return (
    <div className={stylish.wraper}>
      {header}
      <div className={stylish.pannel}>
        <Card className={styles}>
          <Form
            labelCol={6}
            wrapperCol={16}
            form={form}
            onAutoSubmit={onAutoSubmit}
            onAutoSubmitFailed={onAutoSubmitFailed}
          >
            {children}
            <FormButtonGroup.FormItem>
              <Submit block>提交</Submit>
            </FormButtonGroup.FormItem>
          </Form>
        </Card>
      </div>
      {footer}
    </div>
  );
};

export interface PanelProps extends Omit<FormProps, "labelCol" | "wrapperCol"> {
  footer?: ReactNode;
  header?: ReactNode;
}

export default Panel;
