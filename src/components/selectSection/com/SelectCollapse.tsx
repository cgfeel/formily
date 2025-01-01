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
import {
    RecordScope,
    RecursionField,
    Schema,
    observer,
    useExpressionScope,
    useField,
    useFieldSchema,
    useFormEffects,
} from "@formily/react";
import { Collapse, CollapseProps } from "antd";
import { FC, forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import useCollapseStyle from "../styles/collapse";
import {
    CollapseItem,
    isEmpty,
    isSkeleton,
    useCollapseField,
    useCollapseItems,
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
import { onExpandCollapse, onSelectUserEvent } from "../event";

const { CollapsePanel, createFormCollapse } = FormCollapse;

// 作为 empty、loading 的 property 渲染组件
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

// 主要用于计算 activeKey
const CollapseControl = forwardRef<CollapseControlInstance, CollapseControlProps>(
    ({ activeKey, search, onChange, ...props }, ref) => {
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

        useImperativeHandle(ref, () => ({
            expand: keys => {
                setActive(keys);
                onChange(keys);
            },
        }));

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
    },
);

// ArrayField Comonent
const InternalFormCollapse: FC<FormCollapseProps> = ({
    className,
    bordered = false,
    expandIconPosition = "end",
    search: searchKey = "",
    ...props
}) => {
    const { activeKey, collapseItems, empty, field, panels, schema, search } = useCollapseItems(searchKey);
    const collapseRef = useRef<CollapseControlInstance>(null);

    const prefixCls = usePrefixCls("collapse");
    const [wrapSSR, hashId] = useCollapseStyle(prefixCls);

    useFormEffects(() => {
        onExpandCollapse(({ expand, path }) => {
            if (field.path.entire === path) {
                collapseRef.current?.expand(expand ? Object.keys(panels) : []);
            }
        });
        onSelectUserEvent(({ group, section, checked = false }) => {
            if (isArrayField(field)) {
                const currentValue = field.value;

                // 添加也是先删后加
                const data = currentValue.filter(item => item.section !== section || group.indexOf(item.name) < 0);
                field.setValue(data.concat(!checked ? [] : group.map(name => ({ name, section }))));
            }
        });
    });

    return empty ? (
        <RenderProperty name="empty" address={field.address} schema={schema} match={isEmpty} />
    ) : (
        wrapSSR(
            <RecordScope getRecord={() => ({ search })} getIndex={() => 2}>
                <CollapseControl
                    {...props}
                    activeKey={activeKey}
                    bordered={bordered}
                    className={classNames([hashId, className])}
                    expandIconPosition={expandIconPosition}
                    items={collapseItems}
                    ref={collapseRef}
                    search={search}
                    onChange={activeKey => {
                        field.setData(activeKey);
                        field.form.notify("expand-handle", activeKey.length !== Object.keys(panels).length);
                    }}
                />
            </RecordScope>,
        )
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

interface CollapseControlInstance {
    expand: (keys: string[]) => void;
}

interface CollapseControlProps extends Omit<CollapseProps, "activeKey" | "onChange"> {
    activeKey: string[];
    search: string;
    onChange: (value: string[]) => void;
}

interface FormCollapseProps extends Omit<CollapseProps, "activeKey" | "items" | "onChange" | "search"> {
    data?: string[];
    search?: string;
}

interface RenderPropertyProps {
    address: FormPath;
    name: string;
    schema: Schema;
    match: (schema: Schema) => Boolean;
}
