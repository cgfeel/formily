import { FormConsumer, IProviderProps } from "@formily/react";
import { createStyles, css } from "antd-style";
import { FC, PropsWithChildren, ReactNode } from "react";
import Form from "../form/form";
import useStylish from "../commonStylish";
import { Card } from "antd";

const useStyles = createStyles(css`
    width: 600px;
`);

const Panel: FC<PropsWithChildren<PanelProps>> = ({ children, footer, form, header }) => {
    const { styles } = useStyles();
    const stylish = useStylish();
    return (
        <div className={stylish.wraper}>
            {header}
            <div className={stylish.pannel}>
                <Card className={styles}>
                    <Form form={form}>
                        {children}
                        <FormConsumer>
                            {() => (
                                <code className="consumer">
                                    <pre>{JSON.stringify(form.values, null, 2)}</pre>
                                </code>
                            )}
                        </FormConsumer>
                    </Form>
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
