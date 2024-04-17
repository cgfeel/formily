import { Submit } from "@formily/antd-v5";
import { IProviderProps } from "@formily/react";
import { Card } from "antd";
import { createStyles, css } from "antd-style";
import { FC, PropsWithChildren, ReactNode } from "react";
import useStylish from "../../components/commonStylish";
import Form from "../../components/form/form";
import FormButtonGroup from "../../components/formButtonGroup/form-button-group";

const useStyles = createStyles(css`
    width: 600px;
`);

const Panel: FC<PropsWithChildren<PanelProps>> = ({ children, form, footer, header, subnone }) => {
    const { styles } = useStyles();
    const stylish = useStylish();

    return (
        <div className={stylish.wraper}>
            {header}
            <div className={stylish.pannel}>
                <Card className={styles}>
                    <Form form={form} labelCol={6}>
                        {children}
                        {!subnone && (
                            <FormButtonGroup.FormItem>
                                <Submit onSubmit={console.log} onSubmitFailed={console.log}>
                                    提交
                                </Submit>
                            </FormButtonGroup.FormItem>
                        )}
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
    subnone?: boolean;
}

export default Panel;
