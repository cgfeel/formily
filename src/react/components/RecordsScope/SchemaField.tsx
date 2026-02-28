import { Input } from "@formily/antd-v5";
import { createSchemaField } from "@formily/react";
import FormItem from "../../../components/formItem/form-item";
import MyCustomComponent, { RecordType } from "./MyCustomComponent";

const renderTmp = (records: RecordType[]) => `${records[0].name} - ${records[0].code}`;

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    MyCustomComponent,
  },
});

export { renderTmp };

export default SchemaField;
