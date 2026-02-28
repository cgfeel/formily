import { Card, Tabs, TabsProps } from "antd";
import { createStyles } from "antd-style";
import { FC, ReactNode } from "react";
import useStylish from "../../commonStylish";

const useStyles = createStyles({
  card: {
    width: 400,
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
  },
  tabs: {
    marginTop: -10,
    overflow: "visible",
  },
});

const TabsPannel: FC<TabsPannelProps> = ({ footer, header, items }) => {
  const { styles } = useStyles();
  const stylish = useStylish();
  return (
    <div className={stylish.wraper}>
      {header}
      <div className={stylish.pannel}>
        <Card className={styles.card}>
          <Tabs className={styles.tabs} items={items} />
          <div className={styles.footer}>
            <a href="#新用户注册">新用户注册</a>
            <a href="#忘记密码">忘记密码？</a>
          </div>
        </Card>
      </div>
      {footer}
    </div>
  );
};

export interface TabsPannelProps extends TabsProps {
  footer?: ReactNode;
  header?: ReactNode;
}

export default TabsPannel;
