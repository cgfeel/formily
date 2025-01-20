import { CloseOutlined, MenuOutlined } from "@ant-design/icons";
import { SortableHandle } from "@formily/antd-v5/lib/__builtins__";
import { observer, useField } from "@formily/react";
import { Button, ButtonProps, Collapse, CollapseProps } from "antd";
import { Dispatch, FC, SetStateAction, useCallback, useEffect, useMemo, useState } from "react";
import { useSectionScope } from "../hooks/useSelectCollapse";

const InternalCollapse: FC<InternalCollapseProps> = ({
    bordered = false,
    expandIconPosition = "start",
    size = "small",
    expand,
    accordion,
    group,
    search,
    section,
    setExpand,
    ...props
}) => {
    const { activeIndex = [], schema, updateActive } = useSectionScope();
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

    const expandActive = useCallback(
        (keys: string[]) => {
            console.log(accordion);
            if (accordion && section && updateActive) {
                updateActive(section, keys.length > 0);
            }
            if (!accordion) {
                const key = !search ? "active" : "searchkey";
                setExpand(info => {
                    console.log({ ...info, [key]: keys.length > 0 });
                    return { ...info, [key]: keys.length > 0 };
                });
            }
        },
        [accordion, search, section, setExpand, updateActive],
    );

    useEffect(() => {
        return () => {
            setExpand(({ active }) => ({ searchkey: null, active }));
        };
    }, [search, setExpand]);

    return useMemo(
        () => (
            <Collapse
                {...props}
                activeKey={activeKey && section ? [section] : []}
                bordered={bordered}
                expandIconPosition={expandIconPosition}
                items={items}
                size={size}
                onChange={keys => expandActive(Array.isArray(keys) ? keys : [keys])}
            />
        ),
        [activeKey, bordered, expandIconPosition, items, props, section, size, expandActive],
    );
};

const CollapseItem: FC<CollapseItemProps> = props => {
    const { group, search, section } = useSectionScope();
    const [expand, setExpand] = useState<ExpendType>({
        active: null,
        searchkey: null,
    });

    const show = useMemo(() => {
        if (search) {
            return (
                (section?.toLowerCase() || "").indexOf(search) > -1 ||
                Array.from(group || new Set()).some(name => String(name).toLowerCase().indexOf(search) > -1)
            );
        }
        return true;
    }, [group, search, section]);

    return !show ? null : (
        <InternalCollapse
            {...props}
            expand={expand}
            group={group}
            search={search}
            section={section}
            setExpand={setExpand}
        />
    );
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

interface InternalCollapseProps extends CollapseItemProps, ScopeProps<"group" | "search" | "section"> {
    expand: ExpendType;
    setExpand: Dispatch<SetStateAction<ExpendType>>;
}

type ExpendType = Record<"active" | "searchkey", boolean | null>;

type ScopeProps<T extends keyof ScopeType> = Pick<ScopeType, T>;

type ScopeType = ReturnType<typeof useSectionScope>;
