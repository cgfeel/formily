import { ArrayField, Form, ObjectField } from "@formily/core";
import {
  IRecursionFieldProps,
  ISchemaFieldProps,
  RecursionField,
  useField,
  useFieldSchema,
} from "@formily/react";
import { DOMAttributes, FC, InputHTMLAttributes, PropsWithChildren } from "react";

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

export const Button: FC<PropsWithChildren<ButtonProps>> = ({
  children,
  disabled,
  value,
  onChange,
  onClick,
  testid = "btn",
}) => (
  <button disabled={disabled} data-testid={testid} onClick={e => onClick && onClick(e, onChange)}>
    {children}
    {value}
  </button>
);

// 没有设置 onlyRenderProperties 时，不能设置 path 否则会无限循环
export const CustomObject: FC<CustomObjectProps> = ({
  onlyRenderProperties,
  name = "object",
  ...props
}) => {
  const field = useField();
  const schema = useFieldSchema();
  return (
    <div data-testid={name}>
      <RecursionField
        {...props}
        basePath={onlyRenderProperties ? field.address : void 0}
        name={onlyRenderProperties ? schema.name : void 0}
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

export const TextComponent: FC<PropsWithChildren<{ name?: string }>> = ({
  children,
  name = "text-component",
}) => <div data-testid={name}>{children}</div>;

export const VoidComponent: FC<PropsWithChildren> = ({ children }) => (
  <div data-testid="void-component">{children}</div>
);

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  testid?: string;
}

export interface MarkupProps
  extends Pick<ISchemaFieldProps, "components" | "name" | "schema" | "scope"> {
  form: Form;
}

interface ButtonProps<
  T extends DOMAttributes<HTMLButtonElement> = DOMAttributes<HTMLButtonElement>,
  V = any,
> {
  disabled?: true;
  testid?: string;
  value?: V;
  onClick?: (
    event: Parameters<Exclude<T["onClick"], undefined>>[0],
    onChange?: OnChangeType<V>,
  ) => void;
  onChange?: OnChangeType<V>;
}

interface CustomObjectProps
  extends Pick<
    IRecursionFieldProps,
    | "filterProperties"
    | "mapProperties"
    | "onlyRenderProperties"
    | "propsRecursion"
    | "onlyRenderSelf"
  > {
  name?: string;
}

type OnChangeType<T extends any = any> = (val: T) => void;
