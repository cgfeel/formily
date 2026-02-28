import { IProviderProps } from "@formily/react";
import { Card } from "antd";
import { createStyles, css } from "antd-style";
import { FC, PropsWithChildren } from "react";
import Wraper, { WraperProps } from "./Wraper";

const useStyles = createStyles(css`
  width: 600px;
`);

const Panel: FC<PropsWithChildren<PanelProps>> = ({ children, footer, form, header }) => {
  const { styles } = useStyles();
  return (
    <Wraper form={form} footer={footer} header={header}>
      <Card className={styles}>{children}</Card>
    </Wraper>
  );
};

export interface PanelProps extends IProviderProps, WraperProps {}

export default Panel;
