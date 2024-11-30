import { FormCollapse, IFormCollapseProps } from "@formily/antd-v5";
import { ExpressionScope, ISchema, RecursionField, Schema, observer, useFieldSchema } from "@formily/react";
import { Checkbox, Collapse, CollapseProps } from "antd";
import { FC } from "react";

const { CollapsePanel, createFormCollapse } = FormCollapse;

const isCheckboxComponent = (schema: ISchema) => schema["x-component"] === "Checkbox";

const usePanels = (schema: Schema) => {
    const list = (schema.enum || []) as UserItem[]; // formily 不做泛型也不做推断，只能断言

    return list.reduce<Record<string, string[]>>(
        (current, { name, section }) => ({ ...current, [section]: (current[section] || []).concat(name) }),
        {},
    );
};

const items: CollapseProps["items"] = [
    {
        key: "1",
        label: "This is panel header 1",
        children: <>test</>,
    },
    {
        key: "2",
        label: (
            <>
                <Checkbox onClick={event => event.stopPropagation()} />
                This is panel header 2
            </>
        ),
        children: <>test</>,
    },
    {
        key: "3",
        label: "This is panel header 3",
        children: <>test</>,
    },
];

const InternalFormCollapse: FC<IFormCollapseProps> = () => {
    const schema = useFieldSchema();
    const panels = usePanels(schema);

    const items = Array.isArray(schema.items) ? schema.items[0] : schema.items;
    const collapseItems: CollapseProps["items"] = Object.keys(panels).map(key => ({
        key,
        label: (
            <>
                {items && (
                    <ExpressionScope value={{ $section: key }}>
                        <RecursionField
                            name={key}
                            schema={items}
                            filterProperties={schema => isCheckboxComponent(schema)}
                            onlyRenderProperties
                        />
                    </ExpressionScope>
                )}
                {key}
            </>
        ),
        children: <>test</>,
    }));

    return <Collapse items={collapseItems} bordered={false} defaultActiveKey={["技术"]} expandIconPosition="end" />;
};

export const SelectCollapse = Object.assign(observer(InternalFormCollapse), {
    CollapsePanel,
    createFormCollapse,
});

export default SelectCollapse;

type UserItem = {
    name: string;
    section: string;
};
