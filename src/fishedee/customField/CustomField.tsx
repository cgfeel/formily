import { IFieldProps, JSXComponent } from "@formily/core";
import { observer } from "@formily/react";
import { FC, PropsWithChildren, useContext, useId } from "react";
import { FieldContext, FormContext, ReactiveField } from "./Context";

const FieldInner = <
    Decorator extends JSXComponent = any,
    Component extends JSXComponent = any,
    TextType = any,
    ValueType = any,
>({
    children,
    ...props
}: PropsWithChildren<IFieldProps<Decorator, Component, TextType, ValueType>>): ReturnType<FC> => {
    const form = useContext(FormContext);
    const parent = useContext(FieldContext);

    const name = props.name || useId();
    const field = form.createObjectField({
        ...props,
        name: name,
        basePath: parent?.address,
    });

    return (
        <ReactiveField attr={{ value: field.value, onChange: field.onInput }} field={field}>
            {children}
        </ReactiveField>
    );
};

const ObjectFieldInner = <
    Decorator extends JSXComponent = any,
    Component extends JSXComponent = any,
    TextType = any,
    ValueType = any,
>({
    children,
    ...props
}: PropsWithChildren<IFieldProps<Decorator, Component, TextType, ValueType>>): ReturnType<FC> => {
    const form = useContext(FormContext);
    const parent = useContext(FieldContext);

    const name = props.name || useId();
    const field = form.createObjectField({
        ...props,
        name: name,
        basePath: parent?.address,
    });

    return <ReactiveField field={field}>{children}</ReactiveField>;
};

const Field = observer(FieldInner);
const ObjectField = observer(ObjectFieldInner);

export { Field, ObjectField };
