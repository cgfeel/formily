import { createForm } from "@formily/core";
import { FC } from "react";
import Pannel, { tabList } from "./Pannel";
import SchemaField from "./SchemaField";
import FormCollapse from "./form-collapse";

const form = createForm();
const formCollapse = FormCollapse.createFormCollapse();

const MarkupSchema: FC = () => (
    <Pannel
        form={form}
        formCollapse={formCollapse}
        header={
            <h2>
                通过<code>Markup Schema</code>创建折叠表单
            </h2>
        }>
        <SchemaField>
            <SchemaField.Void
                title="折叠面板"
                x-component="FormCollapse"
                x-decorator="FormItem"
                x-component-props={{ formCollapse }}>
                {tabList.map(({ input, name, tab }) => (
                    <SchemaField.Void
                        x-component="FormCollapse.CollapsePanel"
                        key={name}
                        name={name}
                        x-component-props={{ key: tab, header: tab }}>
                        <SchemaField.String
                            name={input}
                            title={input.toUpperCase()}
                            x-component="Input"
                            x-decorator="FormItem"
                            required
                        />
                    </SchemaField.Void>
                ))}
            </SchemaField.Void>
        </SchemaField>
    </Pannel>
);

export default MarkupSchema;
