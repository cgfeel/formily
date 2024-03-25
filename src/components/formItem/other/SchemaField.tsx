import { DatePicker, Input, NumberPicker, Radio, Select, Switch, TreeSelect } from "@formily/antd-v5";
import { createSchemaField } from "@formily/react";
import FormItem from "../../formItem/form-item";
import FormLayout from "../../formLayout/form-layout";
import Cascader from "../../cascader/cascader";

const SchemaField = createSchemaField({
    components: {
        Cascader,
        DatePicker,
        FormItem,
        FormLayout,
        Input,
        NumberPicker,
        Radio,
        Select,
        Switch,
        TreeSelect,
    },
});

export default SchemaField;
