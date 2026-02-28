import { CloseOutlined, MenuOutlined } from "@ant-design/icons";
import { SortableHandle } from "@formily/antd-v5/lib/__builtins__";
import { observer, useExpressionScope, useForm } from "@formily/react";
import { Button, ButtonProps, Collapse, CollapseProps, Tooltip } from "antd";
import { FC, useCallback, useMemo } from "react";
import { useGroupScope } from "../hooks/useSelectCollapse";
import { isField } from "@formily/core";

const CollapseItem: FC<CollapseItemProps> = ({
  target,
  bordered = false,
  expandIconPosition = "end",
  size = "small",
  ...props
}) => {
  const { expand, group, schema, search, section, updateActive } = useGroupScope();
  const form = useForm();

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
        if (target && !search) {
          form.query(target).take(field => {
            if (isField(field)) field.value = 0;
          });
        }

        const expand = keys.filter(Boolean).length > 0;
        updateActive(section, expand);
      }
    },
    [form, search, section, target, updateActive],
  );

  return (
    <Collapse
      {...props}
      activeKey={expand && section ? [section] : []}
      bordered={bordered}
      expandIconPosition={expandIconPosition}
      items={items}
      size={size}
      onChange={keys => expandActive(Array.isArray(keys) ? keys : [keys])}
    />
  );
};

const ExtraRender: FC<ScopeProps<"schema">> = ({ schema = {} }) => (
  <>
    {schema.sort} {schema.remove}
  </>
);

const GroupRender: FC<ScopeProps<"group" | "schema">> = ({ group = new Set(), schema = {} }) => (
  <>
    {schema.group === undefined
      ? Array.from(group).map(name => <div key={name}>{name}</div>)
      : schema.group}
  </>
);

const RemoveUser: FC<ButtonProps> = ({ size = "small", type = "link", ...props }) => {
  const { group, deleteSection } = useGroupScope();
  const { $records } = useExpressionScope();

  return (
    <Tooltip title="删除">
      <Button
        {...props}
        size={size}
        type={type}
        onClick={event => {
          event.stopPropagation();
          deleteSection && deleteSection($records || (group ? Array.from(group) : []));
        }}>
        <CloseOutlined />
      </Button>
    </Tooltip>
  );
};

const SectionRender: FC<ScopeProps<"schema" | "section">> = ({ schema = {}, section }) => (
  <>{schema.checkbox === undefined ? section : schema.checkbox}</>
);

const SortHandle = SortableHandle((props: Parameters<ReturnType<typeof SortableHandle>>[0]) => {
  return (
    <Tooltip title="移动">
      <MenuOutlined {...props} />
    </Tooltip>
  );
});

export { RemoveUser, SortHandle };

export default observer(CollapseItem);

interface CollapseItemProps extends Omit<CollapseProps, "activeKey" | "children" | "items"> {
  target?: string;
}

type ScopeProps<T extends keyof ScopeType> = Pick<ScopeType, T>;

type ScopeType = ReturnType<typeof useGroupScope>;
