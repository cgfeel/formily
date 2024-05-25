import { ISchema, SchemaTypes } from "@formily/react";
import { FC, ReactNode, createContext, useContext } from "react";
import { ArrayField, Field, ObjectField } from "../customField/CustomField";
import { SchemaOptionsContext } from "./Schema";

const isField = (type?: SchemaTypes): type is keyof typeof FieldGroup => (type || "") in FieldGroup;
const isObjectField = (Field: object): Field is typeof ObjectField => Field === ObjectField;

const FieldSchemaContext = createContext<ISchema>({} as ISchema);
const FieldGroup = {
    array: ArrayField,
    number: Field,
    object: ObjectField,
    string: Field,
};

const RenderCom: FC<RecursionFieldProps> = ({ name: propsName, onlyRenderProperties, schema }) => {
    const options = useContext(SchemaOptionsContext);

    const type = String(schema.type || "");
    const Field = isField(type) ? FieldGroup[type] : void 0;

    if (Field === void 0) return null;
    if (["array", "object"].indexOf(type) >= 0 && onlyRenderProperties) {
        return <RenderProperties schemas={schema.properties} />;
    }

    const { format, name, required, title } = schema;

    const validatorRaw = schema["x-validator"] || [];
    const validator = Array.isArray(validatorRaw) ? validatorRaw : [];
    format && validator.push({ format });

    const attr = {
        component: [options[schema["x-component"]], schema["x-component-props"]],
        decorator: [options[schema["x-decorator"]], schema["x-component-props"]],
        name: name || propsName || "",
        required: required === void 0 ? required : Boolean(required),
        validator: validator.length ? validator : void 0,
        title,
    };

    return !isObjectField(Field) ? (
        <Field {...attr} />
    ) : (
        <Field {...attr}>
            <RenderProperties schemas={schema.properties} />
        </Field>
    );
};

//  渲染 Schema 节点的 property
const RenderProperties: FC<{ schemas: ISchema["properties"] }> = ({ schemas }) => {
    const result: ReactNode[] = [];
    typeof schemas === "object" &&
        Object.keys(schemas).forEach(key => result.push(<RecursionField key={key} name={key} schema={schemas[key]} />));

    return <>{result}</>;
};

const RecursionField: FC<RecursionFieldProps> = props => (
    <FieldSchemaContext.Provider value={props.schema}>
        <RenderCom {...props} />
    </FieldSchemaContext.Provider>
);

interface RecursionFieldProps {
    schema: ISchema;
    name?: string;
    onlyRenderProperties?: boolean;
}

export { FieldSchemaContext, RecursionField };
