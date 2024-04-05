import { FC, PropsWithChildren, ReactNode } from "react";
import useStylish from "../../components/commonStylish";

const Panel: FC<PropsWithChildren<PanelProps>> = ({ children, footer, header }) => {
    const stylish = useStylish();
    return (
        <div className={stylish.wraper}>
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
