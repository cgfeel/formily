import { createForm } from "@formily/core";
import { Select } from "@formily/antd-v5";
import { FC } from "react";
import Panel from "../../Panel";
import SchemaField from "./SchemaField";
import useStyles from "./styles";

const form = createForm();

const MarkupSchema: FC = () => {
    const { styles } = useStyles();
    return (
        <Panel
            footer={
                <p>
                    <code>SchemaField</code> 组件是专门用于解析{" "}
                    <a href="https://react.formilyjs.org/api/shared/schema">JSON-Schema</a> 动态渲染表单的组件。 在使用
                    <code>SchemaField</code> 组件的时候，需要通过 <code>createSchemaField</code> 工厂函数创建一个
                    <code>SchemaField</code> 组件。
                </p>
            }
            form={form}
            header={<h2>Markup Schema</h2>}>
            <SchemaField components={{ Select }}>
                <SchemaField.String
                    name="input"
                    x-component="Input"
                    x-decorator="FormItem"
                    x-component-props={{ allowClear: true }}
                />
                <SchemaField.String
                    name="select"
                    x-component="Select"
                    x-decorator="FormItem"
                    x-decorator-props={{ className: styles }}
                />
            </SchemaField>
        </Panel>
    );
};

export default MarkupSchema;
