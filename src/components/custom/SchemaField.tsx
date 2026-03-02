import { Input, Radio } from "@formily/antd-v5";
import { createSchemaField } from "@formily/react";
import { Card } from "antd";
import FormItem from "../formItem/form-item";
import PriceInterval from "../queryList/form/PriceInterval";
import ReactFormIte from "../react/components/FormItem";
import ReactInput from "../react/components/Input";
import IDUpload from "../register/components/IDUpload";

const SchemaField = createSchemaField({
  components: {
    Card,
    FormItem,
    IDUpload,
    Input,
    PriceInterval,
    Radio,
    ReactFormIte,
    ReactInput,
  },
});

export default SchemaField;
