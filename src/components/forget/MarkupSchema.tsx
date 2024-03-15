import { Submit } from "@formily/antd-v5";
import { createForm } from "@formily/core";
import { FC } from "react";
import Pannel from "../register/components/Pannel";
import SchemaField from "./SchemaField";

const form = createForm({
    validateFirst: true,
});

const MarkupSchema: FC = () => (
    <Pannel
        title="变更密码"
        form={form}
        header={
            <h2>
                通过<code>Markup Schema</code>修改密码
            </h2>
        }
        submit={
            <Submit size="large" block>
                确认变更
            </Submit>
        }>
        <SchemaField>
            <SchemaField.String name="username" title="用户名" x-component="Input" x-decorator="FormItem" required />
            <SchemaField.String
                name="email"
                title="邮箱"
                x-component="Input"
                x-decorator="FormItem"
                x-validator="email"
                required
            />
            <SchemaField.String
                name="old_password"
                title="原始密码"
                x-component="Password"
                x-decorator="FormItem"
                x-component-props={{
                    autoComplete: "off",
                }}
                required
            />
            <SchemaField.String
                name="password"
                title="新密码"
                x-component="Password"
                x-decorator="FormItem"
                x-component-props={{
                    autoComplete: "off",
                    checkStrength: true,
                }}
                x-reactions={[
                    {
                        dependencies: [".confirm_password"],
                        fulfill: {
                            state: {
                                selfErrors:
                                    "{{$deps[0] && $self.value && $self.value !== $deps[0] ? ['确认密码不匹配'] : ''}}",
                            },
                        },
                    },
                ]}
                required
            />
            <SchemaField.String
                name="confirm_password"
                title="确认密码"
                x-component="Password"
                x-decorator="FormItem"
                x-component-props={{
                    autoComplete: "off",
                    checkStrength: true,
                }}
                x-reactions={[
                    {
                        dependencies: [".password"],
                        fulfill: {
                            state: {
                                selfErrors:
                                    "{{$deps[0] && $self.value && $self.value !== $deps[0] ? ['确认密码不匹配'] : []}}",
                            },
                        },
                    },
                ]}
                required
            />
        </SchemaField>
    </Pannel>
);

export default MarkupSchema;
