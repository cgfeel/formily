import { FormButtonGroup, FormItem, FormLayout, Input, Submit } from "@formily/antd-v5";
import { createForm } from "@formily/core";
import { Field, FormConsumer, FormProvider } from "@formily/react";
import { createStyles, css } from "antd-style";
import { FC } from "react";
import useStylish from "../commonStylish";

const form = createForm<{ input: string }>();
const useStyles = createStyles(css`
    border: 1px dashed #666;
    margin-bottom: 20px;
    padding: 5px;
`);

const StartFormily: FC = () => {
    const { styles } = useStyles();
    const stylish = useStylish();
    return (
        <div className={stylish.wraper}>
            <h2>响应输入框</h2>
            <FormProvider form={form}>
                <FormLayout layout="vertical">
                    <Field
                        initialValue="Hello world"
                        name="input"
                        title="输入框"
                        component={[Input]}
                        decorator={[FormItem]}
                        required
                    />
                </FormLayout>
                <FormConsumer>{() => <div className={styles}>实时响应：{form.values.input}</div>}</FormConsumer>
                <FormButtonGroup>
                    <Submit onSubmit={console.log}>提交</Submit>
                </FormButtonGroup>
            </FormProvider>
        </div>
    );
};

export default StartFormily;
