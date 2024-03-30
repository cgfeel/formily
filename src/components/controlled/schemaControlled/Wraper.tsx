import { Card } from "antd";
import { createStyles } from "antd-style";
import { FC, PropsWithChildren } from "react";
import Panel, { PanelProps } from "../Panel";

const useStyles = createStyles(
    ({ prefixCls, css }) => css`
        width: 600px;
        & .${prefixCls}-space {
            margin-bottom: 20px;
        }
    `,
);

const Wraper: FC<PropsWithChildren<WraperProps>> = ({ children, ...props }) => {
    const { styles } = useStyles();
    return (
        <Panel {...props}>
            <Card className={styles}>{children}</Card>
        </Panel>
    );
};

export interface WraperProps extends PanelProps {}

export default Wraper;
