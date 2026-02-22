import { GeneralField, isArrayField } from "@formily/core";
import {
  RecursionField,
  Schema,
  useExpressionScope,
  useField,
  useFieldSchema,
} from "@formily/react";
import { CollapseProps, Typography } from "antd";
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { SectionItem } from "./useFakeService";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { PayloadType, SectionDataType, SectionType } from "../event";

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

export const defaultItem = { expand: new Set<string>(), items: [] };

export const isEmpty = (schema: Schema) => schema["x-component"] === "SelectCollapse.SelectEmpty";
export const isSkeleton = (schema: Schema) =>
  schema["x-component"] === "SelectCollapse.SelectSkeleton";

export const useActiveKey = (
  search: string,
  panels: CollapseItem,
  initData: ActiveKeyItem | null = null,
) => {
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
          const record = Object.keys(items).reduce(
            (current, key) => ({ ...current, [key]: false }),
            {},
          );
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
            (current, key) =>
              panels[key] === undefined ? current : { ...current, [key]: items[key] },
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
            const unum =
              Array.from(panels[section]).join("").toLowerCase().indexOf(search) > -1 ? 2 : 0;
            const total = snum + unum;
            return total === 0
              ? current
              : {
                  ...current,
                  [section]: total > 1,
                };
          }, {}),
    );
  }, [panels, search]);

  return { activeKey, list, chooseKey, initKey, updateKey } as const;
};

export const useSectionKey = (keys: string[]) => {
  const [activeIndex, setActiveIndex] = useState(keys.reverse());
  const updateActive = useCallback((key: string, expand: boolean = true) => {
    // 1. 存在数据：删除或调整顺序；2.没有更新：调整顺序
    setActiveIndex(keys => {
      const index = keys.filter(name => name !== key);
      const addition = expand ? [key] : [];

      return addition.concat(index);
    });
  }, []);

  useEffect(() => {
    setActiveIndex(index => {
      const current = index.sort().join("");
      return current === keys.sort().join("") ? index : keys;
    });
  }, [keys]);

  return [activeIndex, updateActive] as const;
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
    () =>
      schema.reduceProperties((addition, schema) => (isRemove(schema) ? schema : addition), null),
    [schema],
  );

  const collapseItems: ItemType[] = useMemo(() => {
    const { empty, group, section } = getSectionSchema(schema);
    const sectionList = empty ? [] : Object.keys(searchList);

    return sectionList.map((key, i) => {
      const data = {
        group: Array.from(searchList[key]),
        section: key,
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
  }, [address, remove, searchList]);

  return { collapseItems, field, readPretty, remove, schema, searchList, values } as const;
};

export const useSectionRecord = (field: GeneralField) => {
  const fieldData = (field.data ?? {}) as SectionDataType;
  const { list, search, searchKey } = fieldData;
  const record = useMemo(() => {
    const info = searchKey ? search : list;
    return info ?? { ...defaultItem };
  }, [list, search, searchKey]);

  // 删除：dataSource 默认列表，value 字段值，如果有搜索连同一块删除
  const deleteSection: CollapseLookupType["deleteSection"] = useCallback(
    group => {
      const keys = ["list", "search"] as const;
      const filter = (items: SectionItem[]) =>
        items.filter(({ name }) => group.indexOf(name) === -1);

      const record = keys.reduce<Partial<Record<"list" | "search", SectionType>>>(
        (current, key) => {
          const info = fieldData[key];
          const expand = new Set<string>();

          const defaultData = key === "search" ? undefined : { ...defaultItem };
          const items = info === undefined ? [] : filter(info.items);

          if (info !== undefined) {
            items.forEach(({ section }) => info.expand.has(section) && expand.add(section));
          }

          return {
            ...current,
            [key]:
              items.length === 0
                ? defaultData
                : {
                    expand,
                    items,
                  },
          };
        },
        {},
      );

      if (isArrayField(field)) {
        field.value = filter(field.value);
      }

      field.data = {
        ...fieldData,
        ...record,
      };
    },
    [fieldData, field],
  );

  // 展开、收起：有搜索的情况优先设置搜索，否则设置默认列表
  const updateActive: CollapseLookupType["updateActive"] = useCallback(
    (key, expand = true) => {
      const name = fieldData.searchKey ? "search" : "list";
      record.expand[expand ? "add" : "delete"](key);

      field.data = {
        ...fieldData,
        [name]: record,
      };
    },
    [fieldData, field, record],
  );

  return Object.freeze({ data: fieldData, record, deleteSection, updateActive });
};

export const useGroupScope = () => {
  const { $lookup, $record, $records: records } = useExpressionScope() as GroupScopeType;
  const { expand, group, section, values } = $record ?? {};
  const { $lookup: parent, pattern, schema, search, deleteSection, updateActive } = $lookup ?? {};
  const { userMap } = parent || {};

  return Object.freeze({
    expand,
    group,
    pattern,
    records,
    schema,
    search,
    section,
    userMap,
    values,
    deleteSection,
    updateActive,
  });
};

// redel
export const useSectionScope = () => {
  const { $lookup, $record, $records: records } = useExpressionScope() as SectionScopeType;
  const { activeIndex, group, values, section, updateActive } = $record || {};
  const { $lookup: parent, pattern, schema, search, selectHandle } = $lookup || {};
  const { userMap } = parent || {};

  return {
    activeIndex,
    group,
    pattern,
    records,
    schema,
    search,
    section,
    userMap,
    values,
    updateActive,
    selectHandle,
  } as const;
};

export const useCollapseScope = () => {
  const {
    $lookup: { userMap = {} },
    $record: { readPretty = false, remove = null, search = "", size = "small", values = {} },
  } = (useExpressionScope() || {}) as CollapseScopeType;

  return { values, readPretty, remove, search, size, userMap } as const;
};

export const useListValue = (list: SectionItem[]) => {
  const data = useMemo(
    () =>
      list.reduce<CollapseItem>((current, { name, section }) => {
        const item = current[section] ?? new Set();
        const value = name.trim();

        item.add(value);
        return {
          ...current,
          [section]: item,
        };
      }, {}),
    [list],
  );

  return Object.freeze([data]);
};

export const useListValueRecord = (list: SectionItem[]) => {
  const [data, setData] = useState<CollapseItem>({});
  const sort = useCallback(
    (list: string[]) => {
      const record = list.reduce<CollapseItem>(
        (current, key) => (data[key] === undefined ? current : { ...current, [key]: data[key] }),
        {},
      );
      setData(record);
    },
    [data],
  );

  useEffect(() => {
    const reduceList = () =>
      list.reduce<CollapseItem>((current, { name, section }) => {
        const item = current[section] || new Set();
        const value = name.trim();

        item.add(value);
        return {
          ...current,
          [section]: item,
        };
      }, {});

    setData(data => (list.length === 0 && Object.keys(data).length === 0 ? data : reduceList()));
  }, [list]);

  return [data, sort] as const;
};

export const useSchemaData = () => {
  const schema = useFieldSchema();
  const data = (schema["x-data"] || {}) as UserData;

  const { empty = false, group = [], name = "", readPretty = false, section = "" } = data;
  return [schema, { empty, group, name, readPretty, section }] as const;
};

export const useSectionGroup = <T extends unknown = SectionItem>({
  items: schemaItems,
}: SelectSchema<T>) => {
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

export type ActiveKeyItem = Partial<Record<string, boolean>>;

export type CollapseItem = Record<string, Set<string>>;

export type CollapseLookupType = {
  $lookup: {
    userMap?: Record<string, SectionItem>;
  };
  pattern: SelectSchema<SectionItem>["x-pattern"];
  schema: CollapseSchema;
  search: string;
  deleteSection: (section: string[]) => void;
  updateActive: (key: string, expand?: boolean) => void;
};

export type CollapseSchema = Partial<Record<"checkbox" | "group" | "sort" | "remove", ReactNode>>;

export type LookupType = {
  $lookup: {
    userMap?: Record<string, SectionItem>;
  };
  activeKeys: string[];
  pattern: SelectSchema<SectionItem>["x-pattern"];
  schema: CollapseSchema;
  search: string;
  selectHandle: (data: PayloadType) => void;
};

export type SelectSchema<T> = Omit<
  Schema<any, any, any, any, any, any, any, any, any>,
  "enum" | "x-pattern"
> & {
  enum?: T[];
  ["x-pattern"]: "disabled" | "editable" | "readOnly" | "readPretty";
};

export type UserData = Partial<
  Record<"name" | "section", string> & {
    empty: boolean;
    group: string[];
    readPretty: boolean;
  }
>;

type CollapseScopeType = {
  $lookup: {
    userMap?: Record<string, SectionItem>;
  };
  $record: {
    readPretty: boolean;
    values: CollapseItem;
    remove?: Schema | null;
    search?: string;
    size?: SizeType;
  };
};

type ItemType = Exclude<CollapseProps["items"], undefined>[number];

type SectionScopeType = {
  $lookup?: LookupType;
  $record?: {
    activeIndex: string[];
    group: Set<string>;
    section: string;
    values: Set<string>;
    updateActive: (key: string, expand?: boolean) => void;
  };
  $records?: string[];
};

type GroupScopeType = {
  $lookup?: CollapseLookupType;
  $record?: {
    expand: boolean;
    group: Set<string>;
    section: string;
    values: Set<string>;
  };
  $records?: string[];
};
