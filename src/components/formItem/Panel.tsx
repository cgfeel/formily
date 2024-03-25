import { ISubmitProps, Submit } from "@formily/antd-v5";
import { FormProvider, IProviderProps } from "@formily/react";
import { Card } from "antd";
import { createStyles } from "antd-style";
import { FC, PropsWithChildren, ReactNode } from "react";
import useStylish from "../commonStylish";
import Form from "../form/form";
import FormButtonGroup from "../formButtonGroup/form-button-group";

const useStyles = createStyles(
    ({ prefixCls, css }, width: number) => css`
        width: ${width}px;
        .size-wrap {
            .${prefixCls}-formily-item-bordered-none {
                .${prefixCls}-input-outlined,
                    .${prefixCls}-input-number-input-wrap,
                    .${prefixCls}-picker,
                    .${prefixCls}-select-selector {
                    background: #ddd;
                }
            }
            .${prefixCls}-formily-item-inset.${prefixCls}-formily-item-bordered-none {
                .${prefixCls}-input-outlined,
                    .${prefixCls}-input-number-input-wrap,
                    .${prefixCls}-picker,
                    .${prefixCls}-select-selector {
                    background: transparent;
                }
            }
        }
    `,
);

const Panel: FC<PropsWithChildren<PanelProps>> = ({
    children,
    className,
    extra,
    footer,
    form,
    header,
    submit = {},
    width = 600,
}) => {
    const { onSubmit = console.log, onSubmitFailed = console.log } = submit;
    const { styles, cx } = useStyles(width);
    const stylish = useStylish();

    return (
        <div className={stylish.wraper}>
            {header}
            <div className={stylish.pannel}>
                <Card className={cx(styles, className)}>
                    {extra}
                    <FormProvider form={form}>
                        <Form form={form} labelCol={6}>
                            {children}
                            <FormButtonGroup.FormItem>
                                <Submit onSubmit={onSubmit} onSubmitFailed={onSubmitFailed}>
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
    className?: string;
    extra?: ReactNode;
    footer?: ReactNode;
    header?: ReactNode;
    submit?: ISubmitProps;
    width?: number;
}

export default Panel;
