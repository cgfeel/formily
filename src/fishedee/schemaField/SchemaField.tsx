import { FormItem, FormLayout } from "@formily/antd-v5";
import { createSchemaField } from "@formily/react";
import Input from "../coreReactive/Input";
import InputDigit from "../coreReactive/InputDigit";
import VoidComponent from "../reactField/VoidComponent";
import ArrayItems from "./ArrayItems";

const SchemaField = createSchemaField({
    components: {
        ArrayItems,
        FormItem,
        FormLayout,
        Input,
        InputDigit,
        VoidComponent,
    },
});

export default SchemaField;
