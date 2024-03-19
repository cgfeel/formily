import { ArrayBase, ArrayBaseMixins, IArrayBaseProps } from "@formily/antd-v5";
import { ArrayField } from "@formily/core";
import { ISchema, RecursionField, observer, useField, useFieldSchema } from "@formily/react";
import { toArr } from "@formily/shared";
import { Badge, Card, Collapse, CollapsePanelProps, CollapseProps, Empty } from "antd";
import { createStyles, css } from "antd-style";
import { FC, Fragment, PropsWithChildren, useState, useEffect } from "react";

const useStyles = createStyles(css`
    margin-bottom: 10px;
`);

const isAdditionComponent = (schema: ISchema) => {
    return schema["x-component"]?.indexOf?.("Addition") > -1;
};

const isIndexComponent = (schema: ISchema) => {
    return schema["x-component"]?.indexOf?.("Index") > -1;
};

const isRemoveComponent = (schema: ISchema) => {
    return schema["x-component"]?.indexOf?.("Remove") > -1;
};

const isMoveUpComponent = (schema: ISchema) => {
    return schema["x-component"]?.indexOf?.("MoveUp") > -1;
};

const isMoveDownComponent = (schema: ISchema) => {
    return schema["x-component"]?.indexOf?.("MoveDown") > -1;
};

const isOperationComponent = (schema: ISchema) => {
    return (
        isAdditionComponent(schema) ||
        isRemoveComponent(schema) ||
        isMoveDownComponent(schema) ||
        isMoveUpComponent(schema)
    );
};

const range = (count: number) => Array.from({ length: count }).map((_, i) => i);

const takeDefaultActiveKeys = (dataSourceLength: number, defaultOpenPanelCount: number) => {
    if (dataSourceLength < defaultOpenPanelCount) return range(dataSourceLength);
    return range(defaultOpenPanelCount);
};

const insertActiveKeys = (activeKeys: number[], index: number) => {
    if (activeKeys.length <= index) return activeKeys.concat(index);
    return activeKeys.reduce<number[]>((buf, key) => {
        if (key < index) return buf.concat(key);
        if (key === index) return buf.concat([key, key + 1]);
        return buf.concat(key + 1);
    }, []);
};

const ArrayCollapseInner = observer((props: IArrayCollapseProps & IArrayBaseProps) => {
    const field = useField<ArrayField>();
    const { styles, cx: cls } = useStyles();

    const dataSource = Array.isArray(field.value) ? field.value : [];
    const { onAdd, onCopy, onRemove, onMoveDown, onMoveUp, defaultOpenPanelCount = 0 } = props;

    const [activeKeys, setActiveKeys] = useState<number[]>(
        takeDefaultActiveKeys(dataSource.length, defaultOpenPanelCount),
    );
    const schema = useFieldSchema();
    const dataLength = dataSource.length;

    useEffect(() => {
        if (!field.modified && dataLength) {
            setActiveKeys(takeDefaultActiveKeys(dataLength, defaultOpenPanelCount || 0));
        }
    }, [dataLength, defaultOpenPanelCount, field, setActiveKeys]);
    if (!schema) throw new Error("can not found schema object");

    const renderAddition = () => {
        return schema.reduceProperties((addition, schema, key) => {
            if (isAdditionComponent(schema)) {
                return <RecursionField schema={schema} name={key} />;
            }
            return addition;
        }, null);
    };
    const renderEmpty = () => {
        if (dataSource.length) return;
        return (
            <Card className={cls(styles, props.className)}>
                <Empty />
            </Card>
        );
    };

    const renderItems = () => {
        const collapseItems = dataSource.map((item, index) => {
            const items = Array.isArray(schema.items) ? schema.items[index] || schema.items[0] : schema.items;

            const panelProps = field.query(`${field.address}.${index}`).get("componentProps");
            const props: CollapsePanelProps = items === undefined ? {} : items["x-component-props"];
            const header = () => {
                const header = panelProps?.header || props.header || field.title;
                const path = field.address.concat(index);
                const errors = field.form.queryFeedbacks({
                    type: "error",
                    address: `${path}.**`,
                });

                return (
                    <ArrayBase.Item index={index} record={() => field.value?.[index]}>
                        <RecursionField
                            schema={items || {}}
                            name={index}
                            filterProperties={schema => {
                                if (!isIndexComponent(schema)) return false;
                                return true;
                            }}
                            onlyRenderProperties
                        />
                        {errors.length ? (
                            <Badge size="small" className="errors-badge" count={errors.length}>
                                {header}
                            </Badge>
                        ) : (
                            header
                        )}
                    </ArrayBase.Item>
                );
            };

            const extra = (
                <ArrayBase.Item index={index} record={item}>
                    <RecursionField
                        schema={items || {}}
                        name={index}
                        filterProperties={schema => {
                            if (!isOperationComponent(schema)) return false;
                            return true;
                        }}
                        onlyRenderProperties
                    />
                    {panelProps?.extra}
                </ArrayBase.Item>
            );

            const content = (
                <RecursionField
                    schema={items || {}}
                    name={index}
                    filterProperties={schema => {
                        if (isIndexComponent(schema)) return false;
                        if (isOperationComponent(schema)) return false;
                        return true;
                    }}
                />
            );
            return {
                ...props,
                ...panelProps,
                forceRender: true,
                children: (
                    <ArrayBase.Item index={index} key={index} record={item}>
                        {content}
                    </ArrayBase.Item>
                ),
                key: index,
                label: header(),
                extra,
            };
        });
        return (
            <Collapse
                {...props}
                activeKey={activeKeys}
                className={cls(styles, props.className)}
                items={collapseItems}
                onChange={keys => setActiveKeys(toArr(keys).map(Number))}></Collapse>
        );
    };
    return (
        <ArrayBase
            onAdd={index => {
                onAdd?.(index);
                setActiveKeys(insertActiveKeys(activeKeys, index));
            }}
            onCopy={onCopy}
            onRemove={onRemove}
            onMoveUp={onMoveUp}
            onMoveDown={onMoveDown}>
            {renderEmpty()}
            {renderItems()}
            {renderAddition()}
        </ArrayBase>
    );
});

const CollapsePanel: FC<PropsWithChildren<CollapsePanelProps>> = ({ children }) => {
    return <Fragment>{children}</Fragment>;
};

CollapsePanel.displayName = "CollapsePanel";

export const ArrayCollapse = ArrayCollapseInner as ComposedArrayCollapse;

ArrayCollapse.displayName = "ArrayCollapse";
ArrayCollapse.CollapsePanel = CollapsePanel;

ArrayBase.mixin(ArrayCollapse);

type ComposedArrayCollapse = typeof ArrayCollapseInner &
    ArrayBaseMixins & {
        CollapsePanel?: FC<PropsWithChildren<CollapsePanelProps>>;
    };

export interface IArrayCollapseProps extends CollapseProps {
    defaultOpenPanelCount?: number;
}

export default ArrayCollapse;
