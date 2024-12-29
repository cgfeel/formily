import { FormCollapse } from "@formily/antd-v5";
import { usePrefixCls } from "@formily/antd-v5/lib/__builtins__";
import {
    createEffectHook,
    Form,
    isArrayField,
    onFieldChange,
    onFieldReact,
    onFieldValueChange,
    onFormValuesChange,
} from "@formily/core";
import { RecursionField, Schema, observer, useField, useFieldSchema, useFormEffects } from "@formily/react";
import { Collapse, CollapseProps } from "antd";
import { FC, useEffect } from "react";
import useCollapseStyle from "../styles/collapse";
import {
    useCollapseField,
    useListValue,
    usePanels,
    useSectionGroup,
    useSelectSchema,
} from "../hooks/useSelectCollapse";
import classNames from "classnames";
import UserCheckBox from "./UserCheckBox";
import PanelDecorator from "./PanelDecorator";

const { CollapsePanel, createFormCollapse } = FormCollapse;

const onSelectUserEvent = createEffectHook<(payload: PayloadType, form: Form) => ListenerType>(
    "select-user-event",
    (payload, form) => listener => listener(payload, form),
);

const InternalFormCollapse: FC<Omit<CollapseProps, "items">> = ({
    className,
    bordered = false,
    expandIconPosition = "end",
}) => {
    const [field, fieldValue] = useCollapseField();
    const schema = useSelectSchema();
    const panels = useListValue(schema.enum || []);
    const values = useListValue(fieldValue);

    const prefixCls = usePrefixCls("collapse");
    const [wrapSSR, hashId] = useCollapseStyle(prefixCls);

    useFormEffects(() => {
        onSelectUserEvent(({ group, section, checked = false }) => {
            if (isArrayField(field)) {
                const currentValue = field.value;
                console.log(currentValue);

                // 添加也是先删后加
                const data = currentValue.filter(item => item.section !== section || group.indexOf(item.name) < 0);
                field.setValue(data.concat(!checked ? [] : group.map(name => ({ name, section }))));
            }
        });
    });

    isArrayField(field) && console.log(field.loading);

    /*useFormEffects(() => {
        onFormValuesChange(() => {
            console.log("qqqqq");
        });
        onFieldChange("collapse", () => {
            console.log("ssssssss");
        });
    });*/

    /*const value = isArrayField(field) ? field.value : {};
    useEffect(() => {
        console.log("aaaaa---111");
    }, [value]);*/

    // isArrayField(field) && onChange && onChange(field.value);

    // console.log(onChange);

    // console.log(field);

    // const value = (isArrayField(field) ? field.value : []) as UserItem[]; // field 的值存在多个可能，这里通过断言固定一个类型
    // const items = Array.isArray(schema.items) ? schema.items[0] : schema.items;

    const [section, group] = useSectionGroup(schema);
    if (group === undefined && section === undefined) {
        return <></>;
    }

    const collapseItems: CollapseProps["items"] = Object.keys(panels).map((key, i) => {
        const data = {
            values: values[key] === undefined ? [] : Array.from(values[key]),
            group: Array.from(panels[key]),
            section: key,
        };
        return {
            key,
            label: (
                <RecursionField
                    name={`section-${i}`}
                    basePath={field.address}
                    schema={{ ...section, "x-data": data }}
                    onlyRenderSelf
                />
            ),
            children: (
                <RecursionField
                    name={`group-${i}`}
                    basePath={field.address}
                    schema={{ ...group, "x-data": data }}
                    onlyRenderSelf
                />
            ),
        };
    });

    return wrapSSR(
        <Collapse
            bordered={bordered}
            className={classNames([hashId, className])}
            expandIconPosition={expandIconPosition}
            items={collapseItems}
            // defaultActiveKey={value.filter(({ name }) => name === "").map(({ section }) => section)}
        />,
    );
};

export const SelectCollapse = Object.assign(observer(InternalFormCollapse), {
    CollapsePanel,
    PanelDecorator,
    UserCheckBox,
    createFormCollapse,
});

export default SelectCollapse;

export type UserItem = {
    name: string;
    section: string;
};

type ListenerType = (listener: (pay: PayloadType, form: Form) => void) => void;

type PayloadType = {
    group: string[];
    section: string;
    checked?: boolean;
};
