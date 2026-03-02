import styled from "@emotion/styled";
import { Input, Space } from "@formily/antd-v5";
import { createSchemaField } from "@formily/react";
import FormItem from "../formItem/form-item";

const TextArea = styled(Input.TextArea)`
  width: 400px;
`;

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    Space,
    TextArea,
  },
});

export default SchemaField;
