import { createForm } from "@formily/core";
import { FC } from "react";
import Wrapper from "../fieldAction/Wrapper";
import SchemaField from "./SchemaField";
import { FormConsumer, RecursionField, useField, useFieldSchema } from "@formily/react";

const form = createForm({
    initialValues: {
        input: "1",
        object: {
            input: "2",
        },
        test: {
            input: "3",
        },
    },
});

const BasePathField: FC = () => {
    const schema = useFieldSchema();
    const field = useField();

    return <RecursionField basePath={field.path.toString()} schema={schema} onlyRenderProperties />;
};

const Other: FC = () => (
    <Wrapper
        footer={
            <div>
                <p>文档中列出了一些常规特性</p>
                <ul>
                    <li>
                        6.1: 只有 <code>VoidField</code>、<code>ObjectField</code> 有 <code>children</code>
                        ；对于这部分建议查看：React.3: 复现 <code>Field</code>、React.4: 复现 <code>Schema</code>
                        了解更透彻
                    </li>
                    <li>6.2: 字段名是唯一的，重复声明相同的字段名后面的会覆盖前面的字段</li>
                </ul>
            </div>
        }
        form={form}
        header={<h2>core6.1-6.3: 字段特性</h2>}>
        <SchemaField components={{ BasePathField }}>
            <SchemaField.String name="input" x-component="Input" x-decorator="FormItem" />
            <SchemaField.Void name="void">
                <SchemaField.String name="input" x-component="Input" x-decorator="FormItem" />
            </SchemaField.Void>
            <SchemaField.Object name="object">
                <SchemaField.String name="input" x-component="Input" x-decorator="FormItem" />
            </SchemaField.Object>
            <SchemaField.Object name="test" x-component="BasePathField">
                <SchemaField.String name="input" x-component="Input" x-decorator="FormItem" />
            </SchemaField.Object>
        </SchemaField>
        <code className="consumer">
            <pre>
                <FormConsumer>{form => JSON.stringify(form.values, null, 2)}</FormConsumer>
            </pre>
        </code>
    </Wrapper>
);

export default Other;
