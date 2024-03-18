import { usePrefixCls } from "@formily/antd-v5/lib/__builtins__";
import { Schema, SchemaKey } from "@formily/json-schema";
import { ReactFC, RecursionField, observer, useField, useFieldSchema } from "@formily/react";
import { model, markRaw } from "@formily/reactive";
import { toArr } from "@formily/shared";
import { FC, Fragment, PropsWithChildren, ReactNode, useMemo } from "react";
import { Collapse, Badge, CollapseProps, CollapsePanelProps } from "antd";
import { cx as cls } from "antd-style";

const usePanels = () => {
    const collapseField = useField();
    const schema = useFieldSchema();
    const panels: { name: SchemaKey; props: Exclude<CollapseProps["items"], undefined>[number]; schema: Schema }[] = [];
    schema.mapProperties((schema, name) => {
        const field = collapseField.query(collapseField.address.concat(name)).take();
        if (field?.display === "none" || field?.display === "hidden") return;
        if (schema["x-component"]?.indexOf("CollapsePanel") > -1) {
            const componentProps = field?.componentProps || {};
            panels.push({
                name,
                props: {
                    ...componentProps,
                    key: componentProps?.key || name,
                },
                schema,
            });
        }
    });
    return panels;
};

const createFormCollapse = (defaultActiveKeys?: ActiveKeys) => {
    const formCollapse = model({
        activeKeys: defaultActiveKeys,
        setActiveKeys(keys: ActiveKeys) {
            formCollapse.activeKeys = keys;
        },
        hasActiveKey(key: ActiveKey) {
            if (Array.isArray(formCollapse.activeKeys)) {
                if (formCollapse.activeKeys.includes(key)) {
                    return true;
                }
            } else if (formCollapse.activeKeys === key) {
                return true;
            }
            return false;
        },
        addActiveKey(key: ActiveKey) {
            if (formCollapse.hasActiveKey(key)) return;
            formCollapse.activeKeys = toArr(formCollapse.activeKeys).concat(key);
        },
        removeActiveKey(key: ActiveKey) {
            if (Array.isArray(formCollapse.activeKeys)) {
                formCollapse.activeKeys = formCollapse.activeKeys.filter(item => item !== key);
            } else {
                formCollapse.activeKeys = "";
            }
        },
        toggleActiveKey(key: ActiveKey) {
            if (formCollapse.hasActiveKey(key)) {
                formCollapse.removeActiveKey(key);
            } else {
                formCollapse.addActiveKey(key);
            }
        },
    });
    return markRaw(formCollapse);
};

const FeedbackBadge: ReactFC<IFeedbackBadgeProps> = observer(({ children, name }) => {
    const field = useField();
    const errors = field.form.queryFeedbacks({
        type: "error",
        address: `${field.address.concat(name)}.*`,
    });
    if (errors.length) {
        return (
            <Badge size="small" className="errors-badge" count={errors.length}>
                {children}
            </Badge>
        );
    }
    return <>{children}</>;
});

const FormCollapseInner = observer(({ children, defaultActiveKey, formCollapse, ...props }: IFormCollapseProps) => {
    const panels = usePanels();
    const prefixCls = usePrefixCls("formily-collapse", props);
    const _formCollapse = useMemo(() => {
        return formCollapse ? formCollapse : createFormCollapse(defaultActiveKey);
    }, [defaultActiveKey, formCollapse]);

    const takeActiveKeys = () => {
        if (props.activeKey) return props.activeKey;
        if (_formCollapse?.activeKeys) return _formCollapse?.activeKeys;
        if (props.accordion) return panels[0]?.name;
        return panels.map(item => item.name);
    };

    const items = panels.map(({ name, props, schema }) => ({
        ...props,
        children: <RecursionField schema={schema} name={name} />,
        forceRender: true,
        key: name,
        label: <FeedbackBadge name={name}>{props.label}</FeedbackBadge>,
    }));

    return (
        <Collapse
            {...props}
            className={cls(prefixCls, props.className)}
            activeKey={takeActiveKeys()}
            onChange={key => {
                props?.onChange?.(key);
                _formCollapse?.setActiveKeys?.(key);
            }}
            items={items}
        />
    );
});

export const FormCollapse = FormCollapseInner as ComposedFormCollapse;

const CollapsePanel: FC<PropsWithChildren<IFormCollapsePanelProps>> = ({ children }) => {
    return <Fragment>{children}</Fragment>;
};

FormCollapse.CollapsePanel = CollapsePanel;
FormCollapse.createFormCollapse = createFormCollapse;

type ActiveKey = string | number;
type ActiveKeys = ActiveKey | Array<ActiveKey>;

type ComposedFormCollapse = typeof FormCollapseInner & {
    CollapsePanel?: FC<PropsWithChildren<CollapsePanelProps>>;
    createFormCollapse: (defaultActiveKeys?: ActiveKeys) => IFormCollapse;
};

interface IFeedbackBadgeProps {
    name: SchemaKey;
}

export interface IFormCollapse {
    activeKeys: ActiveKeys | undefined;
    hasActiveKey(key: ActiveKey): boolean;
    setActiveKeys(key: ActiveKeys): void;
    addActiveKey(key: ActiveKey): void;
    removeActiveKey(key: ActiveKey): void;
    toggleActiveKey(key: ActiveKey): void;
}

export interface IFormCollapsePanelProps extends CollapsePanelProps {
    label?: ReactNode;
}

export interface IFormCollapseProps extends CollapseProps {
    formCollapse?: IFormCollapse;
}

export default FormCollapse;
