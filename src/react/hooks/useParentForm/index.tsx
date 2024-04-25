import { Input } from "@formily/antd-v5";
import { createForm } from "@formily/core";
import { Field, ObjectField, VoidField } from "@formily/react";
import { FC } from "react";
import FormItem from "../../../components/formItem/form-item";
import Panel from "../../Panel";
import Custom from "./Custom";
import SubForm from "./SubForm";

const form = createForm();

const UseParentForm: FC = () => (
    <Panel
        footer={
            <div>
                <p>
                    用于读取最近的 <code>Form</code> 或者 <code>ObjectField</code> 实例，主要方便于调用子表单的{" "}
                    <code>submit</code>/<code>validate</code>
                </p>
                <p>为了验证父子表单交互，这里我通过抽屉组件实现例子，在上面直接点击按钮打开浮窗填写内容后提交</p>
            </div>
        }
        form={form}
        header={
            <h2>
                <code>useParentForm</code>
            </h2>
        }>
        <ObjectField name="object">
            <Custom />
        </ObjectField>
        <Custom />
        <VoidField name="void">
            <Custom />
        </VoidField>
        <ObjectField name="object-input">
            <Field name="aaa" component={[Input]} decorator={[FormItem]} />
            <Field name="bbb" component={[Input]} decorator={[FormItem]} />
            <Field name="ccc" component={[Input]} decorator={[FormItem]} />
            <Field name="ddd" component={[Input]} decorator={[FormItem]} />
            <SubForm />
        </ObjectField>
    </Panel>
);

export default UseParentForm;
