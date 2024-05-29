import { ArrayBase } from "@formily/antd-v5";
import { usePrefixCls } from "@formily/antd-v5/lib/__builtins__";
import { ArrayField as ArrayFieldType, Field, isArrayField } from "@formily/core";
import { RecursionField, Schema, observer, useField, useFieldSchema } from "@formily/react";
import { Empty, Table, TableProps } from "antd";
import cls from "classnames";
import { FC, Fragment } from "react";
import useStyles from "./style";

const defaultProps: TableProps = { bordered: true, size: "small" };

const compileColumns = (schema: Schema[], arrayField: ArrayFieldType) => {
    const parseSource = (item: Schema): ColumnsType => {
        if (isSchema(item, "Column")) {
            const props = item["x-component-props"] || {};
            const dataIndex = props.dataIndex || Object.keys(item.properties || {})[0] || "";

            const field = arrayField.query(arrayField.address.concat(dataIndex)).take();
            const componentProps = Array.isArray(field?.component) ? field?.component[1] : undefined;
            const defaultColumn = { align: "center", title: item.title || props.title };

            return dataIndex === ""
                ? []
                : [
                      {
                          ...defaultColumn,
                          ...props,
                          ...(componentProps || {}),
                          display: field?.display || item["x-display"],
                          schema: item,
                          dataIndex,
                      },
                  ];
        } else if (item.properties) {
            return item.reduceProperties<ColumnsType, ColumnsType>(
                (buf, schema) => buf.concat(parseSource(schema)),
                [],
            );
        }
        return [];
    };

    return schema.reduce<ColumnsType>((current, item) => {
        return item === undefined ? current : current.concat(parseSource(item));
    }, []);
};

const compileTableSource = (dataSource: any[], source: ColumnsType) =>
    source.reduce<ColumnItem[]>(
        (current, { dataIndex, display, schema, ...item }) =>
            display !== "visible"
                ? current
                : [
                      ...current,
                      {
                          ...item,
                          render: (_, record: any) => {
                              const index = dataSource.indexOf(record);
                              return (
                                  <ArrayBase.Item index={index} record={() => dataSource[index]}>
                                      <RecursionField name={index} schema={schema} onlyRenderProperties />
                                  </ArrayBase.Item>
                              );
                          },
                      },
                  ],
        [],
    );

const isAdditionComponent = (schema: Schema) => schema["x-component"].indexOf("Addition") > -1;

const isSchema = (schema: Schema, ...components: string[]) =>
    components.filter(name => (schema["x-component"] || "").indexOf(name) > -1).length > 0;

const Column: FC<ColumnItem> = () => <Fragment />;

const InternalArrayField: FC<Omit<TableProps, "columns" | "dataSource" | "pagination" | "rowKey">> = props => {
    const field = useField();
    const fieldSchema = useFieldSchema();
    const prefixCls = usePrefixCls("formily-array-field");
    const [wrapSSR, hashId] = useStyles(prefixCls);

    if (!fieldSchema) throw new Error("can not found schema object");

    const items = fieldSchema.items;
    if (items === undefined || !isArrayField(field)) return <Empty />;

    const dataSource = isArrayField(field) ? field.value : [];
    const source = compileColumns(Array.isArray(items) ? items : [items], field);
    const columns = compileTableSource(dataSource, source);

    return wrapSSR(
        <div className={cls(prefixCls, hashId)}>
            <ArrayBase>
                <Table
                    {...defaultProps}
                    {...props}
                    columns={columns}
                    dataSource={[...dataSource]}
                    pagination={false}
                    rowKey={record => {
                        return dataSource.indexOf(record);
                    }}
                />
                {source.map(({ dataIndex, schema }) => {
                    return <RecursionField key={dataIndex} name={dataIndex} schema={schema} onlyRenderSelf />;
                })}
                <RenderAddition schema={fieldSchema} />
            </ArrayBase>
        </div>,
    );
};

// 渲染 Schema

const RenderAddition: FC<RenderProps> = ({ schema }) =>
    schema.reduceProperties(
        (propetties, schema, key) =>
            isAdditionComponent(schema) ? <RecursionField schema={schema} name={key} /> : propetties,
        null,
    );

const ArrayField = Object.assign(ArrayBase.mixin(observer(InternalArrayField)), { Column });

interface RenderProps {
    schema: Schema;
}

type ColumnItem = Exclude<TableProps["columns"], undefined>[number];
type ColumnItemType = ColumnItem & {
    dataIndex: string;
    schema: Schema;
    display?: Field["display"];
};

type ColumnsType = ColumnItemType[];

export default ArrayField;
