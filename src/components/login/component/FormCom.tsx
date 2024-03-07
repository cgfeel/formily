import { Form, FormProps, Submit } from "@formily/antd-v5";
import { FC, PropsWithChildren } from "react";

// 在官方文档里是没有`onAutoSubmitFailed`，实际测试缺失会导致有错误是抛出`promise`异常
const FormCom: FC<PropsWithChildren<FormComProps>> = ({
    children,
    form,
    onAutoSubmit = console.log,
    onAutoSubmitFailed = console.log,
}) => (
    <Form
        layout="vertical"
        size="large"
        form={form}
        onAutoSubmit={onAutoSubmit}
        onAutoSubmitFailed={onAutoSubmitFailed}>
        {children}
        <Submit size="large" block>
            登录
        </Submit>
    </Form>
);

export interface FormComProps extends FormProps {}

export default FormCom;
