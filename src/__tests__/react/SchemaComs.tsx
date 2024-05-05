import { ArrayField, ObjectField } from "@formily/core";
import { IRecursionFieldProps, RecursionField, useField, useFieldSchema } from "@formily/react";
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
export const CustomObject: FC<CustomObjectProps> = ({ name = "object", onlyRenderProperties = true }) => {
    const field = useField();
    const schema = useFieldSchema();
    return (
        <div data-testid={name}>
            <RecursionField
                basePath={onlyRenderProperties ? field.address : undefined}
                name={onlyRenderProperties ? schema.name : undefined}
                schema={schema}
                onlyRenderProperties={onlyRenderProperties}
            />
        </div>
    );
};

export const Input: FC<InputHTMLAttributes<HTMLInputElement>> = ({ value = "", ...props }) => (
    <input {...props} data-testid="input" value={value} />
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

interface CustomObjectProps extends Pick<IRecursionFieldProps, "onlyRenderProperties"> {
    name?: string;
}
