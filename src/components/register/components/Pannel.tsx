import { Form, FormButtonGroup, FormProps, Submit } from "@formily/antd-v5";
import { Card } from "antd";
import { createStyles } from "antd-style";
import { FC, PropsWithChildren, ReactNode } from "react";
import useStylish from "../../commonStylish";

const useStyles = createStyles({
    card: {
        width: 620,
    },
});

const Pannel: FC<PropsWithChildren<PannelProps>> = ({
    children,
    footer,
    header,
    submit = "注册",
    title = "新用户注册",
    onAutoSubmit = console.log,
    onAutoSubmitFailed = console.log,
    ...props
}) => {
    const { styles } = useStyles();
    const stylish = useStylish();
    return (
        <div className={stylish.wraper}>
            {header}
            <div className={stylish.pannel}>
                <Card title={title} className={styles.card}>
                    <Form
                        {...props}
                        labelCol={5}
                        wrapperCol={16}
                        onAutoSubmit={onAutoSubmit}
                        onAutoSubmitFailed={onAutoSubmitFailed}>
                        {children}
                        <FormButtonGroup.FormItem>
                            <Submit size="large" block>
                                {submit}
                            </Submit>
                        </FormButtonGroup.FormItem>
                    </Form>
                </Card>
            </div>
            {footer}
        </div>
    );
};

export interface PannelProps extends FormProps {
    footer?: ReactNode;
    header?: ReactNode;
    submit?: ReactNode;
    title?: ReactNode;
}

export default Pannel;
