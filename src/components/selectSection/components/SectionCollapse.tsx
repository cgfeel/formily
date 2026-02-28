import {
  SortableContainer,
  SortableElement,
  usePrefixCls,
} from "@formily/antd-v5/lib/__builtins__";
import {
  observer,
  RecordScope,
  RecursionField,
  Schema,
  useField,
  useFieldSchema,
} from "@formily/react";
import classNames from "classnames";
import {
  FC,
  forwardRef,
  HTMLAttributes,
  PropsWithChildren,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import PanelDecorator from "./PanelDecorator";
import SelectEmpty from "./SelectEmpty";
import SelectSkeleton from "./SelectSkeleton";
import {
  CollapseItem as CollapseItemType,
  CollapseLookupType,
  CollapseSchema,
  useListValue,
  useSectionRecord,
} from "../hooks/useSelectCollapse";
import CollapseItem, { RemoveUser, SortHandle } from "./CollapseItem";
import UserCheckBox, { UserFace, UserPanel } from "./UserCheckBox";
import UserGroup from "./UserGroup";
import { ArrayField, FieldPatternTypes, isArrayField } from "@formily/core";
import { SectionType } from "../event";
import { objectKeys } from "../utils/fields";

const fieldRange = Object.freeze({
  checkbox: "SectionCollapse.UserCheckBox",
  group: "SectionCollapse.UserGroup",
  remove: "SectionCollapse.Remove",
  sort: "SectionCollapse.SortHandle",
});

const getItem = (schema: Schema) => (Array.isArray(schema.items) ? schema.items[0] : schema.items);
const isFieldSchema = (schema: Schema, component: string) => schema["x-component"] === component;

const useSortCollapse = (dataSource: CollapseItemType) => {
  const [index, setIndex] = useState(Object.keys(dataSource));

  useEffect(() => {
    const keys = Object.keys(dataSource);
    setIndex(currentIndex => {
      const update =
        keys.length !== currentIndex.length ? true : keys.some(key => !currentIndex.includes(key));
      return update ? keys : currentIndex;
    });
  }, [dataSource]);

  return [index, setIndex] as const;
};

const CollapseWrapper: FC<PropsWithChildren<CollapseWrapperProps>> = ({
  children,
  items,
  pattern,
  deleteSection,
  updateActive,
  search = "",
}) => {
  const groupSchema = useMemo(() => {
    const fieldKeys = objectKeys(fieldRange);
    return items?.reduceProperties<CollapseSchema, CollapseSchema>((addition, schema, key) => {
      const name = fieldKeys.find(itemKey => isFieldSchema(schema, fieldRange[itemKey]));
      return name === undefined
        ? addition
        : { ...addition, [name]: <RecursionField name={key} schema={schema} /> };
    }, {});
  }, [items]);

  return (
    <RecordScope
      getRecord={() => ({
        pattern: pattern,
        schema: groupSchema ?? {},
        search: search.toLowerCase(),
        deleteSection,
        updateActive,
      })}
    >
      {children}
    </RecordScope>
  );
};

const InternalSection: FC<PropsWithChildren<InternalSectionProps>> = ({
  children,
  empty,
  field,
  record,
}) => {
  const [dataIndex] = useListValue(record.items);
  const [values] = useListValue(field.value);

  const [index, sortIndex] = useSortCollapse(dataIndex);
  // const index = Object.keys(dataIndex);

  return index.length === 0 ? (
    <>{empty}</>
  ) : (
    <SortableList
      list={index}
      onSortEnd={({ oldIndex, newIndex }) => {
        const indexItems = [...index];
        const current = indexItems.splice(oldIndex, 1)[0];

        indexItems.splice(newIndex, 0, current);
        sortIndex(indexItems);
      }}
    >
      {index.map((section, index) => (
        <SortableItem key={`item-${index}`} lockAxis="y" index={index}>
          <RecordScope
            getRecord={() => ({
              expand: record.expand.has(section),
              group: dataIndex[section],
              values: values[section] ?? new Set(),
              section,
              // activeIndex,
              // updateActive,
            })}
          >
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
        isFieldSchema(schema, match) ? (
          <RecursionField name={key} schema={schema} onlyRenderSelf />
        ) : (
          addition
        ),
      null,
    )}
  </>
);

const SectionCollapseGroup: FC = () => {
  const field = useField();
  const schema = useFieldSchema();

  const { data, record, deleteSection, updateActive } = useSectionRecord(field);
  const items = getItem(schema);

  // console.log("a---data", data, record);

  const empty = useMemo(
    () => <RenderProperty match="SectionCollapse.SelectEmpty" schema={schema} />,
    [schema],
  );

  const SectionItem = useMemo(
    () =>
      items === undefined ? null : <RecursionField name="items" schema={items} onlyRenderSelf />,
    [items],
  );

  if (!isArrayField(field)) {
    return <>{empty}</>;
  }

  return !field.loading ? (
    <CollapseWrapper
      items={items}
      pattern={field.pattern}
      search={data.searchKey}
      deleteSection={deleteSection}
      updateActive={updateActive}
    >
      <InternalSection empty={empty} field={field} record={record}>
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
        ])}
      >
        {children}
      </div>
    );
  },
);

const SortableItem = SortableElement(
  ({ children, ref, ...props }: PropsWithChildren<SortableProps>) => (
    <Sortable {...props} ref={elem => ref && ref(elem)}>
      {children}
    </Sortable>
  ),
);

const SortableList = SortableContainer(
  ({ children, ...props }: PropsWithChildren<SortableProps>) => (
    <Sortable {...props} list={true}>
      {children}
    </Sortable>
  ),
);

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
  pattern: FieldPatternTypes;
  items?: Schema;
  search?: string;
}

interface InternalSectionProps {
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
