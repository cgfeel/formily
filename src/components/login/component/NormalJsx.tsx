import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { FormItem, Input, Password } from "@formily/antd-v5";
import { createForm } from "@formily/core";
import { Field } from "@formily/react";
import { FC } from "react";
import FormCom from "./FormCom";

const form = createForm({
    validateFirst: true,
});

/**
 * `JSX`和`Schema`的区别
 *  - 最外层不需要包裹`SchemaField`
 *  - 字段类型不用声明，由组件提供
 *  - 规则属性不需要前置`x-`
 *  - 不需要诸如：`x-component-props`、`x-decorator-props`这样的属性，直接响应组件中设置
 *  - `component`、`decorator`设置的组件不需用数组包裹
 *  - 优点：相对`Schema`，有完整的代码提示和类型检查
 *  - 缺点：关联反应需要用过`field.query`匹配路径，通过`setComponentProps`设置属性，见`PhoneJsx.tsx`
 */
const NormalJsx: FC = () => (
    <FormCom form={form}>
        <Field
            name="username"
            title="用户名"
            component={[Input, { prefix: <UserOutlined /> }]}
            decorator={[FormItem]}
            required
        />
        <Field
            name="password"
            title="密码"
            component={[Password, { prefix: <LockOutlined /> }]}
            decorator={[FormItem]}
            required
        />
    </FormCom>
);

export default NormalJsx;
