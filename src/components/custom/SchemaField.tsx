import { Input, Radio } from "@formily/antd-v5";
import { createSchemaField } from "@formily/react";
import { Card } from "antd";
import FormItem from "../formItem/form-item";
import IDUpload from "../register/components/IDUpload";
import PriceInterval from "../queryList/form/PriceInterval";

const SchemaField = createSchemaField({
    components: {
        Card,
        FormItem,
        IDUpload,
        Input,
        PriceInterval,
        Radio,
    },
});

export default SchemaField;
