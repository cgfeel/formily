import { GeneralField, isArrayField } from "@formily/core";
import { RecursionField, Schema, SchemaItems, useExpressionScope, useField, useFieldSchema } from "@formily/react";
import { CollapseProps, Typography } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import { SectionItem } from "./useFakeService";
import { SizeType } from "antd/es/config-provider/SizeContext";

const { Text } = Typography;

const isRemove = (schema: Schema) => schema["x-component"] === "SelectCollapse.UserCheckBox.Remove";
const isUserGroup = (schema: Schema) => schema["x-component"] === "SelectCollapse.UserGroup";

const getSectionSchema = (schema: Schema) => {
    const splitItem = () => {
        const items = Array.isArray(schema.items) ? schema.items[0] : schema.items;
        const list = items?.reduceProperties<Schema[], Schema[]>((buf, schema) => {
            const index = isUserGroup(schema) ? 1 : 0;
            buf[index] = schema;

            return buf;
        }, []);
        return list || [];
    };

    const [section, group] = splitItem();
    return {
        empty: group === undefined && section === undefined,
        group,
        section,
    };
};

export const isEmpty = (schema: Schema) => schema["x-component"] === "SelectCollapse.SelectEmpty";
export const isSkeleton = (schema: Schema) => schema["x-component"] === "SelectCollapse.SelectSkeleton";

export const useActiveKey = (search: string, panels: CollapseItem, initData: ActiveKeyItem | null = null) => {
    const [defaultKey, setDefaultKey] = useState<ActiveKeyItem | null>(initData);
    const [searchKey, setSearchKey] = useState<ActiveKeyItem | null>(null);

    const list = searchKey || defaultKey || {};
    const activeKey = useMemo(() => {
        const data = list || {};
        return Object.keys(data).filter(key => data[key]);
    }, [list]);

    // 将 string[] 转换成 ActiveKeyItem
    const reduceKeys = useCallback(
        (value: string[]) =>
            value.reduce<ActiveKeyItem>(
                (current, key) => (panels[key] === undefined ? current : { ...current, [key]: true }),
                {},
            ),
        [panels],
    );

    const setKeys = useCallback(search === "" ? setDefaultKey : setSearchKey, [search]);

    // 选择更新
    const chooseKey = useCallback(
        (value: string[]) => {
            const newData = reduceKeys(value);
            setKeys(items =>
                items === null
                    ? newData
                    : {
                          ...newData,
                          ...items,
                      },
            );
        },
        [reduceKeys, setKeys],
    );

    // 设置初始值，只能设置一次，适用于默认操作状态
    const initKey = useCallback(
        (value: string[]) => {
            setKeys(keys => keys || reduceKeys(value));
        },
        [setKeys],
    );

    // 手动更新值
    const updateKey = useCallback(
        (value: string[]) => {
            const newData = reduceKeys(value);
            setKeys(items => {
                if (items !== null) {
                    const record = Object.keys(items).reduce((current, key) => ({ ...current, [key]: false }), {});
                    return {
                        ...record,
                        ...newData,
                    };
                }
                return newData;
            });
        },
        [setKeys, reduceKeys],
    );

    // 一旦提供的范围不包含选择的值，将其删除
    useEffect(() => {
        const handle = (items: ActiveKeyItem | null) =>
            items === null
                ? items
                : Object.keys(items).reduce(
                      (current, key) => (panels[key] === undefined ? current : { ...current, [key]: items[key] }),
                      {},
                  );

        setDefaultKey(handle);
        setSearchKey(handle);
    }, [panels]);

    // searchKey 变更自动计算优先于手动更新
    useEffect(() => {
        setSearchKey(
            search === ""
                ? null
                : Object.keys(panels).reduce((current, section) => {
                      const snum = section.toLowerCase().indexOf(search) > -1 ? 1 : 0;
                      const unum = Array.from(panels[section]).join("").toLowerCase().indexOf(search) > -1 ? 2 : 0;
                      const total = snum + unum;
                      return total === 0
                          ? current
                          : {
                                ...current,
                                [section]: total !== 1,
                            };
                  }, {}),
        );
    }, [search]);

    // 优先
    return { activeKey, list, chooseKey, initKey, updateKey } as const;
};

export const useCollapseField = () => {
    const field = useField();
    const isArray = isArrayField(field);

    const value = (isArray ? field.value || [] : []) as SectionItem[];
    const dataSource = (isArray ? field.dataSource || [] : []) as SectionItem[];

    return { dataSource, field, value } as const;
};

export const useCollapseItems = () => {
    const { dataSource, field, value: fieldValue } = useCollapseField();
    const schema = useSelectSchema();

    const [panels] = useListValue(schema.enum || dataSource || []);
    const [values] = useListValue(fieldValue);

    const readPretty = schema["x-pattern"] === "readPretty";
    const { address } = field;

    const searchList = readPretty ? values : panels;
    const remove = useMemo(
        () => schema.reduceProperties((addition, schema) => (isRemove(schema) ? schema : addition), null),
        [schema],
    );

    const collapseItems: ItemType[] = useMemo(() => {
        const { empty, group, section } = getSectionSchema(schema);
        const sectionList = empty ? [] : Object.keys(searchList);
        return sectionList.map((key, i) => {
            const data = {
                group: Array.from(searchList[key]),
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
                        <Text type="secondary">({data.group.length})</Text>
                    </>
                ),
                key,
            };
        });
    }, [address, remove, searchList, values]);

    return { collapseItems, field, readPretty, remove, schema, searchList } as const;
};

export const useCollapseScope = () => {
    const {
        $lookup: { userMap = {} },
        $record: { readPretty = false, remove = null, search = "", size = "small" },
    } = (useExpressionScope() || {}) as CollapseScopeType;

    return { readPretty, remove, search, size, userMap } as const;
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

export const useSchemaData = () => {
    const schema = useFieldSchema();
    const data = (schema["x-data"] || {}) as UserData;

    const { empty = false, group = [], name = "", readPretty = false, section = "", values = [] } = data;
    return [schema, { empty, group, name, readPretty, section, values }] as const;
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

export const useUserField = () => {
    const field = useField();
    const data = (field.data || {}) as UserData;

    const { empty = false, group = [], name = "", section = "", values = [] } = data;
    return [field, { empty, group, name, section, values }] as const;
};

export type ActiveKeyItem = Partial<Record<string, boolean>>;

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
