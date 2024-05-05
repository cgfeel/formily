import { ArrayField, ObjectField } from "@formily/core";
import { useField } from "@formily/react";
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
