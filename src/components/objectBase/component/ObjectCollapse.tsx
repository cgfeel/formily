import { usePrefixCls } from "@formily/antd-v5/lib/__builtins__";
import { ObjectField } from "@formily/core";
import { ISchema, RecursionField, Schema, observer, useField, useFieldSchema } from "@formily/react";
import { Button, Card, Col, Empty, Row } from "antd";
import { FC, PropsWithChildren } from "react";
import ObjectBase, { IObjectBaseProps, useObject } from "./ObjectBase";
import useStyle from "./styles";

const defaultDataValue: DefaultDataType = {
    ops: "and",
    item: { op: ">" },
};

function getDataSource(data: any): DataType {
    return isObject(data) ? data : {};
}

const isAdditionComponent = (schema: ISchema) => schema["x-component"]?.indexOf?.("Addition") > -1;

const isDataType = (data: Exclude<DataType["children"], undefined>[number]): data is DataType =>
    "children" in data && Array.isArray(data.children);

const isObject = (data: any): data is DataType => data instanceof Object && data.constructor === Object;

const isOpsComponent = (schema: ISchema) => schema["x-component"]?.indexOf?.("Options") > -1;

const isRemoveComponent = (schema: ISchema) => schema["x-component"]?.indexOf?.("Remove") > -1;

const isOperationComponent = (schema: ISchema) =>
    isAdditionComponent(schema) || isOpsComponent(schema) || isRemoveComponent(schema);

const CollapsePanel: FC<PropsWithChildren> = ({ children }) => <>{children}</>;

const InternalObjectCollapse: FC<PropsWithChildren<ObjectCollapseProps>> = ({
    defaultData = defaultDataValue,
    ...props
}) => {
    const field = useField<ObjectField>();
    const dataSource = getDataSource(field.value);

    const prefix = usePrefixCls("formily-object-collapse", props);
    const schema = useFieldSchema();
    if (!schema) throw new Error("can not found schema object");

    return (
        <ObjectBase {...props} defaultData={defaultData}>
            {Object.keys(dataSource).length === 0 ? (
                <RenderEmpty field={field} />
            ) : (
                <RenderItems dataSource={dataSource} prefix={prefix} schema={schema} />
            )}
        </ObjectBase>
    );
};

const RenderAddition: FC<Omit<RenderItemsProps, "dataSource" | "prefix">> = ({ schema, path = "" }) =>
    schema.reduceProperties((addition, schema, key) => {
        return isAdditionComponent(schema) ? <RecursionField schema={schema} name={`${path}.${key}`} /> : addition;
    }, null);

const RenderCollapse: FC<PropsWithChildren<Omit<RenderItemsProps, "dataSource" | "prefix">>> = ({
    children,
    path,
    schema,
}) => {
    return schema.reduceProperties((collapse, schema) => {
        return !isOperationComponent(schema) ? (
            <Row gutter={8}>
                <Col>
                    <RecursionField schema={schema} name={path} />
                </Col>
                <Col>{children}</Col>
            </Row>
        ) : (
            collapse
        );
    }, null);
};

const RenderEmpty: FC<{ field: ObjectField }> = ({ field }) => {
    const {
        props: { defaultData },
    } = useObject();
    return (
        <Card>
            <Empty>
                <Button
                    type="primary"
                    onClick={() => (field.value = { ops: defaultData.ops, children: [defaultData.item] })}>
                    Create Now
                </Button>
            </Empty>
        </Card>
    );
};

const RenderItems: FC<RenderItemsProps> = ({ dataSource, prefix, schema, path = "" }) => {
    const { children = [] } = dataSource;
    const [wrapSSR] = useStyle(prefix);
    return wrapSSR(
        <ObjectBase.Item record={dataSource}>
            <Row className={`${prefix}-item`}>
                <RenderOps path={path} schema={schema} />
                <Col flex="auto">
                    {children.map((item, i) =>
                        isDataType(item) ? (
                            <RenderItems
                                dataSource={item}
                                key={i}
                                path={[path, "children", i].join(".")}
                                prefix={prefix}
                                schema={schema}
                            />
                        ) : (
                            <RenderCollapse key={i} path={[path, "children", i].join(".")} schema={schema}>
                                <ObjectBase.Item index={i} record={dataSource}>
                                    <RenderRemove path={path} schema={schema} />
                                </ObjectBase.Item>
                            </RenderCollapse>
                        ),
                    )}
                    <RenderAddition path={path} schema={schema} />
                </Col>
            </Row>
        </ObjectBase.Item>,
    );
};

const RenderOps: FC<Omit<RenderItemsProps, "dataSource" | "prefix">> = ({ schema, path = "" }) => {
    return schema.reduceProperties((ops, schema) => {
        return isOpsComponent(schema) ? <RecursionField schema={schema} name={[path, "ops"].join(".")} /> : ops;
    }, null);
};

const RenderRemove: FC<Omit<RenderItemsProps, "dataSource" | "prefix">> = ({ schema, path = "" }) =>
    schema.reduceProperties((addition, schema, key) => {
        return isRemoveComponent(schema) ? <RecursionField schema={schema} name={`${path}.${key}`} /> : addition;
    }, null);

const ObjectCollapse = Object.assign(ObjectBase.mixin(observer(InternalObjectCollapse)), {
    CollapsePanel,
});

interface RenderItemsProps {
    dataSource: DataType;
    prefix: string;
    schema: Schema;
    path?: string;
}

interface ObjectCollapseProps extends Partial<IObjectBaseProps> {
    prefixCls?: string;
}

type DataType = {
    ops?: string;
    children?: Array<Record<string, boolean | number | string> | DataType>;
};

type DefaultDataType = {
    ops: string;
    item: Record<string, any>;
};

export { ObjectCollapse };

export default ObjectCollapse;
