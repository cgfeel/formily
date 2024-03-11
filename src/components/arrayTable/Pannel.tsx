import { FormButtonGroup, Submit } from "@formily/antd-v5";
import { FormConsumer, FormProvider, IProviderProps } from "@formily/react";
import { Alert } from "antd";
import { createStyles, css } from "antd-style";
import { FC, PropsWithChildren, ReactNode } from "react";
import useStylish from "../commonStylish";
import { range } from "./SchemaField";
import FormBtn from "./component/FormBtn";

const useStyles = createStyles(css`
    margin-top: 10px;
`);

const Pannel: FC<PropsWithChildren<PannelProps>> = ({ children, footer, form, header }) => {
    const { styles } = useStyles();
    const stylish = useStylish();

    return (
        <div className={stylish.wraper}>
            {header}
            <div className={stylish.pannel}>
                <FormProvider form={form}>
                    {children}
                    <FormButtonGroup>
                        <Submit onSubmit={console.log} onSubmitFailed={console.log}>
                            提交
                        </Submit>
                        <FormConsumer>
                            {() => (
                                <FormBtn
                                    num={form.values.table_list.length}
                                    onClick={() => {
                                        form.setInitialValues({
                                            table_list: range(100000),
                                        });
                                    }}
                                    block>
                                    加载10W条超大数据
                                </FormBtn>
                            )}
                        </FormConsumer>
                    </FormButtonGroup>
                    <Alert
                        message="注意：开启formily插件的页面，因为后台有数据通信，会占用浏览器算力，最好在无痕模式(无formily插件)下测试"
                        type="warning"
                        className={styles}
                    />
                </FormProvider>
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
