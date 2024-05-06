import { ArrayField, Form, ObjectField } from "@formily/core";
import { IRecursionFieldProps, ISchemaFieldProps, RecursionField, useField, useFieldSchema } from "@formily/react";
import { FC, InputHTMLAttributes, PropsWithChildren } from "react";

export const ArrayComponent: FC = () => {
    const { value } = useField<ArrayField>();
    return (
        <div>
            {value.map((_, index) => (
                <Input key={index} value="" onChange={val => console.log(val)} />
            ))}
        </div>
    );
};

// 设置 onlyRenderProperties 时，不能设置 path 否则会无限循环
export const CustomObject: FC<CustomObjectProps> = ({ onlyRenderProperties, name = "object", ...props }) => {
    const field = useField();
    const schema = useFieldSchema();
    return (
        <div data-testid={name}>
            <RecursionField
                {...props}
                basePath={onlyRenderProperties ? field.address : undefined}
                name={onlyRenderProperties ? schema.name : undefined}
                schema={schema}
                onlyRenderProperties={onlyRenderProperties}
            />
        </div>
    );
};

export const IllegalObject: FC<{ schema: Record<never, unknown> | null }> = ({ schema = null }) => (
    <div data-testid="object">
        <RecursionField
            // @ts-ignore
            schema={schema}
        />
    </div>
);

export const Input: FC<InputProps> = ({ testid = "input", value = "", ...props }) => (
    <input {...props} data-testid={testid} value={value} />
);

export const ObjectComponent: FC = () => {
    const { value } = useField<ObjectField>();
    return (
        <div>
            {Object.keys(value || {}).map(key => (
                <Input key={key} value="" onChange={val => console.log(val)} />
            ))}
        </div>
    );
};

export const TextComponent: FC<PropsWithChildren<{ name?: string }>> = ({ children, name = "text-component" }) => (
    <div data-testid={name}>{children}</div>
);

export const VoidComponent: FC<PropsWithChildren> = ({ children }) => (
    <div data-testid="void-component">{children}</div>
);

export interface MarkupProps extends Pick<ISchemaFieldProps, "components" | "scope"> {
    form: Form;
}

interface CustomObjectProps
    extends Pick<
        IRecursionFieldProps,
        "filterProperties" | "mapProperties" | "onlyRenderProperties" | "onlyRenderSelf"
    > {
    name?: string;
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    testid?: string;
}
