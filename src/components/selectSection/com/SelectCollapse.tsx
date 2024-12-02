import { FormCollapse, IFormCollapseProps } from "@formily/antd-v5";
import { usePrefixCls } from "@formily/antd-v5/lib/__builtins__";
import { isArrayField } from "@formily/core";
import { ISchema, RecursionField, observer, useField, useFieldSchema } from "@formily/react";
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
    const field = useField();
    const schema = useFieldSchema();
    const panels = usePanels(schema);

    const prefixCls = usePrefixCls("collapse");
    const [wrapSSR, hashId] = useCollapseStyle(prefixCls);

    const value = (isArrayField(field) ? field.value : []) as UserItem[]; // field 的值存在多个可能，这里通过断言固定一个类型
    const items = Array.isArray(schema.items) ? schema.items[0] : schema.items;

    const collapseItems: CollapseProps["items"] = Object.keys(panels).map(key => {
        return {
            key,
            label: (
                <>
                    {items && (
                        <RecursionField
                            name={key}
                            basePath={field.address}
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
                            basePath={field.address}
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
            defaultActiveKey={value.filter(({ name }) => name === "").map(({ section }) => section)}
            expandIconPosition="end"
        />,
    );
};

export const SelectCollapse = Object.assign(observer(InternalFormCollapse), {
    CollapsePanel,
    createFormCollapse,
});

export default SelectCollapse;

export type UserItem = {
    name: string;
    section: string;
};
