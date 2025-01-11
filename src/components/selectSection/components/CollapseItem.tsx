import { observer, useExpressionScope, useField } from "@formily/react";
import { Collapse, CollapseProps } from "antd";
import { FC } from "react";
import { SectionItem } from "../hooks/useFakeService";
import { SortableHandle } from "@formily/antd-v5/lib/__builtins__";
import { MenuOutlined } from "@ant-design/icons";

const useScope = () => {
    const { $lookup = {}, $record = {} } = useExpressionScope() as CollapseScopeType;
    const { group = new Set(), section = "" } = $record;

    // console.log(JSON.stringify($lookup, null, 2));

    return { group, section } as const;
};

const SortHandle = SortableHandle((props: Parameters<ReturnType<typeof SortableHandle>>[0]) => {
    return <MenuOutlined {...props} />;
});

const CollapseItem: FC<Omit<CollapseProps, "items">> = ({
    bordered = false,
    expandIconPosition = "end",
    size = "small",
    ...props
}) => {
    const field = useField();
    const { group, section } = useScope();

    const items = [
        {
            key: section,
            label: section,
            children: Array.from(group).map(name => <div key={name}>{name}</div>),
            extra: <SortHandle />,
        },
    ];

    props.children = undefined;
    return (
        <Collapse {...props} bordered={bordered} expandIconPosition={expandIconPosition} items={items} size={size} />
    );
};

export default observer(CollapseItem);

type CollapseScopeType = {
    $lookup: {
        userMap?: Record<string, SectionItem>;
    };
    $record: {
        group?: Set<string>;
        section?: string;
        readPretty?: boolean;
        search?: string;
    };
};
