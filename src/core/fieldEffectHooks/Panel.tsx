import { Card } from "antd";
import { createStyles, css } from "antd-style";
import { FC, PropsWithChildren, ReactNode } from "react";
import useStylish from "../../components/commonStylish";

const useStyles = createStyles(css`
    width: 600px;
`);

const Panel: FC<PropsWithChildren<PanelProps>> = ({ children, footer, header }) => {
    const { styles } = useStyles();
    const stylish = useStylish();
    return (
        <div className={stylish.wraper}>
            {header}
            <div className={stylish.pannel}>
                <Card className={styles}>{children}</Card>
            </div>
            {footer}
        </div>
    );
};

export interface PanelProps {
    footer?: ReactNode;
    header?: ReactNode;
}

export default Panel;
