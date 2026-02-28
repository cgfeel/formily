import { ArrayField, Field, Form, isArrayField } from "@formily/core";
import { IProviderProps, observer } from "@formily/react";
import {
  Attributes,
  FC,
  MemoExoticComponent,
  PropsWithChildren,
  ReactNode,
  createContext,
  createElement,
  useContext,
} from "react";

const isCreateChildren = (field: Field, target: any): target is ReactNode => {
  return !isArrayField(field) && target !== void 0;
};

const isCreateType = (target: any): target is Parameters<typeof createElement>[0] => {
  const type = typeof target;
  return type === "string" || type === "function" || isMemoComponent(target);
};

function isMemoComponent(component: any): component is MemoExoticComponent<any> {
  return typeof component === "object" && component.$$typeof === Symbol.for("react.memo");
}

// 创建上下文，方便 FormItem 消费
const FieldContext = createContext<Field>({} as Field);

// 创建上下文，方便 Form 消费
const FormContext = createContext<Form>({} as Form);

const FormConsumerInner: FC<FormConsumerProps> = ({ children }) => {
  const form = useContext(FormContext);
  return <>{children(form)}</>;
};

const FormProviderInner: FC<PropsWithChildren<IProviderProps>> = ({ children, form }) => (
  <FormContext.Provider value={form}>{children}</FormContext.Provider>
);

type ChildrenFn = (index: number) => ReactNode;

// 状态桥接组件
const ReactiveField = <F extends Field>({ children, field, attr = {} }: ReactiveFieldProps<F>) => {
  if (!field.visible) return null;

  const componetRaw = Array.isArray(field.component) ? field.component[0] : field.component;
  const attrData = Object.assign(
    {
      ...field.componentProps,
      ...attr,
    },
    isArrayField(field) ? { children } : void 0,
  );

  const component = !isCreateType(componetRaw)
    ? null
    : isCreateChildren(field, children)
      ? createElement(componetRaw, attrData, children)
      : createElement(componetRaw, attrData);

  const decoratorRaw = Array.isArray(field.decorator) ? field.decorator[0] : field.decorator;
  const decorator = !isCreateType(decoratorRaw)
    ? null
    : createElement(decoratorRaw, field.decoratorProps, component);

  return <FieldContext.Provider value={field}>{decorator || component}</FieldContext.Provider>;
};

const FormConsumer = observer(FormConsumerInner);
const FormProvider = observer(FormProviderInner);

interface FormConsumerProps {
  children: (form: Form) => ReactNode;
}

interface ReactiveFieldProps<F> {
  children?: F extends ArrayField ? ChildrenFn : ReactNode;
  field: F;
  attr?: Attributes & { value?: any; onChange?: (...args: any[]) => void };
}

export { FieldContext, FormConsumer, FormContext, FormProvider, ReactiveField };
