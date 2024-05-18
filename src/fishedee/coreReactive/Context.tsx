import { observer } from "@formily/react";
import {
    CSSProperties,
    DOMAttributes,
    FC,
    HTMLInputTypeAttribute,
    PropsWithChildren,
    createContext,
    createElement,
    useContext,
} from "react";

function validate(data: any, validator: ValidatorType[]): string[] {
    const errors: string[] = [];
    validator.forEach(validatorItem => {
        const error = validatorItem(data);
        if (error !== "") errors.push(error);
    });
    return errors;
}

// 创建字段上下文，方便 FormItem 消费
const FieldContext = createContext<FieldType>({} as FieldType);

// 创建表单上下文，方便 Field 消费
const FormContext = createContext<FormType>({});

const FieldInner: FC<{ name: string }> = ({ name }) => {
    const form = useContext(FormContext);
    const field = form[name];

    if (!field.visible) return null;

    // 渲染字段，将字段状态和 UI 组件关联
    const component = createElement(field.component, {
        ...field.componentProps,
        value: field.value,
        onChange: field.onInput,
    });

    // 渲染字段包容器
    const decorator = createElement(field.decorator, field.decoratorProps, component);

    return <FieldContext.Provider value={field}>{decorator}</FieldContext.Provider>;
};

const Field = observer(FieldInner);

const FormProvider: FC<PropsWithChildren<{ form: FormType }>> = ({ children, form }) => (
    <FormContext.Provider value={form}>{children}</FormContext.Provider>
);

export interface DecoratorProps {
    style?: CSSProperties;
}

export interface InputProps extends Partial<Pick<FieldType, "value">> {
    disabled?: boolean;
    placeholder?: string;
    type?: HTMLInputTypeAttribute;
    onChange?: FieldType["onInput"];
}

export type FieldType<T extends any = any, P extends FC = FC<InputProps>, D extends FC = FC<DecoratorProps>> = {
    component: P;
    componentProps: Parameters<P>[0];
    decorator: D;
    decoratorProps: Parameters<D>[0];
    errors: string[];
    title: string;
    validator: ValidatorType<T>[];
    value: T;
    visible: boolean;
    onInput: DOMAttributes<HTMLInputElement>["onChange"];
};

export type FormType = {
    [key in string]: FieldType;
};

export { Field, FieldContext, FormContext, FormProvider, validate };

export type ValidatorType<T extends any = any> = (data: T) => string;
