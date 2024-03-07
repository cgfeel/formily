import { FormItem, Input } from "@formily/antd-v5";
import { createForm } from "@formily/core";
import { Field } from "@formily/react";
import { FC } from "react";
import FormCom from "./FormCom";
import { LockOutlined, PhoneOutlined } from "@ant-design/icons";
import VerifyCode from "../VerifyCode";

const form = createForm({
    validateFirst: true,
});

const PhoneJsx: FC = () => (
    <FormCom form={form}>
        <Field
            name="phone"
            title="手机号"
            validator="phone"
            component={[Input, { prefix: <PhoneOutlined /> }]}
            decorator={[FormItem]}
            required
        />
        <Field
            name="verifyCode"
            title="验证码"
            component={[VerifyCode, { prefix: <LockOutlined /> }]}
            decorator={[FormItem]}
            reactions={field => {
                const phone = field.query(".phone");
                field.setComponentProps({
                    phoneNumber: phone.get("value"),
                    readyPost: phone.get("valid") && phone.get("value"),
                });
            }}
            required
        />
    </FormCom>
);

export default PhoneJsx;
