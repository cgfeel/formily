import { CloseOutlined, MenuOutlined } from "@ant-design/icons";
import { SortableHandle } from "@formily/antd-v5/lib/__builtins__";
import { observer } from "@formily/react";
import { Button, ButtonProps, Collapse, CollapseProps } from "antd";
import { FC, useCallback, useMemo } from "react";
import { useGroupScope, useSectionScope } from "../hooks/useSelectCollapse";

const CollapseItem: FC<CollapseItemProps> = ({
    accordion,
    bordered = false,
    expandIconPosition = "start",
    size = "small",
    ...props
}) => {
    const { expand, group, schema, section, updateActive } = useGroupScope();
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
            if (section && updateActive) {
                const expand = keys.filter(key => key).length > 0;
                updateActive(section, expand);
            }
        },
        [section, updateActive],
    );

    return useMemo(
        () => (
            <Collapse
                {...props}
                accordion={accordion}
                activeKey={expand && section ? [section] : []}
                bordered={bordered}
                expandIconPosition={expandIconPosition}
                items={items}
                size={size}
                onChange={keys => expandActive(Array.isArray(keys) ? keys : [keys])}
            />
        ),
        [accordion, bordered, expand, expandIconPosition, items, props, section, size, expandActive],
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
    const { section, deleteSection } = useGroupScope();
    return (
        <Button
            {...props}
            size={size}
            type={type}
            onClick={event => {
                event.stopPropagation();
                section && deleteSection && deleteSection(section);
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
