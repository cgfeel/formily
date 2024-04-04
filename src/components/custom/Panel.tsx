import { ISubmitProps, Submit } from "@formily/antd-v5";
import { IProviderProps } from "@formily/react";
import { Card } from "antd";
import { createStyles, css } from "antd-style";
import { FC, PropsWithChildren, ReactNode } from "react";
import useStylish from "../commonStylish";
import Form from "../form/form";
import FormButtonGroup from "../formButtonGroup/form-button-group";

const useStyles = createStyles(css`
    width: 600px;
`);

const Panel: FC<PropsWithChildren<PanelProps>> = ({ children, footer, form, header, submit = {} }) => {
    const { onSubmit, ...submitProps } = submit;
    const { styles } = useStyles();
    const stylish = useStylish();
    return (
        <div className={stylish.wraper}>
            {header}
            <div className={stylish.pannel}>
                <Card className={styles}>
                    <Form form={form} labelCol={6}>
                        {children}
                        <FormButtonGroup.FormItem>
                            <Submit {...submitProps} onSubmit={onSubmit || console.log} onSubmitFailed={console.log}>
                                提交
                            </Submit>
                        </FormButtonGroup.FormItem>
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
    submit?: Omit<ISubmitProps, "children" | "onSubmitFailed">;
}

export default Panel;
