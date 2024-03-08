import { createForm } from "@formily/core";
import { createStyles, css } from "antd-style";
import { FC } from "react";
import SchemaField from "./SchemaField";
import Pannel from "./components/Pannel";

const useStyles = createStyles(css`
    width: 300px;
`);

const form = createForm({
    validateFirst: true,
});

const MarkupSchema: FC = () => {
    const { styles } = useStyles();
    return (
        <Pannel
            footer={
                <ul>
                    <li>
                        <strong>组件：</strong>
                        <ul>
                            <li>
                                <code>ArrayItems</code>、<code>Cascader</code>、<code>DatePicker</code>、
                                <code>Editable</code>、<code>FormGrid</code>、<code>FormItem</code>、
                                <code>FormLayout</code>、<code>Password</code>、<code>Select</code>、自定义组件
                                <code>IDUpload</code>
                            </li>
                            <li>
                                <code>@formily/antd-v5</code>：组件的Api大部分可以查看文档
                            </li>
                        </ul>
                    </li>
                    <li>
                        <strong>关联受控：</strong>
                        <ul>
                            <li>
                                作用域变量：<code>$deps</code>、<code>$self</code>
                            </li>
                            <li>
                                受控行为：<code>state</code>、<code>selfErrors</code>、<code>schema</code>
                            </li>
                            <li>路径查找：同级控件查找、子级控件查找</li>
                        </ul>
                    </li>
                    <li>
                        <code>SchemaField.Void</code>：虚拟节点，当前示例包含：
                        <ul>
                            <li>
                                充当<code>{"<Form.Item>"}</code>作为一个没有<code>name</code>的节点
                            </li>
                            <li>
                                充当交互组件：<code>ArrayItems</code>及其子组件、<code>Editable.Popover</code>
                            </li>
                        </ul>
                    </li>
                </ul>
            }
            form={form}
            header={
                <h2>
                    通过<code>Markup Schema</code>创建注册
                </h2>
            }>
            <SchemaField>
                <SchemaField.String
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
                {/**
                 * SchemaField.Void: 虚拟节点
                 *  - 可以看做`antd`中没有`name`属性的`<Form.Item>`，存在的意义在于调整表单布局
                 *  - 这里采用`FormItem`作为包裹组件，`FormGrid`作为虚拟节点中的`grid`布局组件
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
                        asterisk: true,
                        feedbackLayout: "none",
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
                <SchemaField.String
                    name="birthday"
                    title="生日"
                    x-component="DatePicker"
                    x-decorator="FormItem"
                    required
                />
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
                <SchemaField.String
                    name="idCard"
                    title="身份证复印件"
                    x-component="IDUpload"
                    x-decorator="FormItem"
                    required
                />
                {/**
                 * ArrayField：自增动态节点，相当于`antd`中`Form`组件的`<Form.List>`
                 */}
                <SchemaField.Array
                    name="contacts"
                    title="联系人信息"
                    x-component="ArrayItems"
                    x-decorator="FormItem"
                    required>
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
                                x-component="Input"
                                x-component-props={{
                                    className: styles,
                                }}
                                x-decorator="FormItem"
                                required
                            />
                            <SchemaField.String
                                name="email"
                                title="邮箱"
                                x-component="Input"
                                x-component-props={{
                                    className: styles,
                                }}
                                x-decorator="FormItem"
                                x-validator={[{ required: true }, "email"]}
                            />
                            <SchemaField.String
                                name="phone"
                                title="手机号"
                                x-component="Input"
                                x-component-props={{
                                    className: styles,
                                }}
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
        </Pannel>
    );
};

export default MarkupSchema;
