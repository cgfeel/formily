import { usePrefixCls } from "@formily/antd-v5/lib/__builtins__";
import { Schema, SchemaKey } from "@formily/json-schema";
import { ReactFC, RecursionField, observer, useField, useFieldSchema } from "@formily/react";
import { model, markRaw } from "@formily/reactive";
import { Tabs, Badge, TabPaneProps, TabsProps } from "antd";
import { cx as cls } from "antd-style";
import { FC, Fragment, PropsWithChildren, ReactNode, useMemo } from "react";

const createFormTab = (defaultActiveKey?: string) => {
    const formTab = model({
        activeKey: defaultActiveKey,
        setActiveKey(key: string) {
            formTab.activeKey = key;
        },
    });
    return markRaw(formTab);
};

const useTabs = () => {
    const tabsField = useField();
    const schema = useFieldSchema();
    const tabs: { name: SchemaKey; props: TabPaneProps; schema: Schema }[] = [];
    schema.mapProperties((schema, name) => {
        const field = tabsField.query(tabsField.address.concat(name)).take();
        if (field?.display === "none" || field?.display === "hidden") return;
        if (schema["x-component"]?.indexOf("TabPane") > -1) {
            tabs.push({
                name,
                props: {
                    key: schema?.["x-component-props"]?.key || name,
                    ...schema?.["x-component-props"],
                },
                schema,
            });
        }
    });
    return tabs;
};

const FeedbackBadge: ReactFC<IFeedbackBadgeProps> = observer(props => {
    const field = useField();
    const errors = field.form.queryFeedbacks({
        type: "error",
        address: `${field.address.concat(props.name)}.*`,
    });
    if (errors.length) {
        return (
            <Badge size="small" className="errors-badge" count={errors.length}>
                {props.tab}
            </Badge>
        );
    }
    return <Fragment>{props.tab}</Fragment>;
});

const FormTabInner = observer(({ children, formTab, ...props }: IFormTabProps) => {
    const tabs = useTabs();
    const _formTab = useMemo(() => {
        return formTab ? formTab : createFormTab();
    }, [formTab]);
    const prefixCls = usePrefixCls("formily-tab", props);
    const activeKey = props.activeKey || _formTab?.activeKey;

    const items = tabs.map(({ name, props, schema }) => ({
        ...props,
        forceRender: true,
        children: <RecursionField schema={schema} name={name} />,
        key: name.toString(),
        label: <FeedbackBadge name={name} tab={props.tab} />,
    }));

    return (
        <Tabs
            {...props}
            className={cls(prefixCls, props.className)}
            activeKey={activeKey}
            items={items}
            onChange={key => {
                props.onChange?.(key);
                _formTab?.setActiveKey?.(key);
            }}
        />
    );
});

const TabPane: FC<PropsWithChildren<IFormTabPaneProps>> = ({ children }) => {
    return <Fragment>{children}</Fragment>;
};

const FormTab = FormTabInner as ComposedFormTab;

FormTab.TabPane = TabPane;
FormTab.createFormTab = createFormTab;

interface IFeedbackBadgeProps {
    name: SchemaKey;
    tab: ReactNode;
}

type ComposedFormTab = typeof FormTabInner & {
    TabPane: FC<PropsWithChildren<IFormTabPaneProps>>;
    createFormTab: (defaultActiveKey?: string) => IFormTab;
};

export interface IFormTab {
    activeKey?: string;
    setActiveKey(key: string): void;
}

export interface IFormTabProps extends TabsProps {
    formTab?: IFormTab;
}

export interface IFormTabPaneProps extends TabPaneProps {
    key: string | number;
}

export default FormTab;
