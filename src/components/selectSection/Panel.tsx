import { FormProvider, IProviderProps } from "@formily/react";
import { Card } from "antd";
import { FC, PropsWithChildren, ReactNode } from "react";
import useStylish from "../commonStylish";
import { usePanelStyles } from "./hooks/useStyle";

const Panel: FC<PropsWithChildren<PanelProps>> = ({ children, footer, form, header }) => {
    const { styles } = usePanelStyles();
    const stylish = useStylish();

    return (
        <div className={stylish.wraper}>
            {header}
            <div className={stylish.pannel}>
                <Card className={styles}>
                    <FormProvider form={form}>{children}</FormProvider>
                </Card>
            </div>
            {footer}
        </div>
    );
};

export interface PanelProps extends IProviderProps {
    footer?: ReactNode;
    header?: ReactNode;
}

export default Panel;
