import { ArrayBase } from "@formily/antd-v5";
import { isArrayField } from "@formily/core";
import { RecursionField, Schema, observer, useField, useFieldSchema } from "@formily/react";
import { Empty, Table, TableProps } from "antd";
import { FC, PropsWithChildren, ReactNode } from "react";

const isAdditionComponent = (schema: Schema) => schema["x-component"].indexOf("Addition") > -1;

const isSchema = (schema: Schema, ...components: string[]) =>
    components.filter(name => schema["x-component"].indexOf(name) > -1).length > 0;

const compileColumns = (schema: Schema[]) => {
    /*const parseSource = (item: Schema): ColumnsType => {
        if (isSchema(item, "column")) {
            const { properties = {} } = item;
            return {
                ...(properties[dataIndex]["x-component-props"] || {}),
                title: properties[dataIndex].title,
                dataIndex,
            }
        } else if (item.properties) {
            return item.reduceProperties<ColumnsType, ColumnsType>((buf, schema) => buf.concat(parseSource(schema)), []);
        }
    };

    return schema.reduce<ColumnsType>((current, item) => {
        if (isSchema(item, "column")) {
            //
        } else if (item.properties) {
            return item.reduceProperties((buf, schema) => buf.concat(), current);
        }
        return current;
    }, []);*/

    const { properties = {} } = schema;
    return Object.keys(properties).reduce<[ColumnsType, CellType]>(
        ([header, columns], dataIndex) => [
            header.concat({
                ...(properties[dataIndex]["x-component-props"] || {}),
                title: properties[dataIndex].title,
                dataIndex,
            }),
            {
                ...columns,
                [dataIndex]: Object.values(properties[dataIndex].properties || {})[0],
            },
        ],
        [[], {}],
    );
};

const hasSchema = <T extends CellType, U extends string>(schema: T, key: U): schema is T & { U: Schema } =>
    key in schema;

const compileCell = (dataSource: Record<string, any>, cells: CellType) => {
    const t = cells["test"];
    // return dataSource.map((_, i) => Object.keys(cells).reduce<CellType>((current, key) => ({ ...current, [key]: cells[key] === undefined ? null : <RecursionField schema={cells[key]} name={} />  }), {}));
};

const Column: FC<PropsWithChildren<ColumnsType[number]>> = ({ children, ...props }) => (
    <div data-test={props.key}>{children}</div>
);

const InternalArrayField: FC = () => {
    const field = useField();
    const fieldSchema = useFieldSchema();

    if (!fieldSchema) throw new Error("can not found schema object");

    const items = fieldSchema.items;
    if (items === undefined) return <Empty />;

    const dataSource = isArrayField(field) ? field.value : [];
    const [header, columns] = compileColumns(Array.isArray(items) ? items : [items]);

    console.log(columns);
    return (
        <ArrayBase>
            <Table columns={header} />
            <RenderAddition schema={fieldSchema} />
        </ArrayBase>
    );
};

// 渲染 Schema

const RenderAddition: FC<RenderProps> = ({ schema }) =>
    schema.reduceProperties(
        (propetties, schema, key) =>
            isAdditionComponent(schema) ? <RecursionField schema={schema} name={key} /> : propetties,
        null,
    );

const RenderEmpty: FC<PropsWithChildren> = ({ children }) => (
    <>
        <Empty />
    </>
);

const RenderItems: FC<PropsWithChildren<RenderItemsProps>> = ({ addition, dataSource, schema }) => {
    const header = compileColumns(schema);
    return (
        <ArrayBase>
            {/* <Table columns={header} /> */}
            {addition}
        </ArrayBase>
    );
};

const ArrayField = Object.assign(ArrayBase.mixin(observer(InternalArrayField)), { Column });

interface RenderItemsProps extends RenderProps {
    addition: ReactNode;
    dataSource: Partial<Record<string, any>>;
    header: ColumnsType;
}

interface RenderProps {
    schema: Schema;
}

type ColumnsType = Exclude<TableProps["columns"], undefined>;
type CellType = Record<string, Schema | undefined>;

export default ArrayField;
