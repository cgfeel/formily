import { isArrayField } from "@formily/core";
import { Schema, useField, useFieldSchema } from "@formily/react";
import { SectionItem } from "./useFakeService";

const isUserGroup = (schema: Schema) => schema["x-component"] === "UserGroup";

export const usePanels = (schema: SelectSchema<SectionItem>) => {
    const list = schema.enum || [];
    return list.reduce<Record<string, Set<string>>>(
        (current, { name, section }) => {
            const item = current[section] || new Set();
            const value = name.trim();

            item.add(value);
            return {
                ...current,
                [section]: item
            };
        },
        {},
    );
};

export const useListValue = (list: readonly SectionItem[]) => {
    return list.reduce<Record<string, Set<string>>>(
        (current, { name, section }) => {
            const item = current[section] || new Set();
            const value = name.trim();

            item.add(value);
            return {
                ...current,
                [section]: item
            };
        },
        {},
    );
};

type A = Set<string>;

export const useSectionGroup = <T extends unknown = SectionItem>(schema: SelectSchema<T>) => {
    const items = Array.isArray(schema.items) ? schema.items[0] : schema.items;
    const list = items?.reduceProperties<Schema[], Schema[]>((buf, schema) => {
        const index = isUserGroup(schema) ? 1 : 0;
        buf[index] = schema;

        return buf;
    }, []);

    return list || [];
};

// formily 不支持泛型约束，这里通过断言强行纠正
export const useSelectSchema = <T extends unknown = SectionItem>() => {
    return useFieldSchema() as SelectSchema<T>;
};

export const useCollapseField = () => {
    const field = useField();
    const value = (isArrayField(field) ? field.value || [] : []) as SectionItem[];
    
    return [field, [...value]] as const;
};

export const useSchemaData = () => {
    const schema = useFieldSchema();
    const data = (schema['x-data'] || {}) as UserData;

    const { empty = false, group = [], name = "", section = "", values = [] } = data;
    return [schema, { empty, group, name, section, values }] as const;
};

export const useUserField = () => {
    const field = useField();
    const data = (field.data || {}) as UserData;

    const { empty = false, group = [], name = "", section = "", values = [] } = data;
    return [field, { empty, group, name, section, values }] as const;
};

export type UserData = Partial<Record<"name" | "section", string> & {
    empty: boolean;
    group: string[];
    values: string[];
}>;

type SelectSchema<T> = Omit<Schema<any, any, any, any, any, any, any, any, any>, 'enum'> & {
    enum?: T[]
};