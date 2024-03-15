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
import { ArrayField, Field, FormConsumer, VoidField } from "@formily/react";
import { action } from "@formily/reactive";
import { createStyles } from "antd-style";
import { FC } from "react";
import IDUpload, { LocationItem, PopInput, transform } from "../components/IDUpload";
import ArrayBaseItems from "./ArrayBaseItems";

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

const FieldCom: FC<FieldComProps> = ({ pwd }) => {
    const { styles } = useStyles();
    return (
        <>
            <Field name="username" title="用户名" component={[Input]} decorator={[FormItem]} required />
            {pwd === true && (
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
            )}
            {pwd === true && (
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
            )}
            <VoidField
                name="name"
                title="姓名"
                component={[FormGrid]}
                decorator={[FormItem, { feedbackLayout: "none" }]}
                reactions={field => {
                    const firstName = field.query(".firstName").get("editable");
                    const lastName = field.query(".lastName").get("editable");
                    field.decoratorProps.asterisk = firstName || lastName;
                }}>
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
                        {value.map((_, index) => (
                            <ArrayBaseItems className={styles} index={index} key={index}>
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
                            </ArrayBaseItems>
                        ))}
                        <FormConsumer>
                            {form => <>{form.editable && <ArrayBase.Addition title="新增联系人" />}</>}
                        </FormConsumer>
                    </ArrayBase>
                )}
            </ArrayField>
        </>
    );
};

export interface FieldComProps {
    pwd?: boolean;
}

export default FieldCom;
