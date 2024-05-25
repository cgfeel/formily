import { IFieldProps, JSXComponent } from "@formily/core";
import { observer } from "@formily/react";
import { FC, PropsWithChildren, ReactNode, useContext, useId } from "react";
import { FieldContext, FormContext, ReactiveField } from "./Context";

const EmptyComponent: FC<PropsWithChildren> = ({ children }) => <>{children}</>;

const ArrayFieldInner = <
    Decorator extends JSXComponent = any,
    Component extends JSXComponent = any,
    TextType = any,
    ValueType = any,
>({
    children,
    ...props
}: ArrayFieldProps<Decorator, Component, TextType, ValueType>): ReturnType<FC> => {
    const form = useContext(FormContext);
    const parent = useContext(FieldContext);

    const attr = Object.assign({ name: useId() }, props, { basePath: parent?.address });
    const field = form.createArrayField(attr);

    return (
        <ReactiveField attr={{ value: field.value, onChange: field.onInput }} field={field}>
            {children}
        </ReactiveField>
    );
};

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

    const attr = Object.assign({ name: useId() }, props, { basePath: parent?.address });
    const field = form.createField(attr);

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

    const attr = Object.assign({ name: useId() }, props, { basePath: parent?.address });
    const field = form.createObjectField(attr);
    // console.log(attr);

    if (Array.isArray(field.component) && field.component[0] === void 0) field.component[0] = EmptyComponent;

    return <ReactiveField field={field}>{children}</ReactiveField>;
};

const ArrayField = observer(ArrayFieldInner);
const Field = observer(FieldInner);
const ObjectField = observer(ObjectFieldInner);

interface ArrayFieldProps<
    Decorator extends JSXComponent = any,
    Component extends JSXComponent = any,
    TextType = any,
    ValueType = any,
> extends IFieldProps<Decorator, Component, TextType, ValueType>,
        ArrayProps {}

export interface ArrayProps {
    children?: (index: number) => ReactNode;
}

export { ArrayField, Field, ObjectField };
