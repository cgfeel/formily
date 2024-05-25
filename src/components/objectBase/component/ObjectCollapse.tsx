import { ObjectField } from "@formily/core";
import { FC, PropsWithChildren } from "react";
import { ISchema, RecursionField, Schema, observer, useField, useFieldSchema } from "@formily/react";
import ObjectBase, { useObject } from "./ObjectBase";
import { Button, Card, Col, Empty, Row } from "antd";

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

const InternalObjectCollapse: FC<PropsWithChildren<ObjectCollapseProps>> = ({ defaultData = defaultDataValue }) => {
    const field = useField<ObjectField>();
    const dataSource = getDataSource(field.value);

    const schema = useFieldSchema();
    if (!schema) throw new Error("can not found schema object");

    return (
        <ObjectBase defaultData={defaultData}>
            {Object.keys(dataSource).length === 0 ? (
                <RenderEmpty field={field} />
            ) : (
                <RenderItems dataSource={dataSource} schema={schema} />
            )}
        </ObjectBase>
    );
};

const RenderAddition: FC<Omit<RenderItemsProps, "dataSource">> = ({ schema, path = "" }) =>
    schema.reduceProperties((addition, schema, key) => {
        return isAdditionComponent(schema) ? <RecursionField schema={schema} name={`${path}.${key}`} /> : addition;
    }, null);

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

const RenderItems: FC<RenderItemsProps> = ({ dataSource, schema, path = "" }) => {
    const { children = [] } = dataSource;
    return (
        <ObjectBase.Item record={dataSource}>
            <Row>
                <RenderOps path={path} schema={schema} />
                <Col flex="auto">
                    {children.map((item, i) =>
                        isDataType(item) ? (
                            <RenderItems
                                dataSource={item}
                                key={i}
                                path={[path, "children", i].join(".")}
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
        </ObjectBase.Item>
    );
};

const RenderCollapse: FC<PropsWithChildren<Omit<RenderItemsProps, "dataSource">>> = ({ children, path, schema }) => {
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

const RenderOps: FC<Omit<RenderItemsProps, "dataSource">> = ({ schema, path = "" }) => {
    return schema.reduceProperties((ops, schema, key) => {
        return isOpsComponent(schema) ? <RecursionField schema={schema} name={[path, key].join(".")} /> : ops;
    }, null);
};

const RenderRemove: FC<Omit<RenderItemsProps, "dataSource">> = ({ schema, path = "" }) =>
    schema.reduceProperties((addition, schema, key) => {
        return isRemoveComponent(schema) ? <RecursionField schema={schema} name={`${path}.${key}`} /> : addition;
    }, null);

const ObjectCollapse = Object.assign(ObjectBase.mixin(observer(InternalObjectCollapse)), {
    CollapsePanel,
});

interface RenderItemsProps {
    dataSource: DataType;
    schema: Schema;
    path?: string;
}

interface ObjectCollapseProps {
    defaultData?: DefaultDataType;
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
