import { FC } from "react";
import SchemaField from "../SchemaPropertyField";
import DescItemSchema, { DescItemSchemaProps } from "./DescItemSchema";

const SingleSchema: FC<SingleSchemaProps> = props => (
    <DescItemSchema {...props}>
        <SchemaField.String
            name={`${props.name}-input`}
            title="输出"
            x-component="Input"
            x-decorator="FormItem"
            x-pattern="readPretty"
            x-reactions="{{fieldData($self)}}"
        />
    </DescItemSchema>
);

export interface SingleSchemaProps extends DescItemSchemaProps {}

export default SingleSchema;
