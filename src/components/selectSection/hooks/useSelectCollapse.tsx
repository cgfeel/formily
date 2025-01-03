import { GeneralField, isArrayField } from "@formily/core";
import { RecursionField, Schema, useExpressionScope, useField, useFieldSchema } from "@formily/react";
import { CollapseProps, Typography } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import { SectionItem } from "./useFakeService";
import { SizeType } from "antd/es/config-provider/SizeContext";

const { Text } = Typography;

const isRemove = (schema: Schema) => schema["x-component"] === "SelectCollapse.UserCheckBox.Remove";
const isUserGroup = (schema: Schema) => schema["x-component"] === "SelectCollapse.UserGroup";

export const isEmpty = (schema: Schema) => schema["x-component"] === "SelectCollapse.SelectEmpty";
export const isSkeleton = (schema: Schema) => schema["x-component"] === "SelectCollapse.SelectSkeleton";

export const useActiveKey = (field: GeneralField, readPretty: boolean, search: string, panels: CollapseItem) => {
    const [defaultKey, setDefaultKey] = useState<string[] | null>(null);
    const [searchKey, setSearchKey] = useState<string[]>([]);

    const value = isArrayField(field) ? field.value : [];
    const data = field.data;

    const activeKey = useMemo(() => (search === "" ? defaultKey || [] : searchKey), [defaultKey, search, searchKey]);
    const setActiveKey = useCallback(() => {}, [search]);

    useEffect(() => {
        if (search === "") {
            const items = readPretty ? value : data;
            if (defaultKey === null) {
                const index = (Array.isArray(items) ? items : [items || ""]).map(key => String(key));
                setDefaultKey(index.filter(item => !!item));
            } else if (defaultKey !== null && readPretty) {
                //
            }
        }
    }, [data, defaultKey, readPretty, search, value]);

    useEffect(() => {
        if (search !== "") {
            const index = Object.keys(panels).filter(key => panels[key].has(search));
            setSearchKey(index);
        } else {
            setSearchKey(list => (list.length === 0 ? list : []));
        }
    }, [panels, search]);

    return [activeKey];
};

export const useCollapseItems = (searchKey: string, panelsIsValue?: boolean) => {
    const { activeKey, dataSource, field, value: fieldValue } = useCollapseField();
    const schema = useSelectSchema();

    const [panels] = useListValue(panelsIsValue ? fieldValue : schema.enum || dataSource || []);
    const [values] = useListValue(fieldValue);

    const { items: schemaItems, ["x-pattern"]: pattern } = schema;
    const readPretty = pattern === "readPretty";
    const { address } = field;

    const search = searchKey.toLocaleLowerCase();
    const searchList = useMemo(
        () =>
            Object.keys(panels).filter(
                section =>
                    search === "" ||
                    section.toLowerCase().indexOf(search) > -1 ||
                    Array.from(panels[section]).join("").toLowerCase().indexOf(search) > -1,
            ),
        [panels, search],
    );

    const [section, group] = useMemo(() => {
        const items = Array.isArray(schemaItems) ? schemaItems[0] : schemaItems;
        const list = items?.reduceProperties<Schema[], Schema[]>((buf, schema) => {
            const index = isUserGroup(schema) ? 1 : 0;
            buf[index] = schema;

            return buf;
        }, []);
        return list || [];
    }, [schemaItems]);

    const empty = searchList.length === 0 || (group === undefined && section === undefined);
    const remove = schema.reduceProperties((addition, schema) => (isRemove(schema) ? schema : addition), null);

    const collapseItems: ItemType[] = useMemo(() => {
        const sectionList = empty ? [] : searchList;
        return sectionList.map((key, i) => {
            const data = {
                group: Array.from(panels[key]),
                section: key,
                values: values[key] === undefined ? [] : Array.from(values[key]),
            };
            return {
                children: (
                    <RecursionField
                        name={`group-${i}`}
                        basePath={address}
                        schema={{ ...group, "x-data": data }}
                        onlyRenderSelf
                    />
                ),
                extra: !remove ? null : (
                    <RecursionField
                        name={`remove-section-${i}`}
                        basePath={address}
                        schema={{ ...remove, "x-data": data }}
                        onlyRenderSelf
                    />
                ),
                label: (
                    <>
                        <RecursionField
                            name={`section-${i}`}
                            basePath={address}
                            schema={{ ...section, "x-data": data }}
                            onlyRenderSelf
                        />
                        <Text type="secondary">({panels[key].size})</Text>
                    </>
                ),
                key,
            };
        });
    }, [address, empty, group, panels, remove, searchList, section, values]);

    return { activeKey, collapseItems, empty, field, panels, readPretty, remove, schema, search } as const;
};

export const useListValue = (list: readonly SectionItem[]) => {
    const data = useMemo(
        () =>
            list.reduce<CollapseItem>((current, { name, section }) => {
                const item = current[section] || new Set();
                const value = name.trim();

                item.add(value);
                return {
                    ...current,
                    [section]: item,
                };
            }, {}),
        [list],
    );

    return [data];
};

export const useSectionGroup = <T extends unknown = SectionItem>({ items: schemaItems }: SelectSchema<T>) => {
    return useMemo(() => {
        const items = Array.isArray(schemaItems) ? schemaItems[0] : schemaItems;
        const list = items?.reduceProperties<Schema[], Schema[]>((buf, schema) => {
            const index = isUserGroup(schema) ? 1 : 0;
            buf[index] = schema;

            return buf;
        }, []);
        return list || [];
    }, [schemaItems]);
};

// formily 不支持泛型约束，这里通过断言强行纠正
export const useSelectSchema = <T extends unknown = SectionItem>() => {
    return useFieldSchema() as SelectSchema<T>;
};

export const useCollapseField = () => {
    const field = useField();
    const isArray = isArrayField(field);

    const value = (isArray ? field.value || [] : []) as SectionItem[];
    const dataSource = (isArray ? field.dataSource || [] : []) as SectionItem[];
    const activeKey = (field.data || []) as string[];

    return { activeKey, dataSource, field, value } as const;
};

export const useCollapseScope = () => {
    const {
        $lookup: { userMap = {} },
        $record: { readPretty = false, remove = null, search = "", size = "small" },
    } = (useExpressionScope() || {}) as CollapseScopeType;

    return { readPretty, remove, search, size, userMap } as const;
};

export const useSchemaData = () => {
    const schema = useFieldSchema();
    const data = (schema["x-data"] || {}) as UserData;

    const { empty = false, group = [], name = "", readPretty = false, section = "", values = [] } = data;
    return [schema, { empty, group, name, readPretty, section, values }] as const;
};

export const useUserField = () => {
    const field = useField();
    const data = (field.data || {}) as UserData;

    const { empty = false, group = [], name = "", section = "", values = [] } = data;
    return [field, { empty, group, name, section, values }] as const;
};

export type CollapseItem = Record<string, Set<string>>;

export type UserData = Partial<
    Record<"name" | "section", string> & {
        empty: boolean;
        group: string[];
        readPretty: boolean;
        values: string[];
    }
>;

type CollapseScopeType = {
    $lookup: {
        userMap?: Record<string, SectionItem>;
    };
    $record: {
        readPretty: boolean;
        remove?: Schema | null;
        search?: string;
        size?: SizeType;
    };
};

type ItemType = Exclude<CollapseProps["items"], undefined>[number];

type SelectSchema<T> = Omit<Schema<any, any, any, any, any, any, any, any, any>, "enum"> & {
    enum?: T[];
};
