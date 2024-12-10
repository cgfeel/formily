import { FormCollapse, IFormCollapseProps } from "@formily/antd-v5";
import { usePrefixCls } from "@formily/antd-v5/lib/__builtins__";
import { isArrayField } from "@formily/core";
import { ISchema, RecursionField, observer, useField, useFieldSchema } from "@formily/react";
import { Collapse, CollapseProps } from "antd";
import { FC } from "react";
import useCollapseStyle from "../styles/collapse";

const { CollapsePanel, createFormCollapse } = FormCollapse;

const isSectionComponent = (schema: ISchema) => {
    // console.log(schema["x-component"], schema["x-component"] === "UserCheckBox");
    return schema["x-decorator"] === "PanelStop";
};
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
    console.log(items);

    const collapseItems: CollapseProps["items"] = Object.keys(panels).map(key => ({
        key,
        label: (
            <>
                <RecursionField
                    name={key}
                    basePath={field.address}
                    schema={schema}
                    filterProperties={schema => isSectionComponent(schema)}
                    mapProperties={schema => ({ ...schema, "x-content": 2222 })}
                    onlyRenderProperties
                />
            </>
        ),
        children: (
            <>
                {/*schema.reduceProperties((addition, schema, name) =>
                    isUserComponent(schema) ? (
                        addition
                    ) : (
                        <RecursionField
                            name={name}
                            basePath={field.address}
                            schema={{ ...schema, "x-data": { group: panels[key], section: key } }}
                        />
                    ),
                )*/}
                test
            </>
        ),
    }));

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
