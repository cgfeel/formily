import { SortableContainer, SortableElement, usePrefixCls } from "@formily/antd-v5/lib/__builtins__";
import { observer, RecordScope, RecursionField } from "@formily/react";
import classNames from "classnames";
import { FC, forwardRef, HTMLAttributes, PropsWithChildren, useMemo } from "react";
import { useCollapseField, useListValueRecord, useSelectSchema } from "../hooks/useSelectCollapse";
import CollapseItem from "./CollapseItem";
import UserCheckBox from "./UserCheckBox";

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

const InternalCollapse: FC = () => {
    const { dataSource } = useCollapseField();
    const schema = useSelectSchema();

    const [panels, sort] = useListValueRecord(schema.enum || dataSource || []);
    const items = Array.isArray(schema.items) ? schema.items[0] : schema.items;

    const SectionItem = useMemo(
        () => (items === undefined ? null : <RecursionField name="items" schema={items} />),
        [items],
    );

    const list = Object.keys(panels);
    return (
        <SortableList
            list={list}
            onSortEnd={({ oldIndex, newIndex }) => {
                const index = list.splice(oldIndex, 1)[0];
                list.splice(newIndex, 0, index);

                sort(list);
            }}>
            {list.map((section, index) => (
                <SortableItem key={`item-${index}`} lockAxis="y" index={index}>
                    <RecordScope getRecord={() => ({ group: panels[section], section })}>{SectionItem}</RecordScope>
                </SortableItem>
            ))}
        </SortableList>
    );
};

const SectionCollapseGroup: FC = () => <InternalCollapse />;

export const SectionCollapse = Object.assign(observer(SectionCollapseGroup), {
    CollapseItem,
    UserCheckBox,
});

export default SectionCollapse;

interface SortableProps extends HTMLAttributes<HTMLDivElement> {
    ref?: (node: HTMLElement | null) => void;
}
