import { Form, FormButtonGroup, Submit } from "@formily/antd-v5";
import { FormProvider, IProviderProps } from "@formily/react";
import { Card } from "antd";
import { createStyles } from "antd-style";
import { FC, PropsWithChildren, ReactNode } from "react";
import useStylish from "../commonStylish";
// import Form from "../form/form";

const useStyles = createStyles(
    ({ css }, width: number) => css`
        width: ${width}px;
    `,
);

const Panel: FC<PropsWithChildren<PanelProps>> = ({ children, extra, footer, form, header, width = 600 }) => {
    const { styles } = useStyles(width);
    const stylish = useStylish();
    return (
        <div className={stylish.wraper}>
            {header}
            <div className={stylish.pannel}>
                <Card className={styles}>
                    {extra}
                    <FormProvider form={form}>
                        <Form form={form} labelCol={6} requiredMark={false}>
                            {children}
                            <FormButtonGroup.FormItem>
                                <Submit onSubmit={console.log} onSubmitFailed={console.log}>
                                    提交
                                </Submit>
                            </FormButtonGroup.FormItem>
                        </Form>
                    </FormProvider>
                </Card>
            </div>
            {footer}
        </div>
    );
};

export interface PanelProps extends IProviderProps {
    extra?: ReactNode;
    footer?: ReactNode;
    header?: ReactNode;
    width?: number;
}

export default Panel;
