import { DatePicker, Radio } from "@formily/antd-v5";
import { createSchemaField } from "@formily/react";
import FormItem from "../formItem/form-item";

const SchemaField = createSchemaField({
  components: {
    DatePicker,
    FormItem,
    Radio,
  },
});

export default SchemaField;
