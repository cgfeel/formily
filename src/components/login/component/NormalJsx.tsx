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
 * ----
 * 优缺点：
 *  - 优点：相对`JSON Schema`，有完整的代码提示和类型检查
 *  - 缺点：关联反应需要用过`field.query`匹配路径，通过`setComponentProps`设置属性，见`PhoneJsx.tsx`
 *  - 最佳：用`Markup Schema`可以有效解决代码提示问题，又能够避免过于复杂的去关联反应
 *  - 缺点：`Markup Schema`是通过类似于指令集操作，丢失了组件的可读性
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
            component={[Password, { autoComplete: "off", prefix: <LockOutlined /> }]}
            decorator={[FormItem]}
            required
        />
    </FormCom>
);

export default NormalJsx;
