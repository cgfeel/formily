import { FC } from "react";
import SchemaField from "../SchemaPropertyField";
import SingleSchema, { SingleSchemaProps } from "./SingleSchema";

const InputSchema: FC<InputSchemaProps> = ({ defaultValue, inputTitle, ...props }) => (
    <SingleSchema {...props}>
        <SchemaField.String
            default={defaultValue}
            name={`${props.name}-input`}
            title={inputTitle}
            x-component="Input"
            x-decorator="FormItem"
            x-component-props={{
                allowClear: true,
            }}
        />
    </SingleSchema>
);

export interface InputSchemaProps extends SingleSchemaProps {
    defaultValue?: string;
    inputTitle?: string;
}

export default InputSchema;
