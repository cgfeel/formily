import { Input } from "@formily/antd-v5";
import { createSchemaField } from "@formily/react";
import FormItem from "../../../components/formItem/form-item";
import ArrayItmes from "./ArrayItmes";
import Custom from "./Custom";

const SchemaField = createSchemaField({
  components: {
    ArrayItmes,
    Custom,
    FormItem,
    Input,
  },
});

export default SchemaField;
