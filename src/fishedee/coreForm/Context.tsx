import { Field as FieldRaw, Form, IFieldProps, JSXComponent } from "@formily/core";
import { IProviderProps, observer } from "@formily/react";
import { FC, MemoExoticComponent, PropsWithChildren, createContext, createElement, useContext } from "react";

const isCreateType = (target: any): target is Parameters<typeof createElement>[0] => {
    const type = typeof target;
    return type === "string" || type === "function" || isMemoComponent(target);
};

function isMemoComponent(component: any): component is MemoExoticComponent<any> {
    return typeof component === "object" && component.$$typeof === Symbol.for("react.memo");
}

const FieldContext = createContext<FieldRaw>({} as FieldRaw);
const FormContext = createContext<Form>({} as Form);

const FieldInner = <
    Decorator extends JSXComponent = any,
    Component extends JSXComponent = any,
    TextType = any,
    ValueType = any,
>(
    props: IFieldProps<Decorator, Component, TextType, ValueType>,
): ReturnType<FC> => {
    const form = useContext(FormContext);
    const field = form.createField(props);

    if (!field.visible) return null;

    const componetRaw = Array.isArray(field.component) ? field.component[0] : field.component;
    const decoratorRaw = Array.isArray(field.decorator) ? field.decorator[0] : field.decorator;
    const { componentProps, decoratorProps } = field;

    const attr: Record<string, any> = {
        ...componentProps,
        value: field.value,
        onChange: field.onInput,
    };

    // 渲染字段，将字段状态 UI 组件关联
    const component = !isCreateType(componetRaw) ? null : createElement(componetRaw, attr);

    const decorator = !isCreateType(decoratorRaw) ? null : createElement(decoratorRaw, decoratorProps, component);
    return <FieldContext.Provider value={field}>{decorator}</FieldContext.Provider>;
};

const FormProvider: FC<PropsWithChildren<IProviderProps>> = ({ children, form }) => (
    <FormContext.Provider value={form}>{children}</FormContext.Provider>
);

const Field = observer(FieldInner);

export { Field, FieldContext, FormContext, FormProvider };
