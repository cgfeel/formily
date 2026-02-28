import { Card } from "antd";
import { createStyles, css } from "antd-style";
import { FC, PropsWithChildren } from "react";

const useStyles = createStyles(css`
  & + & {
    margin-top: 16px;
  }
`);

const Line: FC<PropsWithChildren<LineProps>> = ({ children, tips }) => {
  const { styles } = useStyles();
  return (
    <Card className={styles} title={tips}>
      {children}
    </Card>
  );
};

export interface LineProps {
  tips: string;
}

export default Line;
