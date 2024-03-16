import { FormButtonGroup, IFormStep } from "@formily/antd-v5";
import { FormConsumer, FormProvider, IProviderProps } from "@formily/react";
import { Button, Card } from "antd";
import { createStyles, css } from "antd-style";
import { FC, PropsWithChildren, ReactNode } from "react";
import useStylish from "../commonStylish";

const useStyles = createStyles(css`
    width: 600px;
`);

const Pannel: FC<PropsWithChildren<PannelProps>> = ({ children, footer, form, formStep, header }) => {
    const { styles } = useStyles();
    const stylish = useStylish();
    return (
        <div className={stylish.wraper}>
            {header}
            <div className={stylish.pannel}>
                <Card className={styles}>
                    <FormProvider form={form}>
                        {children}
                        <FormConsumer>
                            {() => (
                                <FormButtonGroup>
                                    <Button disabled={!formStep.allowBack} onClick={() => formStep.back()}>
                                        上一步
                                    </Button>
                                    <Button disabled={!formStep.allowNext} onClick={() => formStep.next()}>
                                        下一步
                                    </Button>
                                    <Button
                                        disabled={formStep.allowNext}
                                        onClick={() => formStep.submit(console.log).catch(console.log)}>
                                        提交
                                    </Button>
                                </FormButtonGroup>
                            )}
                        </FormConsumer>
                    </FormProvider>
                </Card>
            </div>
            {footer}
        </div>
    );
};

export interface PannelProps extends IProviderProps {
    formStep: IFormStep;
    footer?: ReactNode;
    header?: ReactNode;
}

export default Pannel;
