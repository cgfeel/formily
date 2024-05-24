import { ObjectField } from "@formily/core";
import { FC, PropsWithChildren } from "react";
import { ISchema, RecursionField, Schema, observer, useField, useFieldSchema } from "@formily/react";
import ObjectBase from "./ObjectBase";
import { Card, Empty } from "antd";

function isObject(data: any): data is object {
    return data instanceof Object && data.constructor === Object;
}

const isAdditionComponent = (schema: ISchema) => {
    return schema["x-component"]?.indexOf?.("Addition") > -1;
};

const InternalObjectCollapse: FC<PropsWithChildren> = props => {
    const field = useField<ObjectField>();
    const dataSource = isObject(field) ? field : {};

    const schema = useFieldSchema();
    if (!schema) throw new Error("can not found schema object");

    return (
        <ObjectBase>
            <RenderEmpty dataSource={dataSource} />
        </ObjectBase>
    );
};

// const RenderOpt: FC<{ schema: Schema }> = ({ schema }) => {
//     const field = useField();
//     const
// };

const renderAddition: FC<{ schema: Schema }> = ({ schema }) =>
    schema.reducePatternProperties((addition, schema, key) => {
        return isAdditionComponent(schema) ? <RecursionField schema={schema} name={key} /> : addition;
    }, null);

const RenderEmpty: FC<{ dataSource: object }> = ({ dataSource }) =>
    Object.keys(dataSource).length === 0 ? null : (
        <Card>
            <Empty />
        </Card>
    );

const ObjectCollapse = ObjectBase.mixin(observer(InternalObjectCollapse));

export { ObjectCollapse };

export default ObjectCollapse;
