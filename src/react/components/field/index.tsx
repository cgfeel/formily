import { Input } from "@formily/antd-v5";
import { createForm } from "@formily/core";
import { Field } from "@formily/react";
import { FC } from "react";
import Panel from "../../Panel";

const form = createForm();

const FieldCom: FC = () => (
    <Panel
        footer={
            <p>
                作为 <code>@formily/core</code> 的{" "}
                <a href="https://core.formilyjs.org/zh-CN/api/models/form#createfield">createField</a> React
                实现，它是专门用于将 <code>ViewModel</code>
                与输入控件做绑定的桥接组件，<code>Field</code> 组件属性参考{" "}
                <a href="https://core.formilyjs.org/zh-CN/api/models/form#ifieldfactoryprops">IFieldFactoryProps</a>
            </p>
        }
        form={form}
        header={
            <h2>
                <code>Field</code>
            </h2>
        }>
        <Field name="input" component={[Input, { placeholder: "Please Input" }]} />
    </Panel>
);

export default FieldCom;
