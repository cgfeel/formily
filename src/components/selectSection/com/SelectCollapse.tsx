import { FormCollapse, IFormCollapseProps } from "@formily/antd-v5";
import { usePrefixCls } from "@formily/antd-v5/lib/__builtins__";
import { ISchema, RecursionField, observer, useFieldSchema } from "@formily/react";
import { Collapse, CollapseProps } from "antd";
import { FC } from "react";
import useCollapseStyle from "../styles/collapse";

const { CollapsePanel, createFormCollapse } = FormCollapse;

const isSectionComponent = (schema: ISchema) => schema["x-component"] === "Checkbox";
const isUserComponent = (schema: ISchema) => schema["x-component"] === "UserGroup";

const usePanels = (schema: ISchema) => {
    const list = (schema.enum || []) as UserItem[]; // formily 不做泛型也不做推断，只能断言
    return list.reduce<Record<string, string[]>>(
        (current, { name, section }) => ({ ...current, [section]: (current[section] || []).concat(name) }),
        {},
    );
};

const InternalFormCollapse: FC<IFormCollapseProps> = () => {
    const schema = useFieldSchema();
    const panels = usePanels(schema);

    const prefixCls = usePrefixCls("collapse");
    const [wrapSSR, hashId] = useCollapseStyle(prefixCls);

    const items = Array.isArray(schema.items) ? schema.items[0] : schema.items;
    const collapseItems: CollapseProps["items"] = Object.keys(panels).map(key => {
        return {
            key,
            label: (
                <>
                    {items && (
                        <RecursionField
                            name={key}
                            schema={items}
                            filterProperties={schema => isSectionComponent(schema)}
                            mapProperties={schema => ({
                                ...schema,
                                "x-content": key,
                            })}
                            onlyRenderProperties
                        />
                    )}
                </>
            ),
            children: (
                <>
                    {items && (
                        <RecursionField
                            name={`${key}-group`}
                            schema={items}
                            filterProperties={schema => isUserComponent(schema)}
                            mapProperties={schema => ({
                                ...schema,
                                "x-data": { group: panels[key], section: key },
                            })}
                        />
                    )}
                </>
            ),
        };
    });

    return wrapSSR(
        <Collapse
            className={hashId}
            items={collapseItems}
            bordered={false}
            defaultActiveKey={["技术"]}
            expandIconPosition="end"
        />,
    );
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
