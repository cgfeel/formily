import { FormItem, Input } from "@formily/antd-v5";
import { ArrayField, createForm } from "@formily/core";
import { FormProvider, RecursionField, createSchemaField, useField, useFieldSchema } from "@formily/react";
import { FC } from "react";

const ArrayComponent: FC = () => {
    const field = useField<ArrayField>();
    const schema = useFieldSchema();

    const items = schema.items;

    return items === undefined ? null : (
        <div>
            {field.value.map((_, index) => (
                <RecursionField schema={Array.isArray(items) ? items[0] : items} key={index} name={index} />
            ))}
        </div>
    );
};

const form = createForm({
    initialValues: {
        data: [1],
        data1: [2],
    },
});

const SchemaField = createSchemaField({
    components: {
        ArrayComponent,
        FormItem,
        Input,
    },
});

const ArrayTest: FC = () => (
    <>
        <FormProvider form={form}>
            <SchemaField>
                <SchemaField.Array name="data" x-component="ArrayComponent">
                    <SchemaField.String name="name" x-component="Input" x-decorator="FormItem" />
                </SchemaField.Array>
                <SchemaField.Array name="data1" x-component="ArrayComponent">
                    <SchemaField.Void name="name">
                        <SchemaField.String name="name" x-component="Input" x-decorator="FormItem" />
                    </SchemaField.Void>
                </SchemaField.Array>
            </SchemaField>
        </FormProvider>
    </>
);

export default ArrayTest;
