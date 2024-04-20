import { Input } from "@formily/antd-v5";
import { createForm } from "@formily/core";
import { Field, FormConsumer } from "@formily/react";
import { FC } from "react";
import Panel from "../../Panel";
import FormItem from "../../../components/formItem/form-item";

const form = createForm();

const FormConsumerCom: FC = () => (
    <Panel
        footer={
            <p>
                表单响应消费者，专门用于监听表单模型数据变化而实现各种 UI 响应的组件，使用方式为{" "}
                <code>render props</code>.
            </p>
        }
        form={form}
        header={<h2>FormConsumer</h2>}>
        <Field name="input" initialValue="values" component={[Input, { allowClear: true }]} decorator={[FormItem]} />
        <FormConsumer>{form => form.values.input}</FormConsumer>
    </Panel>
);

export default FormConsumerCom;
