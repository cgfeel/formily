import { Input } from "@formily/antd-v5";
import { createSchemaField } from "@formily/react";
import FormItem from "../../../components/formItem/form-item";
import Container from "./Container";

const SchemaField = createSchemaField({
  components: {
    Container,
    FormItem,
    Input,
  },
});

export default SchemaField;
