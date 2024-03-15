import { FormItem, Input, Password } from "@formily/antd-v5";
import { createForm } from "@formily/core";
import { Field } from "@formily/react";
import { FC } from "react";
import Pannel from "../register/components/Pannel";

const form = createForm({
    validateFirst: true,
});

const FieldJsx: FC = () => (
    <Pannel
        submit="确认变更"
        title="变更密码"
        form={form}
        header={
            <h2>
                通过<code>JSX</code>修改密码
            </h2>
        }>
        <Field name="username" title="用户名" component={[Input]} decorator={[FormItem]} required />
        <Field name="email" title="邮箱" component={[Input]} decorator={[FormItem]} validator="email" required />
        <Field
            name="old_password"
            title="原始密码"
            component={[Password, { autoComplete: "off" }]}
            decorator={[FormItem]}
            required
        />
        <Field
            name="password"
            title="新密码"
            component={[Password, { autoComplete: "off", checkStrength: true }]}
            decorator={[FormItem]}
            reactions={field => {
                const { value, query } = field;
                const confirm = query(".confirm_password");
                const confirmValue = confirm.get("value");
                field.selfErrors = confirmValue && value && value !== confirmValue ? ["确认密码不匹配"] : [];
            }}
            required
        />
        <Field
            name="confirm_password"
            title="确认密码"
            component={[Password, { autoComplete: "off", checkStrength: true }]}
            decorator={[FormItem]}
            reactions={field => {
                const { value, query } = field;
                const password = query(".password");
                const passwordValue = password.get("value");
                field.selfErrors = passwordValue && value && value !== passwordValue ? ["确认密码不匹配"] : [];
            }}
            required
        />
    </Pannel>
);

export default FieldJsx;
