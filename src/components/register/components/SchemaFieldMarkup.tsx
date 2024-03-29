import { FC } from "react";
import SchemaField from "../SchemaField";

const SchemaFieldMarkup: FC<SchemaFieldMarkupProps> = ({ pwd }) => (
    <SchemaField>
        <SchemaField.Markup
            type="string"
            name="username"
            title="用户名"
            x-component="Input"
            x-decorator="FormItem"
            required
        />
        {/**
         * - `@formily/antd-v5`中`Password`组件中的属性`checkStrength`，用于是否展示密码强度的UI
         * - 在关联受控中`$deps`值受控依赖的对象，而`$self`指当前表单控件本身
         *   - 回顾：在关联受控的`state`中，`component`表示当前表单的所有控件
         *   - 新增：`$self`表示当前控件
         *   - `selfErrors`：接受3类值：`string`、`FeedbackMessage`: `any[]`、`undefined`
         */}
        {pwd === true && (
            <SchemaField.String
                name="password"
                title="密码"
                x-component="Password"
                x-component-props={{ autoComplete: "off", checkStrength: true }}
                x-decorator="FormItem"
                x-reactions={[
                    {
                        dependencies: [".confirm_password"],
                        fulfill: {
                            state: {
                                selfErrors:
                                    "{{$deps[0] && $self.value && $self.value !== $deps[0] ? '确认密码不匹配' : ''}}",
                            },
                        },
                    },
                ]}
                required
            />
        )}
        {pwd === true && (
            <SchemaField.String
                name="confirm_password"
                title="确认密码"
                x-component="Password"
                x-component-props={{ autoComplete: "off", checkStrength: true }}
                x-decorator="FormItem"
                x-reactions={[
                    {
                        dependencies: [".password"],
                        fulfill: {
                            state: {
                                selfErrors:
                                    "{{$deps[0] && $self.value && $self.value !== $deps[0] ? '确认密码不匹配' : ''}}",
                            },
                        },
                    },
                ]}
                required
            />
        )}
        {/**
         * SchemaField.Void: 虚拟节点
         *  - 可以看做`antd`中没有`name`属性的`<Form.Item>`，存在的意义在于调整表单布局
         *  - 这里采用`FormItem`作为包裹组件，`FormGrid`作为虚拟节点中的`grid`布局组件
         * ----
         * `VoidField`虚拟节点和`ObjectField`对象节点的区别：
         *  - 虚拟节点只存储路径，不占用实际节点数据，可用于交互
         *  - 对象节点将节点以`object`形式提供，常用于归类数据类型，不做交互
         * ----
         * `FormItem`属性：
         *  - `asterisk`：是否展示星号
         *  - `feedbackLayout`：表单反馈信息布局分别有，`loose`：宽松、`terse`：紧凑、`popover`：浮窗、`none`：无
         */}
        <SchemaField.Void
            title="姓名"
            x-component="FormGrid"
            x-decorator="FormItem"
            x-decorator-props={{
                feedbackLayout: "none",
            }}
            x-reactions={{
                dependencies: [".firstName#editable", ".lastName#editable"],
                when: "{{$deps[0] || $deps[1]}}",
                fulfill: {
                    schema: {
                        "x-decorator-props": { asterisk: true },
                    },
                },
                otherwise: {
                    schema: {
                        "x-decorator-props": { asterisk: false },
                    },
                },
            }}>
            <SchemaField.String
                name="firstName"
                x-component="Input"
                x-component-props={{
                    placeholder: "姓",
                }}
                x-decorator="FormItem"
                required
            />
            <SchemaField.String
                name="lastName"
                x-component="Input"
                x-component-props={{
                    placeholder: "名",
                }}
                x-decorator="FormItem"
                required
            />
        </SchemaField.Void>
        <SchemaField.String
            name="email"
            title="邮箱"
            x-component="Input"
            x-decorator="FormItem"
            x-validator="email"
            required
        />
        {/**
         * 一个使用`Select`组件的字符节点
         *  - 从这里看出节点类型不是取决于组件，而是最终得到的数据结果作为类型
         *  - `enum`枚举参数用于作为下拉选项，相当于`antd`中`Select`组件的`options`
         */}
        <SchemaField.String
            enum={[
                {
                    label: "男",
                    value: 1,
                },
                {
                    label: "女",
                    value: 2,
                },
                {
                    label: "第三性别",
                    value: 3,
                },
            ]}
            name="gender"
            title="性别"
            x-component="Select"
            x-decorator="FormItem"
            required
        />
        <SchemaField.String name="birthday" title="生日" x-component="DatePicker" x-decorator="FormItem" required />
        {/**
         * 从这里可以看出可以使用一个作用域的函数作为受控交互，它将会在初始化后立即执行
         */}
        <SchemaField.String
            name="address"
            title="地址"
            x-component="Cascader"
            x-decorator="FormItem"
            x-reactions="{{fetchAddress}}"
            required
        />
        <SchemaField.String name="idCard" title="身份证复印件" x-component="IDUpload" x-decorator="FormItem" required />
        {/**
         * ArrayField：自增动态节点，相当于`antd`中`Form`组件的`<Form.List>`
         */}
        <SchemaField.Array name="contacts" title="联系人信息" x-component="ArrayItems" x-decorator="FormItem" required>
            {/**
             * `SchemaField.Object`其组件为`ArrayItems.Item`，表示自增的每一个节点都是拥有多个子节点的对象
             */}
            <SchemaField.Object x-component="ArrayItems.Item">
                {/**
                 * 将一个虚拟节点其组件为`ArrayItems.SortHandle`，表示一个可拖拽移动的把手
                 */}
                <SchemaField.Void x-component="ArrayItems.SortHandle" x-decorator="FormItem" />
                {/**
                 * 设置一个虚拟节点，用`Editable`包裹表示是一个可编辑的节点
                 *  - `Editable`有两个类型，不带属性编辑时为一个可编辑区域，`Editable.Popover`编辑时为浮窗
                 *  - 由于单前节点编辑时为浮窗，所以节点本身的组件是一个`FormLayout`，作为浮窗内的表单布局
                 *  - `title`则是用户在编辑时默认展示的提示文字
                 * ----
                 * 被动受控：
                 *  - 路径：回顾登录受控依赖来自平级则是：`.{name}`，当前受控来自子节点则是：`.{currentName}.{childName}`
                 *  - 交互：回顾登录受控要修改组件属性，使其重新渲染通过`state`，而当前受控修改节点信息通过`schema`
                 */}
                <SchemaField.Void
                    name="popover"
                    title="维护联系人信息"
                    x-component="FormLayout"
                    x-component-props={{
                        layout: "vertical",
                    }}
                    x-decorator="Editable.Popover"
                    x-reactions={[
                        {
                            dependencies: [".popover.name"],
                            fulfill: {
                                schema: {
                                    title: "{{$deps[0]}}",
                                },
                            },
                        },
                    ]}>
                    <SchemaField.String
                        name="name"
                        title="姓名"
                        x-component="PopInput"
                        x-decorator="FormItem"
                        required
                    />
                    <SchemaField.String
                        name="email"
                        title="邮箱"
                        x-component="PopInput"
                        x-decorator="FormItem"
                        x-validator={[{ required: true }, "email"]}
                    />
                    <SchemaField.String
                        name="phone"
                        title="手机号"
                        x-component="PopInput"
                        x-decorator="FormItem"
                        x-validator="phone"
                        required
                    />
                </SchemaField.Void>
                {/** 设置一个虚拟节点作为`ArrayItems.Remove`，表示作为可删除动态自增的节点 */}
                <SchemaField.Void x-component="ArrayItems.Remove" x-decorator="FormItem" />
            </SchemaField.Object>
            {/** 设置一个虚拟节点作为`ArrayItems.Addition`，表示作为可新增动态自增的节点 */}
            <SchemaField.Void title="新增联系人" x-component="ArrayItems.Addition" />
        </SchemaField.Array>
    </SchemaField>
);

export interface SchemaFieldMarkupProps {
    pwd?: boolean;
}

export default SchemaFieldMarkup;
