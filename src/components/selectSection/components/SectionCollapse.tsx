import { SortableContainer, SortableElement, usePrefixCls } from "@formily/antd-v5/lib/__builtins__";
import {
    observer,
    RecordScope,
    RecursionField,
    Schema,
    useExpressionScope,
    useField,
    useFieldSchema,
} from "@formily/react";
import classNames from "classnames";
import { FC, forwardRef, HTMLAttributes, PropsWithChildren, ReactNode, useCallback, useMemo } from "react";
import PanelDecorator from "../com/PanelDecorator";
import SelectEmpty from "../com/SelectEmpty";
import SelectSkeleton from "../com/SelectSkeleton";
import {
    CollapseItem as CollapseItemType,
    CollapseSchema,
    LookupType,
    useCollapseField,
    useListValue,
    useSectionKey,
    useSelectSchema,
} from "../hooks/useSelectCollapse";
import CollapseItem, { RemoveUser, SortHandle } from "./CollapseItem";
import UserCheckBox, { UserFace, UserPanel } from "./UserCheckBox";
import UserGroup from "./UserGroup";
import { FieldPatternTypes, GeneralField, isArrayField, isField } from "@formily/core";
import { SectionItem } from "../hooks/useFakeService";

const fieldRange = {
    checkbox: "SectionCollapse.UserCheckBox",
    group: "SectionCollapse.UserGroup",
    remove: "SectionCollapse.Remove",
    sort: "SectionCollapse.SortHandle",
} as const;

const getItem = (schema: Schema) => (Array.isArray(schema.items) ? schema.items[0] : schema.items);
const isFieldSchema = (schema: Schema, component: string) => schema["x-component"] === component;

const useSortCollapse = (field: GeneralField, pattern: FieldPatternTypes, dataSource: CollapseItemType) => {
    const { $lookup } = useExpressionScope() as Pick<LookupType, "$lookup">;
    const { userMap } = $lookup || {};

    const updateHandle = useCallback(
        (data: SectionItem[]) => {
            if (isArrayField(field)) {
                const readPretty = pattern === "readPretty";
                if (!readPretty) {
                    field.dataSource = data;
                }

                const dataSource = readPretty ? data : field.value;
                field.setValue([...dataSource]);
            }
        },
        [field, pattern],
    );

    const sortHandle = useCallback(
        (index: string[]) => {
            if (userMap) {
                const uplist = index.reduce<SectionItem[]>((current, section) => {
                    const list = dataSource[section] || new Set();
                    list.forEach(name => {
                        const item = userMap[name];
                        if (item) current.push(item);
                    });

                    return current;
                }, []);
                updateHandle(uplist);
            } else {
                updateHandle([]);
            }
        },
        [dataSource, userMap, updateHandle],
    );

    return [sortHandle];
};

const CollapseWrapper: FC<PropsWithChildren<SectionCollapseProps & { field: GeneralField }>> = ({
    children,
    field,
    target,
    search = "",
}) => {
    const schema = useSelectSchema();
    const items = getItem(schema);

    const groupSchema = useMemo(
        () =>
            items?.reduceProperties<CollapseSchema, CollapseSchema>((addition, schema, key) => {
                let name: keyof typeof fieldRange | undefined;
                let field: ReactNode | undefined;

                for (name in fieldRange) {
                    if (name && isFieldSchema(schema, fieldRange[name])) {
                        field = <RecursionField name={key} schema={schema} />;
                        break;
                    }
                }

                return field === undefined || name === undefined ? addition : { ...addition, [name]: field };
            }, {}),
        [items],
    );

    const selectHandle: LookupType["selectHandle"] = useCallback(
        update => {
            field.form.notify("select-user", { ...update, path: target || field.path.entire });
        },
        [field, target],
    );

    return (
        <RecordScope
            getRecord={() => ({
                schema: groupSchema || {},
                pattern: schema["x-pattern"],
                search: search.toLowerCase(),
                selectHandle,
            })}>
            {children}
        </RecordScope>
    );
};

const InternalSection: FC<Pick<SectionCollapseProps, "activeKey">> = ({ activeKey = [] }) => {
    const { dataSource, field, value: fieldValue } = useCollapseField();
    const [activeIndex, updateActive] = useSectionKey(activeKey);

    console.log("a--dataSource", dataSource);

    const schema = useSelectSchema();
    const items = getItem(schema);

    const [panels] = useListValue([]);
    const [values] = useListValue(fieldValue);

    const SectionItem = useMemo(
        () => (items === undefined ? null : <RecursionField name="items" schema={items} onlyRenderSelf />),
        [items],
    );

    const pattern = field.pattern;
    const dataIndex = pattern === "readPretty" ? values : panels;

    const list = Object.keys(dataIndex);
    const [sortHandle] = useSortCollapse(field, pattern, dataIndex);

    return list.length === 0 ? (
        <RenderProperty match="SectionCollapse.SelectEmpty" schema={schema} />
    ) : (
        <SortableList
            list={list}
            onSortEnd={({ oldIndex, newIndex }) => {
                const index = list.splice(oldIndex, 1)[0];

                list.splice(newIndex, 0, index);
                sortHandle(list);
            }}>
            {list.map((section, index) => (
                <SortableItem key={`item-${index}`} lockAxis="y" index={index}>
                    <RecordScope
                        getRecord={() => ({
                            group: panels[section],
                            values: values[section] || new Set(),
                            section,
                            activeIndex,
                            updateActive,
                        })}>
                        {SectionItem}
                    </RecordScope>
                </SortableItem>
            ))}
        </SortableList>
    );
};

const RenderProperty: FC<RenderPropertyProps> = ({ match, schema }) => (
    <>
        {schema.reduceProperties(
            (addition, schema, key) =>
                isFieldSchema(schema, match) ? <RecursionField name={key} schema={schema} onlyRenderSelf /> : addition,
            null,
        )}
    </>
);

const SectionCollapseGroup: FC<SectionCollapseProps> = ({ activeKey, ...props }) => {
    const field = useField();
    const schema = useFieldSchema();
    const data = field.data || {};

    console.log("a--start", data.search?.items, data);

    if (!isArrayField(field) || (!field.loading && !field.dataSource)) {
        console.log("a--start-end", field);
        return <RenderProperty match="SectionCollapse.SelectEmpty" schema={schema} />;
    }

    return !field.loading ? (
        <CollapseWrapper {...props} field={field}>
            <InternalSection activeKey={activeKey} />
        </CollapseWrapper>
    ) : (
        <RenderProperty match="SectionCollapse.SelectSkeleton" schema={schema} />
    );
};

/*const SectionCollapseGroup: FC = () => {
    const field = useField();
    const schema = useFieldSchema();
    const data = field.data;

    console.log("a----start", data);
    return <></>;
    // return !isField(field) ? <></> : <input value={field.value} onChange={e => field.setValue(e.target.value)} />;
};*/

const Sortable = forwardRef<HTMLDivElement, PropsWithChildren<SortableProps> & { list?: boolean }>(
    ({ children, className, list, ...props }, ref) => {
        const prefixCls = usePrefixCls("section-collapse");

        return (
            <div
                {...props}
                ref={ref}
                className={classNames([
                    {
                        [`${prefixCls}-list`]: list,
                        [`${prefixCls}-item`]: !list,
                    },
                    className,
                ])}>
                {children}
            </div>
        );
    },
);

const SortableItem = SortableElement(({ children, ref, ...props }: PropsWithChildren<SortableProps>) => (
    <Sortable {...props} ref={elem => ref && ref(elem)}>
        {children}
    </Sortable>
));

const SortableList = SortableContainer(({ children, ...props }: PropsWithChildren<SortableProps>) => (
    <Sortable {...props} list={true}>
        {children}
    </Sortable>
));

export const SectionCollapse = Object.assign(observer(SectionCollapseGroup), {
    Remove: observer(RemoveUser),
    UserFace: observer(UserFace),
    UserPanel: observer(UserPanel),
    CollapseItem,
    PanelDecorator,
    SelectEmpty,
    SelectSkeleton,
    SortHandle,
    UserCheckBox,
    UserGroup,
});

export default SectionCollapse;

interface RenderPropertyProps {
    match: string;
    schema: Schema;
}

interface SectionCollapseProps {
    activeKey?: string[];
    search?: string;
    target?: string;
}

interface SortableProps extends HTMLAttributes<HTMLDivElement> {
    ref?: (node: HTMLElement | null) => void;
}
