import { FormButtonGroup, Submit } from "@formily/antd-v5";
import { FormProvider, IProviderProps } from "@formily/react";
import { Button, Card } from "antd";
import { FC, PropsWithChildren, ReactNode } from "react";
import useStylish from "../commonStylish";
import { createStyles, css } from "antd-style";

const defaultValue = "default value";
const setDefaultValue = <T extends string | Record<string, string>>(value: T, num?: number) =>
    Array.from({ length: num || 10 }).map(() => value);

const useStyles = createStyles(css`
    width: 600px;
`);

const Pannel: FC<PropsWithChildren<PannelProps>> = ({ children, footer, form, header }) => {
    const { styles } = useStyles();
    const stylish = useStylish();
    return (
        <div className={stylish.wraper}>
            {header}
            <div className={stylish.pannel}>
                <Card className={styles}>
                    <FormProvider form={form}>
                        {children}
                        <FormButtonGroup>
                            <Button
                                onClick={() =>
                                    form.setInitialValues({
                                        array: setDefaultValue({
                                            aa: defaultValue,
                                            bb: defaultValue,
                                            cc: defaultValue,
                                            dd: defaultValue,
                                        }),
                                        array_unshift: setDefaultValue({ aa: defaultValue }),
                                        string_array: setDefaultValue(defaultValue),
                                    })
                                }>
                                加载默认数据
                            </Button>
                            <Submit onSubmit={console.log} onSubmitFailed={console.log}>
                                提交
                            </Submit>
                        </FormButtonGroup>
                    </FormProvider>
                </Card>
            </div>
            {footer}
        </div>
    );
};

export interface PannelProps extends IProviderProps {
    footer?: ReactNode;
    header?: ReactNode;
}

export default Pannel;
