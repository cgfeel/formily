import { createStyles } from "antd-style";
import { FC, PropsWithChildren, ReactNode } from "react";
import useStylish from "../commonStylish";

const useStyles = createStyles(
    ({ prefixCls, token, css }) => css`
        & .${prefixCls}-card {
            min-width: 600px;
            & + .${prefixCls}-card {
                margin-top: ${token.marginMD}px;
            }
        }
    `,
);

const Panel: FC<PropsWithChildren<PanelProps>> = ({ children, footer, header }) => {
    const { styles, cx } = useStyles();
    const stylish = useStylish();
    return (
        <div className={cx(stylish.wraper, styles)}>
            {header}
            <div className={stylish.pannel}>{children}</div>
            {footer}
        </div>
    );
};

export interface PanelProps {
    footer?: ReactNode;
    header?: ReactNode;
}

export default Panel;
