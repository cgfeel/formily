import { createForm } from "@formily/core";
import { FC } from "react";
import Pannel, { tabList } from "./Pannel";
import SchemaField from "./SchemaField";
import FormTab from "./form-tab";

const form = createForm();
const formTab = FormTab.createFormTab();

const MarkupSchema: FC = () => (
    <Pannel
        form={form}
        formTab={formTab}
        header={
            <h2>
                通过<code>Markup Schema</code>创建选项卡表单
            </h2>
        }>
        <SchemaField>
            <SchemaField.Void x-component="FormTab" x-component-props={{ formTab }}>
                {tabList.map(({ input, name, tab }) => (
                    <SchemaField.Void
                        type="void"
                        x-component="FormTab.TabPane"
                        key={name}
                        name={name}
                        x-component-props={{ key: name, tab }}>
                        <SchemaField.String
                            x-component="Input"
                            x-decorator="FormItem"
                            name={input}
                            title={input.toUpperCase()}
                            required
                        />
                    </SchemaField.Void>
                ))}
            </SchemaField.Void>
        </SchemaField>
    </Pannel>
);

export default MarkupSchema;
