import { SortableContainer, SortableElement, usePrefixCls } from "@formily/antd-v5/lib/__builtins__";
import { observer, RecordScope, RecursionField, Schema, useField, useFieldSchema } from "@formily/react";
import classNames from "classnames";
import { FC, forwardRef, HTMLAttributes, PropsWithChildren, ReactNode, useCallback, useMemo } from "react";
import PanelDecorator from "../com/PanelDecorator";
import SelectEmpty from "../com/SelectEmpty";
import SelectSkeleton from "../com/SelectSkeleton";
import {
    CollapseItem as CollapseItemType,
    CollapseLookupType,
    CollapseSchema,
    LookupType,
    useListValue,
    useSectionRecord,
} from "../hooks/useSelectCollapse";
import CollapseItem, { RemoveUser, SortHandle } from "./CollapseItem";
import UserCheckBox, { UserFace, UserPanel } from "./UserCheckBox";
import UserGroup from "./UserGroup";
import { ArrayField, FieldPatternTypes, GeneralField, isArrayField, isField } from "@formily/core";
import { SectionItem } from "../hooks/useFakeService";
import { SectionDataType, SectionType } from "../event";

const fieldRange = {
    checkbox: "SectionCollapse.UserCheckBox",
    group: "SectionCollapse.UserGroup",
    remove: "SectionCollapse.Remove",
    sort: "SectionCollapse.SortHandle",
} as const;

const getItem = (schema: Schema) => (Array.isArray(schema.items) ? schema.items[0] : schema.items);
const isFieldSchema = (schema: Schema, component: string) => schema["x-component"] === component;

const useSortCollapse = (field: GeneralField, dataSource: CollapseItemType, userMap: SectionDataType["userMap"]) => {
    const updateHandle = useCallback(
        (data: SectionItem[]) => {
            if (isArrayField(field)) {
                // const readPretty = pattern === "readPretty";
                field.dataSource = data;
                /*if (!readPretty) {
                    field.dataSource = data;
                }

                const dataSource = readPretty ? data : field.value;
                field.setValue([...dataSource]);*/
            }
        },
        [field],
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

const CollapseWrapper: FC<PropsWithChildren<CollapseWrapperProps>> = ({
    children,
    field,
    items,
    pattern,
    deleteSection,
    updateActive,
    search = "",
}) => {
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
            // field.form.notify("select-user", { ...update, path: target || field.path.entire });
        },
        [field],
    );

    return (
        <RecordScope
            getRecord={() => ({
                schema: groupSchema || {},
                pattern: pattern,
                search: search.toLowerCase(),
                deleteSection,
                selectHandle,
                updateActive,
            })}>
            {children}
        </RecordScope>
    );
};

const InternalSection: FC<PropsWithChildren<InternalSectionProps>> = ({ children, empty, field, record, userMap }) => {
    console.log("a----record-data", record);
    const [dataIndex] = useListValue(record.items);
    const [values] = useListValue(field.value);

    const [sortHandle] = useSortCollapse(field, dataIndex, userMap);
    const index = Object.keys(dataIndex);

    return index.length === 0 ? (
        <>{empty}</>
    ) : (
        <SortableList
            list={index}
            onSortEnd={({ oldIndex, newIndex }) => {
                const current = index.splice(oldIndex, 1)[0];

                index.splice(newIndex, 0, current);
                sortHandle(index);
            }}>
            {index.map((section, index) => (
                <SortableItem key={`item-${index}`} lockAxis="y" index={index}>
                    <RecordScope
                        getRecord={() => ({
                            expand: record.expand.has(section),
                            group: dataIndex[section],
                            values: values[section] || new Set(),
                            section,
                            // activeIndex,
                            // updateActive,
                        })}>
                        {children}
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

const SectionCollapseGroup: FC = () => {
    const field = useField();
    const schema = useFieldSchema();

    const { data } = field;

    const { record, deleteSection, updateActive } = useSectionRecord(data, field);
    const items = getItem(schema);

    // const dataSource = isArrayField(field) ? field.dataSource : [];

    console.log("a--start", field, field.pattern);

    const empty = useMemo(() => <RenderProperty match="SectionCollapse.SelectEmpty" schema={schema} />, [schema]);

    const SectionItem = useMemo(
        () => (items === undefined ? null : <RecursionField name="items" schema={items} onlyRenderSelf />),
        [items],
    );

    if (!isArrayField(field)) {
        return <>{empty}</>;
    }

    return !field.loading ? (
        <CollapseWrapper
            field={field}
            items={items}
            pattern={field.pattern}
            search={data?.searchKey}
            deleteSection={deleteSection}
            updateActive={updateActive}>
            <InternalSection field={field} empty={empty} record={record} userMap={data?.userMap}>
                {SectionItem}
            </InternalSection>
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

interface CollapseWrapperProps extends Pick<CollapseLookupType, "deleteSection" | "updateActive"> {
    field: ArrayField;
    pattern: FieldPatternTypes;
    items?: Schema;
    search?: string;
}

interface InternalSectionProps extends Pick<SectionDataType, "userMap"> {
    empty: ReactNode;
    field: ArrayField;
    record: SectionType;
}

interface RenderPropertyProps {
    match: string;
    schema: Schema;
}

interface SortableProps extends HTMLAttributes<HTMLDivElement> {
    ref?: (node: HTMLElement | null) => void;
}
