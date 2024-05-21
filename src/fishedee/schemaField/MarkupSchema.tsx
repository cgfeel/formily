import { createForm } from "@formily/core";
import { FC } from "react";
import FormBase from "../reactField/childrenRender/FormBase";
import SchemaField from "./SchemaField";

const form = createForm({
    initialValues: {
        person: {
            name: "levi",
            age: 12,
        },
        contact: [
            {
                phone: "1234567890123",
                mail: "11@22.com",
            },
        ],
    },
});

const MarkupSchema: FC = () => (
    <FormBase
        form={form}
        header={
            <h2>
                React.2: 使用 <code>MarkupSchema</code> + <code>RecursionField</code> 实现表单
            </h2>
        }>
        <SchemaField>
            <SchemaField.Object name="person" title="个人信息" x-decorator="VoidComponent">
                <SchemaField.String name="name" title="姓名" x-component="Input" x-decorator="FormItem" required />
                <SchemaField.Number name="age" title="年龄" x-component="InputDigit" x-decorator="FormItem" required />
            </SchemaField.Object>
            <SchemaField.Array name="contact" title="联系信息" x-component="ArrayItems" x-decorator="VoidComponent">
                <SchemaField.Object title="信息" x-decorator="FormItem">
                    <SchemaField.String
                        format="phone"
                        name="phone"
                        x-component="Input"
                        x-decorator="FormItem"
                        x-component-props={{ placeholder: "电话" }}
                        required
                    />
                    <SchemaField.String
                        format="email"
                        name="mail"
                        x-component="Input"
                        x-decorator="FormItem"
                        x-component-props={{ placeholder: "邮箱" }}
                        required
                    />
                </SchemaField.Object>
            </SchemaField.Array>
        </SchemaField>
    </FormBase>
);

export default MarkupSchema;
