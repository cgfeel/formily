import { ArrayBase } from "@formily/antd-v5";
import { usePrefixCls } from "@formily/antd-v5/lib/__builtins__";
import { isArrayField } from "@formily/core";
import { RecursionField, Schema, observer, useField, useFieldSchema } from "@formily/react";
import { Empty, Table, TableProps } from "antd";
import cls from "classnames";
import { FC, PropsWithChildren } from "react";
import useStyles from "./style";

const compileColumns = (schema: Schema[]) => {
    const parseSource = (item: Schema): ColumnsType => {
        if (isSchema(item, "Column")) {
            const props = item["x-component-props"] || {};
            const dataIndex = props.dataIndex || Object.keys(item.properties || {})[0] || "";
            return dataIndex === ""
                ? []
                : [
                      {
                          ...props,
                          schema: item,
                          title: props.title || item.title,
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
        return current.concat(parseSource(item));
    }, []);
};

const isAdditionComponent = (schema: Schema) => schema["x-component"].indexOf("Addition") > -1;

const isSchema = (schema: Schema, ...components: string[]) =>
    components.filter(name => (schema["x-component"] || "").indexOf(name) > -1).length > 0;

const Column: FC<PropsWithChildren<ColumnsType[number]>> = ({ children, ...props }) => (
    <div data-test={props.key}>{children}</div>
);

const InternalArrayField: FC<Omit<TableProps, "columns" | "dataSource" | "pagination" | "rowKey">> = props => {
    const field = useField();
    const fieldSchema = useFieldSchema();
    const prefixCls = usePrefixCls("formily-array-field");
    const [wrapSSR, hashId] = useStyles(prefixCls);

    if (!fieldSchema) throw new Error("can not found schema object");

    const items = fieldSchema.items;
    if (items === undefined || !isArrayField(field)) return <Empty />;

    const dataSource = isArrayField(field) ? field.value : [];
    const columns = compileColumns(Array.isArray(items) ? items : [items]);

    const defaultProps: TableProps = { size: "small", bordered: true };

    return wrapSSR(
        <div className={cls(prefixCls, hashId)}>
            <ArrayBase>
                <Table
                    {...defaultProps}
                    {...props}
                    columns={columns.map(({ schema, ...item }) => ({
                        ...item,
                        render: (_, record) => {
                            // 让每一个单元格有一个 context
                            const index = dataSource.indexOf(record);
                            return (
                                <ArrayBase.Item index={index} record={() => field.value?.[index]}>
                                    <RecursionField name={index} schema={schema} onlyRenderProperties />
                                </ArrayBase.Item>
                            );
                        },
                    }))}
                    dataSource={[...dataSource]}
                    pagination={false}
                    rowKey={record => {
                        return dataSource.indexOf(record);
                    }}
                />
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

type ColumnItem = Exclude<TableProps["columns"], undefined>[number] & { schema: Schema };
type ColumnsType = ColumnItem[];

export default ArrayField;
