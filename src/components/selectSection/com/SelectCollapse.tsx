import { FormCollapse } from "@formily/antd-v5";
import { usePrefixCls } from "@formily/antd-v5/lib/__builtins__";
import {
    createEffectHook,
    Form,
    FormPath,
    GeneralField,
    isArrayField,
    onFieldChange,
    onFieldReact,
    onFieldValueChange,
    onFormValuesChange,
} from "@formily/core";
import {
    RecordScope,
    RecursionField,
    Schema,
    observer,
    useExpressionScope,
    useField,
    useFieldSchema,
    useFormEffects,
} from "@formily/react";
import { Collapse, CollapseProps } from "antd";
import {
    FC,
    forwardRef,
    PropsWithChildren,
    useCallback,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from "react";
import useCollapseStyle from "../styles/collapse";
import {
    ActiveKeyItem,
    CollapseItem,
    isEmpty,
    isSkeleton,
    useActiveKey,
    useCollapseField,
    useCollapseItems,
    useListValue,
    useSectionGroup,
    useSelectSchema,
} from "../hooks/useSelectCollapse";
import classNames from "classnames";
import UserCheckBox from "./UserCheckBox";
import PanelDecorator from "./PanelDecorator";
import SelectSkeleton from "./SelectSkeleton";
import UserGroup from "./UserGroup";
import SelectEmpty from "./SelectEmpty";
import { createExpandCoolapse } from "../event";

const { CollapsePanel, createFormCollapse } = FormCollapse;

// 作为 empty、loading 的 property 渲染组件
const RenderProperty: FC<RenderPropertyProps> = ({ address, name, schema, match }) => (
    <>
        {schema.reduceProperties(
            (addition, schema) =>
                match(schema) ? (
                    <RecursionField basePath={address} name={name} schema={schema} onlyRenderSelf />
                ) : (
                    addition
                ),
            null,
        )}
    </>
);

// 主要用于计算 activeKey
const CollapseControl = forwardRef<CollapseControlInstance, PropsWithChildren<CollapseControlProps>>(
    ({ children, field, initData, items, readPretty, search, searchList, ...props }, ref) => {
        const { activeKey, list, chooseKey, updateKey } = useActiveKey(search, searchList, initData);
        const searchMap = useMemo(
            () =>
                Object.keys(searchList).reduce<Partial<Record<string, string[]>>>((current, lkey) => {
                    const item = current[lkey] || [];
                    return {
                        ...current,
                        [lkey.toLowerCase()]: item.concat(lkey),
                    };
                }, {}),
            [searchList],
        );

        const listMap = useMemo(
            () =>
                items?.filter(({ key }) => {
                    if (key === undefined) return false;
                    if (search === "") return list[String(key)] !== undefined;

                    const kname = String(key).toLowerCase();
                    const index = Object.keys(searchMap).reduce<string[]>(
                        (current, mkey) => current.concat(mkey.indexOf(kname) === -1 ? [] : searchMap[mkey] || []),
                        [],
                    );
                    const filterData = index.filter(sname => list[sname] !== undefined);
                    return filterData.length > 0;
                }),
            [items, list, search, searchMap],
        );

        useEffect(() => {
            if (readPretty && search === "") chooseKey(Object.keys(searchList));
        }, [readPretty, search, searchList, chooseKey]);

        useEffect(() => {
            field.form.notify("expand-handle", {
                expand: activeKey.length !== (listMap?.length || 0),
                path: field.path.entire,
            });
        }, [activeKey, listMap]);

        useImperativeHandle(
            ref,
            () => ({
                expand: show => {
                    const keys = show ? listMap?.map(({ key }) => String(key)) || [] : [];
                    updateKey(keys);
                },
            }),
            [listMap],
        );

        return (listMap || []).length === 0 ? (
            <>{children}</>
        ) : (
            <Collapse
                {...props}
                activeKey={activeKey}
                items={listMap}
                onChange={value => updateKey(Array.isArray(value) ? value : [value])}
            />
        );
    },
);

// ArrayField Comonent
const InternalFormCollapse: FC<FormCollapseProps> = ({
    className,
    bordered = false,
    expandIconPosition = "end",
    search: searchKey = "",
    ...props
}) => {
    const collapseRef = useRef<CollapseControlInstance>(null);
    const { collapseItems, field, readPretty, remove, schema, searchList, values } = useCollapseItems();

    const search = searchKey.toLowerCase();
    const { address, data } = field;

    const prefixCls = usePrefixCls("collapse");
    const [wrapSSR, hashId] = useCollapseStyle(prefixCls);

    const empty = useMemo(
        () => <RenderProperty name="empty" address={address} schema={schema} match={isEmpty} />,
        [address, schema],
    );

    const initData = useMemo(() => {
        if (!readPretty) {
            const initData = (Array.isArray(data) ? data : [data]).filter(i => i).map(item => String(item));
            return Object.keys(searchList).reduce<ActiveKeyItem>(
                (current, key) => ({ ...current, [key]: initData.indexOf(key) > -1 }),
                {},
            );
        }
        return null;
    }, [data, searchList]);

    useFormEffects(() => {
        const { entire } = field.path;
        const { onExpandCollapse, onSelectUserEvent } = createExpandCoolapse(String(entire));

        onExpandCollapse(expand => {
            collapseRef.current?.expand(expand);
        });
        onSelectUserEvent(({ group, section, checked = false }) => {
            if (isArrayField(field)) {
                const currentValue = field.value;

                // 添加也是先删后加
                const data = currentValue.filter(item => item.section !== section || group.indexOf(item.name) < 0);
                field.setValue(data.concat(!checked ? [] : group.map(name => ({ name, section }))));
            }
        });
    });

    return collapseItems.length === 0
        ? empty
        : wrapSSR(
              <RecordScope
                  getRecord={() => ({ readPretty, remove, search, values, size: props.size })}
                  getIndex={() => 2}>
                  <CollapseControl
                      {...props}
                      bordered={bordered}
                      className={classNames([hashId, className])}
                      expandIconPosition={expandIconPosition}
                      field={field}
                      initData={initData}
                      items={collapseItems}
                      readPretty={readPretty}
                      ref={collapseRef}
                      search={search}
                      searchList={searchList}>
                      {empty}
                  </CollapseControl>
              </RecordScope>,
          );
};

// 仅用于判断加载状态
const SectionFormCollapse: FC<FormCollapseProps> = props => {
    const field = useField();
    const schema = useFieldSchema();

    return !isArrayField(field) || !field.loading ? (
        <InternalFormCollapse {...props} />
    ) : (
        <RenderProperty address={field.address} name="loading" schema={schema} match={isSkeleton} />
    );
};

export const SelectCollapse = Object.assign(observer(SectionFormCollapse), {
    CollapsePanel,
    PanelDecorator,
    SelectEmpty,
    SelectSkeleton,
    UserCheckBox,
    UserGroup,
    createFormCollapse,
});

export default SelectCollapse;

export type UserItem = {
    name: string;
    section: string;
};

interface CollapseControlInstance {
    expand: (show: boolean) => void;
}

interface CollapseControlProps extends Omit<CollapseProps, "activeKey" | "onChange"> {
    field: GeneralField;
    initData: ActiveKeyItem | null;
    readPretty: boolean;
    search: string;
    searchList: CollapseItem;
}

interface FormCollapseProps extends Omit<CollapseProps, "activeKey" | "items" | "onChange" | "search"> {
    data?: string[];
    search?: string;
}

interface RenderPropertyProps {
    address: FormPath;
    name: string;
    schema: Schema;
    match: (schema: Schema) => Boolean;
}
