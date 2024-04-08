import { FormGrid, Input, Select, Switch } from "@formily/antd-v5";
import { createSchemaField } from "@formily/react";
import FormItem from "../../components/formItem/form-item";

const SchemaField = createSchemaField({
    components: { 
        FormItem,
        Input
    }
});

const ToolSchema = createSchemaField({
    components: {
        FormGrid,
        FormItem,
        Select,
        Switch,
    }
});

export { SchemaField, ToolSchema };

export default SchemaField;