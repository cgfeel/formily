import { Input } from "@formily/antd-v5";
import { createSchemaField } from "@formily/react";
import FormItem from "../../../components/formItem/form-item";
import MyCustomComponent, { RecordDataType } from "./MyCustomComponent";

const renderTmp = (record: RecordDataType, lookup?: RecordDataType, index?: number) =>
    `self: ${record.name} - ${record.code} - ${record.$index} | parent: ${record.$lookup?.name} - ${record.$lookup?.code} - ${record.$lookup?.$index} | lookup: ${lookup?.name} - ${lookup?.code} - ${lookup?.$index} | ${index}`;

const SchemaField = createSchemaField({
    components: {
        FormItem,
        Input,
        MyCustomComponent,
    },
});

export { renderTmp };

export default SchemaField;
