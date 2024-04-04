import { Submit } from "@formily/antd-v5";
import { FormConsumer, IProviderProps } from "@formily/react";
import { Card } from "antd";
import { createStyles, css } from "antd-style";
import { FC, PropsWithChildren, ReactNode } from "react";
import useStylish from "../commonStylish";
import Form from "../form/form";
import FormButtonGroup from "../formButtonGroup/form-button-group";

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
                    <Form layout="vertical" form={form}>
                        {children}
                        <FormButtonGroup>
                            <Submit onSubmit={console.log} onSubmitFailed={console.log}>
                                提交
                            </Submit>
                        </FormButtonGroup>
                        <code className="consumer">
                            <pre>
                                <FormConsumer>{form => JSON.stringify(form.values, null, 2)}</FormConsumer>
                            </pre>
                        </code>
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
