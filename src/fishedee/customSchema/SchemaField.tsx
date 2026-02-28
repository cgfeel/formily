import FormItem from "../customField/components/FormItem";
import VoidComponent from "../customField/components/VoidComponent";
import Input from "../coreReactive/Input";
import InputDigit from "../coreReactive/InputDigit";
import ArrayItem from "./ArrayItem";
import createSchemaField from "./Schema";

const SchemaField = createSchemaField({
  components: {
    ArrayItem,
    FormItem,
    Input,
    InputDigit,
    VoidComponent,
  },
});

export default SchemaField;
