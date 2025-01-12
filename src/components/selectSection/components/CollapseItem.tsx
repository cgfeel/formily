import { observer, useField } from "@formily/react";
import { Button, ButtonProps, Collapse, CollapseProps } from "antd";
import { FC } from "react";
import { SortableHandle } from "@formily/antd-v5/lib/__builtins__";
import { CloseOutlined, MenuOutlined } from "@ant-design/icons";
import { useSectionScope } from "../hooks/useSelectCollapse";

const CollapseItem: FC<Omit<CollapseProps, "items">> = ({
    bordered = false,
    expandIconPosition = "start",
    size = "small",
    ...props
}) => {
    const field = useField();
    const { group, schema, section } = useSectionScope();

    const items =
        section === undefined
            ? []
            : [
                  {
                      key: section,
                      label: <SectionRender schema={schema} section={section} />,
                      children: <GroupRender group={group} schema={schema} />,
                      extra: <ExtraRender schema={schema} />,
                  },
              ];

    if ("children" in props) delete props.children;
    return (
        <Collapse {...props} bordered={bordered} expandIconPosition={expandIconPosition} items={items} size={size} />
    );
};

const ExtraRender: FC<ExtraRenderProps> = ({ schema = {} }) => (
    <>
        {schema.sort} {schema.remove}
    </>
);

const GroupRender: FC<GroupRenderProps> = ({ group = new Set(), schema = {} }) => (
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

const SectionRender: FC<SectionRenderProps> = ({ schema = {}, section }) => (
    <>{schema.checkbox === undefined ? section : schema.checkbox}</>
);

const SortHandle = SortableHandle((props: Parameters<ReturnType<typeof SortableHandle>>[0]) => {
    return <MenuOutlined {...props} />;
});

export { RemoveUser, SortHandle };

export default observer(CollapseItem);

interface ExtraRenderProps extends Pick<ReturnType<typeof useSectionScope>, "schema"> {}

interface GroupRenderProps extends Pick<ReturnType<typeof useSectionScope>, "group" | "schema"> {}

interface SectionRenderProps extends Pick<ReturnType<typeof useSectionScope>, "schema" | "section"> {}
