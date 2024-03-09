import {
    ArrayBase,
    Cascader,
    DatePicker,
    Editable,
    FormGrid,
    FormItem,
    FormLayout,
    Input,
    Password,
    Select,
} from "@formily/antd-v5";
import { createForm } from "@formily/core";
import { ArrayField, Field, VoidField } from "@formily/react";
import { action } from "@formily/reactive";
import { createStyles } from "antd-style";
import { FC } from "react";
import IDUpload, { LocationItem, PopInput, transform } from "./components/IDUpload";
import Pannel from "./components/Pannel";

const form = createForm();

const useStyles = createStyles(
    ({ prefixCls, token, css }) => css`
        border: 1px solid ${token.colorBorder};
        margin-bottom: 10px;
        padding-top: 10px;
        text-align: center;
        & .${prefixCls}-formily-item-feedback-layout-loose {
            margin-bottom: 10px;
            .${prefixCls}-btn {
                color: ${token.colorBgMask};
                font-size: ${token.fontSize}px;
            }
        }
    `,
);

const FieldJsx: FC = () => {
    const { styles } = useStyles();
    return (
        <Pannel
            footer={
                <div>
                    <p>
                        在 <code>Jsx</code> 的自增控件中查找当前路径通过 <code>{"[]"}</code>，如{" "}
                        <code>{".[].name"}</code>
                    </p>
                    <div>
                        <p>
                            <code>ArrayItems</code> 自增组件只适用于 <code>Schema</code> 场景，因此这里采用{" "}
                            <code>ArrayField</code> + <code>ArrayBase</code>，存在以下几个问题：
                        </p>
                        <ul>
                            <li>不支持拖拽</li>
                            <li>
                                如果添加校验规则<code>ArrayField</code> 匹配不到 <code>ArrayBase</code>
                                ，抛出的错误又无法被 <code>Form</code> 捕获，因此这种情况建议使用 <code>Schema</code>{" "}
                                场景
                            </li>
                        </ul>
                    </div>
                </div>
            }
            form={form}
            header={
                <h2>
                    通过<code>Jsx</code>创建注册
                </h2>
            }>
            <Field name="username" title="用户名" component={[Input]} decorator={[FormItem]} required />
            <Field
                name="password"
                title="密码"
                component={[Password, { autoComplete: "off", checkStrength: true }]}
                decorator={[FormItem]}
                reactions={field => {
                    const confirm = field.query(".confirm_password");
                    const value = confirm.get("value");
                    field.selfErrors = value && field.value && field.value !== value ? ["确认密码不匹配"] : [];
                }}
                required
            />
            <Field
                name="confirm_password"
                title="确认密码"
                component={[Password, { autoComplete: "off", checkStrength: true }]}
                decorator={[FormItem]}
                reactions={field => {
                    const password = field.query(".password");
                    const value = password.get("value");
                    field.selfErrors = value && field.value && field.value !== value ? ["确认密码不匹配"] : [];
                }}
                required
            />
            <VoidField
                name="name"
                title="姓名"
                component={[FormGrid]}
                decorator={[FormItem, { asterisk: true, feedbackLayout: "none" }]}>
                <Field name="firstName" component={[Input, { placeholder: "姓" }]} decorator={[FormItem]} required />
                <Field name="lastName" component={[Input, { placeholder: "名" }]} decorator={[FormItem]} required />
            </VoidField>
            <Field name="email" title="邮箱" validator="email" component={[Input]} decorator={[FormItem]} required />
            <Field
                name="gender"
                title="性别"
                component={[Select]}
                dataSource={[
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
                decorator={[FormItem]}
                required
            />
            <Field name="birthday" title="生日" component={[DatePicker]} decorator={[FormItem]} required />
            <Field
                name="address"
                title="地址"
                component={[Cascader]}
                decorator={[FormItem]}
                reactions={field => {
                    field.loading = true;
                    fetch("//unpkg.com/china-location/dist/location.json")
                        .then(res => res.json())
                        .then(
                            action.bound!((data: Record<string, LocationItem>) => {
                                field.dataSource = transform(data);
                                field.loading = false;
                            }),
                        );
                }}
                required
            />
            <Field name="idCard" title="身份验证" component={[IDUpload]} decorator={[FormItem]} required />
            <ArrayField name="contacts" title="联系人信息" decorator={[FormItem]}>
                {({ value }) => (
                    <ArrayBase>
                        {value.map((item, index) => (
                            <div className={styles} key={index}>
                                <Field
                                    title="完善联系人信息"
                                    component={[Editable.Popover]}
                                    name={`${index}`}
                                    reactions={field => {
                                        field.title = field.query(".[].name").value() || field.title;
                                    }}>
                                    <VoidField name="layout" component={[FormLayout, { layout: "vertical" }]}>
                                        <Field
                                            name="name"
                                            title="姓名"
                                            component={[PopInput]}
                                            decorator={[FormItem]}
                                            required
                                        />
                                        <Field
                                            name="email"
                                            title="邮箱"
                                            validator="email"
                                            component={[PopInput]}
                                            decorator={[FormItem]}
                                            required
                                        />
                                        <Field
                                            name="phone"
                                            title="手机号"
                                            validator="phone"
                                            component={[PopInput]}
                                            decorator={[FormItem]}
                                            required
                                        />
                                    </VoidField>
                                </Field>
                                <FormItem.BaseItem>
                                    <ArrayBase.Remove index={index} title="删除联系人" />
                                    <ArrayBase.MoveDown index={index} title="上移信息" />
                                    <ArrayBase.MoveUp index={index} title="下移信息" />
                                </FormItem.BaseItem>
                            </div>
                        ))}
                        <ArrayBase.Addition title="新增联系人" />
                    </ArrayBase>
                )}
            </ArrayField>
        </Pannel>
    );
};

export default FieldJsx;
