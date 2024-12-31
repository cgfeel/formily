import { FormCollapse } from "@formily/antd-v5";
import { usePrefixCls } from "@formily/antd-v5/lib/__builtins__";
import {
    createEffectHook,
    Form,
    FormPath,
    isArrayField,
    onFieldChange,
    onFieldReact,
    onFieldValueChange,
    onFormValuesChange,
} from "@formily/core";
import { RecursionField, Schema, observer, useField, useFieldSchema, useFormEffects } from "@formily/react";
import { Collapse, CollapseProps } from "antd";
import { FC, useEffect, useState } from "react";
import useCollapseStyle from "../styles/collapse";
import {
    CollapseItem,
    isEmpty,
    isSkeleton,
    useCollapseField,
    useListValue,
    useSectionGroup,
    useSelectSchema,
} from "../hooks/useSelectCollapse";
import classNames from "classnames";
import UserCheckBox from "./UserCheckBox";
import PanelDecorator from "./PanelDecorator";
import SelectSkeleton from "./SelectSkeleton";
import UserGroup from "./UserGroup";
import SelectEmpty from "./SelectEmpty";

const { CollapsePanel, createFormCollapse } = FormCollapse;

const onSelectUserEvent = createEffectHook<(payload: PayloadType, form: Form) => ListenerType>(
    "select-user-event",
    (payload, form) => listener => listener(payload, form),
);

const onExpandCollapse = createEffectHook<(payload: PayloadType, form: Form) => ListenerType>(
    "expand-collapse",
    (payload, form) => listener => listener(payload, form),
);

// 作为 empty、loading 的 property 渲染组价
const RenderProperty: FC<RenderPropertyProps> = ({ address, name, schema, match }) => (
    <>
        {schema.reduceProperties(
            (addition, schema) =>
                match(schema) ? (
                    <RecursionField basePath={address} name={name} schema={schema} onlyRenderSelf />
                ) : (
                    addition
                ),
            null,
        )}
    </>
);

// 将 activeKey 下放到叶子节点，避免 react 的 state 更新导致整个 ArrayField 重复渲染
const CollapseControl: FC<CollapseControlProps> = ({ activeKey, search, onChange, ...props }) => {
    const [active, setActive] = useState<string[]>([]);

    useEffect(() => {
        if (search === "") {
            const index = (Array.isArray(activeKey) ? activeKey : [activeKey || ""]).map(key => String(key));
            setActive(index.concat());
        }
    }, [activeKey, search]);

    useEffect(() => {
        if (search !== "") {
            const index = (props.items || [])
                .map(item => String(item.key || ""))
                .filter(section => section !== "" && section.toLowerCase().indexOf(search) === -1);

            setActive(index);
        }
    }, [props.items, search]);

    return (
        <Collapse
            {...props}
            activeKey={active}
            onChange={value => {
                const keys = Array.isArray(value) ? value : [value];
                setActive(keys);
                onChange(keys);
            }}
        />
    );
};

// ArrayField Comonent
const InternalFormCollapse: FC<FormCollapseProps> = ({
    className,
    // activeKey: activeRaw,
    bordered = false,
    expandIconPosition = "end",
    search: searchRaw = "",
    ...props
}) => {
    const { activeKey, dataSource, field, value: fieldValue } = useCollapseField();
    const schema = useSelectSchema();

    /*const activeKey = (Array.isArray(activeRaw) ? activeRaw : [activeRaw || ""])
        .map(item => String(item))
        .filter(i => i !== "");*/

    const panels = useListValue(schema.enum || dataSource || []);
    const values = useListValue(fieldValue);

    const search = searchRaw.toLocaleLowerCase();
    const searchList = Object.keys(panels).filter(
        section =>
            search === "" ||
            section.toLowerCase().indexOf(search) > -1 ||
            Array.from(panels[section]).join("").toLowerCase().indexOf(search) > -1,
    );

    const prefixCls = usePrefixCls("collapse");
    const [wrapSSR, hashId] = useCollapseStyle(prefixCls);

    useFormEffects(() => {
        onSelectUserEvent(({ group, section, checked = false }) => {
            if (isArrayField(field)) {
                const currentValue = field.value;
                const dataRaw = field.data;

                // 添加也是先删后加
                const data = currentValue.filter(item => item.section !== section || group.indexOf(item.name) < 0);
                field.setState(dataRaw);
                field.setValue(data.concat(!checked ? [] : group.map(name => ({ name, section }))));
                field.setState(dataRaw);
            }
        });
        onExpandCollapse(() => {
            console.log("aaaaa---v1111");
        });
    });

    // isArrayField(field) && console.log(schema);

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
    if (searchList.length === 0 || (group === undefined && section === undefined)) {
        return <RenderProperty name="empty" address={field.address} schema={schema} match={isEmpty} />;
    }

    const collapseItems: CollapseProps["items"] = searchList.map((key, i) => {
        const data = {
            values: values[key] === undefined ? [] : Array.from(values[key]),
            group: Array.from(panels[key]),
            section: key,
            search,
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

    // console.log("aaaa", field.componentProps);

    return wrapSSR(
        <CollapseControl
            {...props}
            activeKey={activeKey}
            bordered={bordered}
            className={classNames([hashId, className])}
            expandIconPosition={expandIconPosition}
            items={collapseItems}
            search={search}
            onChange={activeKey => {
                // onChange && onChange(activeKey);
                // console.log(field);
                field.setData(activeKey);
                // field.componentProps.activeKey = activeKey;
            }}
            // defaultActiveKey={value.filter(({ name }) => name === "").map(({ section }) => section)}
        />,
    );
};

// 仅用于判断加载状态
const SectionFormCollapse: FC<FormCollapseProps> = props => {
    const field = useField();
    const schema = useFieldSchema();

    return !isArrayField(field) || !field.loading ? (
        <InternalFormCollapse {...props} />
    ) : (
        <RenderProperty address={field.address} name="loading" schema={schema} match={isSkeleton} />
    );
};

export const SelectCollapse = Object.assign(observer(SectionFormCollapse), {
    CollapsePanel,
    PanelDecorator,
    SelectEmpty,
    SelectSkeleton,
    UserCheckBox,
    UserGroup,
    createFormCollapse,
});

export default SelectCollapse;

export type UserItem = {
    name: string;
    section: string;
};

interface CollapseControlProps extends Omit<CollapseProps, "activeKey" | "onChange"> {
    activeKey: string[];
    search: string;
    onChange: (value: string[]) => void;
}

interface FormCollapseProps extends Omit<CollapseProps, "items" | "onChange" | "search"> {
    data?: string[];
    search?: string;
}

interface RenderPropertyProps {
    address: FormPath;
    name: string;
    schema: Schema;
    match: (schema: Schema) => Boolean;
}

type ListenerType = (listener: (pay: PayloadType, form: Form) => void) => void;

type PayloadType = {
    group: string[];
    section: string;
    checked?: boolean;
};
