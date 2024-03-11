import { ArrayTable, Editable, FormItem, Input, Switch } from "@formily/antd-v5";
import { createSchemaField } from "@formily/react";

const SchemaField = createSchemaField({
    components: {
        ArrayTable,
        Editable,
        FormItem,
        Input,
        Switch,
    },
});

export const range = (count: number) =>
    Array.from(new Array(count)).map((_, key) => ({
        aaa: key,
    }));

export default SchemaField;
