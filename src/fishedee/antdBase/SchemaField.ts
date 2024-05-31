import { 
    Checkbox, 
    DatePicker, 
    FormItem, 
    Input, 
    NumberPicker, 
    Password, 
    Radio, 
    Select, 
    Switch, 
    TimePicker, 
    TreeSelect 
} from "@formily/antd-v5";
import { createSchemaField } from "@formily/react";
import VoidComponent from "../reactField/VoidComponent";

const SchemaField = createSchemaField({
    components: {
        Checkbox,
        DatePicker,
        FormItem,
        Input,
        NumberPicker,
        Password,
        Radio,
        Select,
        Switch,
        TimePicker,
        TreeSelect,
        VoidComponent,
    }
});

export default SchemaField;
