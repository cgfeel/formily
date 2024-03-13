import { ArrayTable, Checkbox, DatePicker, Editable, FormItem, Input, Select } from "@formily/antd-v5";
import { createSchemaField } from "@formily/react";
import { FC, ReactNode, useContext } from "react";
import { FormContext } from "../Pannel";
import Form from "./Form";

const SchemaField = createSchemaField({
    components: {
        ArrayTable,
        Checkbox,
        DatePicker,
        Editable,
        FormItem,
        Input,
        Select,
    },
});

const QueryTable: FC<QueryTableProps> = ({ tool }) => {
    const { dateFormat, dayjs, table, disabledDate } = useContext(FormContext);
    return (
        <Form form={table}>
            <SchemaField>
                {tool}
                <SchemaField.Array
                    name="table_list"
                    x-component="ArrayTable"
                    x-decorator="FormItem"
                    x-component-props={{
                        pagination: { pageSize: 10 },
                        scroll: { x: 1200 },
                    }}>
                    <SchemaField.Object>
                        <SchemaField.Void
                            name="column_sort"
                            x-component="ArrayTable.Column"
                            x-component-props={{ align: "center", title: "排序", width: 50 }}>
                            <SchemaField.Void x-component="ArrayTable.SortHandle" x-decorator="FormItem" />
                        </SchemaField.Void>
                        <SchemaField.Void
                            name="column_id"
                            x-component="ArrayTable.Column"
                            x-component-props={{ align: "center", dataIndex: "id", title: "编号", width: 80 }}>
                            <SchemaField.Number
                                name="id"
                                x-component="Input"
                                x-decorator="FormItem"
                                x-pattern="readPretty"
                                x-reactions={{
                                    dependencies: [".assets"],
                                    when: "{{!$deps[0]}}",
                                    fulfill: {
                                        schema: {
                                            "x-value": "--",
                                        },
                                    },
                                }}
                            />
                        </SchemaField.Void>
                        <SchemaField.Void
                            name="column_type"
                            x-component="ArrayTable.Column"
                            x-component-props={{ align: "center", dataIndex: "type", title: "分组", width: 100 }}>
                            <SchemaField.String
                                name="type"
                                x-component="Input"
                                x-decorator="FormItem"
                                x-reactions={{
                                    dependencies: [".assets"],
                                    when: "{{$deps[0]}}",
                                    fulfill: {
                                        schema: {
                                            "x-pattern": "readPretty",
                                        },
                                    },
                                }}
                            />
                        </SchemaField.Void>
                        <SchemaField.Void
                            name="column_name"
                            x-component="ArrayTable.Column"
                            x-component-props={{ dataIndex: "name", title: "姓名", width: 150 }}>
                            <SchemaField.String name="name" x-component="Input" x-decorator="Editable" required />
                        </SchemaField.Void>
                        <SchemaField.Void
                            name="column_sex"
                            x-component="ArrayTable.Column"
                            x-component-props={{ dataIndex: "sex", title: "性别", width: 100 }}>
                            <SchemaField.String
                                name="sex"
                                x-component="Select"
                                x-decorator="FormItem"
                                enum={[
                                    { label: "男", value: 1 },
                                    { label: "女", value: 2 },
                                ]}
                                required
                            />
                        </SchemaField.Void>
                        <SchemaField.Void
                            name="column_grade"
                            x-component="ArrayTable.Column"
                            x-component-props={{ dataIndex: "grade", title: "年级", width: 120 }}>
                            <SchemaField.String
                                name="grade"
                                x-component="Select"
                                x-decorator="FormItem"
                                enum={[
                                    { label: "一年级", value: 1 },
                                    { label: "二年级", value: 2 },
                                    { label: "三年级", value: 3 },
                                ]}
                                required
                            />
                        </SchemaField.Void>
                        <SchemaField.Void
                            name="column_date"
                            x-component="ArrayTable.Column"
                            x-component-props={{ dataIndex: "date", title: "出生", width: 150 }}>
                            <SchemaField.String
                                name="date"
                                x-component="DatePicker"
                                x-decorator="FormItem"
                                x-component-props={{
                                    minDate: dayjs("1986-01-01", dateFormat),
                                    maxDate: dayjs("1989-12-31", dateFormat),
                                }}
                                required
                            />
                        </SchemaField.Void>
                        <SchemaField.Void
                            name="column_year"
                            x-component="ArrayTable.Column"
                            x-component-props={{ dataIndex: "year", title: "入学时间", width: 300 }}>
                            <SchemaField.String
                                name="year"
                                x-component="DatePicker.RangePicker"
                                x-decorator="FormItem"
                                x-component-props={{
                                    minDate: dayjs("2022-05-30", dateFormat),
                                    maxDate: dayjs("2026-06-01", dateFormat),
                                    disabledDate,
                                }}
                                required
                            />
                        </SchemaField.Void>
                        <SchemaField.Void
                            name="column_region"
                            x-component="ArrayTable.Column"
                            x-component-props={{ dataIndex: "region", title: "地区", width: 120 }}>
                            <SchemaField.String
                                name="region"
                                x-component="Select"
                                x-decorator="FormItem"
                                enum={[
                                    { label: "华东", value: 1 },
                                    { label: "华南", value: 2 },
                                    { label: "华北", value: 3 },
                                ]}
                                required
                            />
                        </SchemaField.Void>
                        <SchemaField.Void
                            name="column_assets"
                            x-component="ArrayTable.Column"
                            x-component-props={{ align: "center", dataIndex: "assets", title: "地区", width: 120 }}>
                            <SchemaField.String
                                name="assets"
                                x-component="Select"
                                x-decorator="FormItem"
                                x-pattern="readPretty"
                                default={false}
                                enum={[
                                    { label: "已入库", value: true },
                                    { label: "待入库", value: false },
                                ]}
                                required
                            />
                        </SchemaField.Void>
                        <SchemaField.Void
                            name="column_operations"
                            x-component="ArrayTable.Column"
                            x-component-props={{
                                dataIndex: "operations",
                                fixed: "right",
                                title: "设置",
                                width: 200,
                            }}>
                            <SchemaField.Void x-component="FormItem">
                                <SchemaField.Void x-component="ArrayTable.Remove" />
                                <SchemaField.Void x-component="ArrayTable.MoveDown" />
                                <SchemaField.Void x-component="ArrayTable.MoveUp" />
                            </SchemaField.Void>
                        </SchemaField.Void>
                    </SchemaField.Object>
                    <SchemaField.Void title="添加条目" x-component="ArrayTable.Addition" />
                </SchemaField.Array>
            </SchemaField>
        </Form>
    );
};

export interface QueryTableProps {
    tool?: ReactNode;
}

export { SchemaField };

export default QueryTable;
