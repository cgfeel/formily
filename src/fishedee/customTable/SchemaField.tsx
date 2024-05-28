import { FormItem, Input, NumberPicker } from "@formily/antd-v5";
import { createSchemaField } from "@formily/react";
import ArrayComponent from "./component/ArrayComponent";
import ArrayField from "./component/ArrayField";

const SchemaField = createSchemaField({
    components: {
        ArrayComponent,
        ArrayField,
        FormItem,
        Input,
        NumberPicker,
    },
});

export default SchemaField;
