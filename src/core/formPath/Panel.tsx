import { IProviderProps } from "@formily/react";
import { Card } from "antd";
import { createStyles, css } from "antd-style";
import { FC, PropsWithChildren, ReactNode } from "react";
import useStylish from "../../components/commonStylish";
import Form from "../../components/form/form";

const useStyles = createStyles(css`
    width: 600px;
`);

const Consumer: FC<PropsWithChildren> = ({ children }) => (
    <>
        <p>
            <strong>target:</strong>
        </p>
        <code className="consumer">{children}</code>
    </>
);

const Panel: FC<PropsWithChildren<PanelProps>> = ({ children, footer, form, header }) => {
    const { styles } = useStyles();
    const stylish = useStylish();
    return (
        <div className={stylish.wraper}>
            {header}
            <div className={stylish.pannel}>
                <Card className={styles}>
                    <Form form={form}>{children}</Form>
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

export { Consumer };

export default Panel;
