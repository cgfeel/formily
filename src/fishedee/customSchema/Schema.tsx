import { ISchema } from "@formily/react";
import { Component, FC, FunctionComponent, PropsWithChildren, createContext, useContext } from "react";
import { RecursionField } from "./Context";

const RANGE = ["array", "number", "object", "string"];

const SchemaContext = createContext<ISchema>({} as ISchema);
const SchemaOptionsContext = createContext<SchemaOptionsInstance>({} as SchemaOptionsInstance);

function hasProperty<A extends Record<PropertyKey, any>, B extends PropertyKey>(obj: A, property: B): Boolean {
    return property in obj;
}

function has<A extends Record<PropertyKey, any>>(obj: A, data: A, property: PropertyKey): boolean {
    return hasProperty(obj, property) && hasProperty(data, property) && obj[property] === data[property];
}

const isAllowItems = <T extends ISchema["items"]>(items: T, data: T) => {
    if (typeof items !== "object") return true;
    if (typeof data !== "object") return false;

    const len = Object.keys(data).filter(key => !has(items, data, key));
    return len.length === 0;
};

// 1.对于 ArrayField 字段，children 就是 items，而其他字段不需要这个属性，所以剔除
// 2.对于 ArrayField 字段，properties 就是 children，不同的是 items 是第一项，其他都是 properties
// 3.对于 ObjectField 字段，字段，properties 就是 children，而其他字段不需要这个属性，所以剔除
const SchemaComponent: FC<PropsWithChildren<ISchema & { ignor?: boolean }>> = ({ children, ignor, ...props }) => {
    const parent = useContext(SchemaContext);
    const { name: nameRaw, type: typeRaw } = props;
    const name = String(nameRaw || "");
    const type = String(typeRaw || "");

    if (RANGE.indexOf(type) < 0) return null;

    // 不用转化数据，会在 RenderCom 最终转换
    // 但是不接受主动提交上来的 properties 和 items，而是收集 children
    const { items, type: ptype, properties } = parent;
    const data = { ...props, name, type };
    if (data.properties) delete data.properties;
    if (data.items) delete data.items;

    if (ptype === "array" && isAllowItems(items, data)) {
        parent.items = data;
    }
    if ((ptype === "array" && !isAllowItems(items, data)) || ptype === "object") {
        const prev = typeof properties === "object" ? properties || {} : {};
        parent.properties = { ...prev, [name]: data };
    }

    return ["array", "object"].indexOf(type) < 0 ? null : (
        <SchemaContext.Provider value={data}>{children}</SchemaContext.Provider>
    );
};

const createSchemaField = <T extends SchemaFieldProps["components"]>(props: CreateSchemaFieldProps<T>) => {
    const Schema: FC<PropsWithChildren<SchemaFieldProps>> = ({ children, components, schema }) => {
        const baseSchema = schema || {
            type: "object",
            properties: {},
        };
        return (
            <SchemaOptionsContext.Provider value={{ ...(props.components || {}), ...components }}>
                <SchemaContext.Provider value={baseSchema}>{children}</SchemaContext.Provider>
                <RecursionField schema={baseSchema} onlyRenderProperties />
            </SchemaOptionsContext.Provider>
        );
    };

    const ArrayJsx: FC<PropsWithChildren<SchemaJsxProps<T>>> = ({ children, ...props }) => (
        <SchemaComponent {...props} type="array">
            {children}
        </SchemaComponent>
    );
    const NumberJsx: FC<SchemaJsxProps<T>> = props => <SchemaComponent {...props} type="number" />;
    const ObjectJsx: FC<PropsWithChildren<SchemaJsxProps<T>>> = ({ children, ...props }) => (
        <SchemaComponent {...props} type="object">
            {children}
        </SchemaComponent>
    );
    const StringJsx: FC<SchemaJsxProps<T>> = props => <SchemaComponent {...props} type="string" />;

    return Object.assign(Schema, {
        Array: ArrayJsx,
        Number: NumberJsx,
        Object: ObjectJsx,
        String: StringJsx,
    });
};

interface CreateSchemaFieldProps<T> {
    components: T;
}

interface SchemaJsxProps<
    T extends SchemaFieldProps["components"],
    CNAME extends keyof T = keyof T,
    DNAME extends keyof T = keyof T,
> extends ISchema {
    ["x-component"]?: T extends undefined ? string : CNAME;
    ["x-decorator"]?: T extends undefined ? string : DNAME;
    ["x-component-props"]?: T[CNAME] extends FunctionComponent ? Parameters<T[CNAME]>[0] : Record<string, any>;
    ["x-decorator-props"]?: T[DNAME] extends FunctionComponent ? Parameters<T[DNAME]>[0] : Record<string, any>;
}

interface SchemaFieldProps {
    components?: SchemaOptionsInstance;
    schema?: ISchema;
}

export interface SchemaOptionsInstance {
    [name: string]: FunctionComponent | Component;
}

export { SchemaOptionsContext };

export default createSchemaField;
