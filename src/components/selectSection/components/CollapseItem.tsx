import { CloseOutlined, MenuOutlined } from "@ant-design/icons";
import { SortableHandle } from "@formily/antd-v5/lib/__builtins__";
import { observer, useField } from "@formily/react";
import { Button, ButtonProps, Collapse, CollapseProps } from "antd";
import { FC, useMemo, useState } from "react";
import { useSectionScope } from "../hooks/useSelectCollapse";

const InternalCollapse: FC<CollapseItemProps & ScopeProps<"group" | "search" | "section">> = ({
    bordered = false,
    expandIconPosition = "start",
    size = "small",
    accordion,
    group,
    search,
    section,
    ...props
}) => {
    const { activeIndex = [], schema, updateActive } = useSectionScope();
    const [expand, setExpand] = useState<Record<"active" | "searchkey", boolean | null>>({
        active: null,
        searchkey: null,
    });

    const activeKey = useMemo(() => {
        const { active, searchkey } = expand;
        const current = search ? searchkey : active;

        if (!accordion && current !== null) return current;
        if (!search) {
            const keys = accordion ? [activeIndex[0]] : activeIndex;
            return section !== undefined && keys.indexOf(section) > 0;
        } else {
            return Array.from(group || []).some(key => key.toLowerCase().indexOf(search) > -1);
        }
    }, [accordion, activeIndex, expand, group, search, section]);

    const items = useMemo(
        () =>
            section === undefined
                ? []
                : [
                      {
                          key: section,
                          label: <SectionRender schema={schema} section={section} />,
                          children: <GroupRender group={group} schema={schema} />,
                          extra: <ExtraRender schema={schema} />,
                      },
                  ],
        [group, schema, section],
    );

    return useMemo(
        () => (
            <Collapse
                {...props}
                activeKey={activeKey && section ? [section] : []}
                bordered={bordered}
                expandIconPosition={expandIconPosition}
                items={items}
                size={size}
                onChange={keys => (accordion ? setExpand : updateActive)}
            />
        ),
        [accordion, activeKey, bordered, expandIconPosition, items, props, section, size],
    );
};

const CollapseItem: FC<CollapseItemProps> = props => {
    const { group, search, section } = useSectionScope();

    return <InternalCollapse {...props} group={group} search={search} section={section} />;
};

const ExtraRender: FC<ScopeProps<"schema">> = ({ schema = {} }) => (
    <>
        {schema.sort} {schema.remove}
    </>
);

const GroupRender: FC<ScopeProps<"group" | "schema">> = ({ group = new Set(), schema = {} }) => (
    <>{schema.group === undefined ? Array.from(group).map(name => <div key={name}>{name}</div>) : schema.group}</>
);

const RemoveUser: FC<ButtonProps> = ({ size = "small", type = "link", ...props }) => {
    const field = useField();
    const { section = "", group } = useSectionScope();

    return (
        <Button
            {...props}
            size={size}
            type={type}
            onClick={() => {
                const entire = String(field.path.entire).split(".").shift();
                field.form.notify(type || `select-user-${entire}`, {
                    checked: false,
                    group,
                    section,
                });
            }}>
            <CloseOutlined />
        </Button>
    );
};

const SectionRender: FC<ScopeProps<"schema" | "section">> = ({ schema = {}, section }) => (
    <>{schema.checkbox === undefined ? section : schema.checkbox}</>
);

const SortHandle = SortableHandle((props: Parameters<ReturnType<typeof SortableHandle>>[0]) => {
    return <MenuOutlined {...props} />;
});

export { RemoveUser, SortHandle };

export default observer(CollapseItem);

interface CollapseItemProps extends Omit<CollapseProps, "activeKey" | "children" | "items"> {}

type ScopeProps<T extends keyof ScopeType> = Pick<ScopeType, T>;

type ScopeType = ReturnType<typeof useSectionScope>;
