import { SearchOutlined } from "@ant-design/icons";
import {
    createForm,
    isArrayField,
    isField,
    onFieldChange,
    onFieldInit,
    onFieldMount,
    onFieldReact,
    onFieldValueChange,
    onFormReact,
    onFormValuesChange,
} from "@formily/core";
import { FC, useMemo } from "react";
import Panel from "./Panel";
import SchemaField from "./SchemaField";
import { UserItem } from "./com/SelectCollapse";
import { FormConsumer, RecordScope } from "@formily/react";
import UserCheckBox from "./com/UserCheckBox";
import { debounce, asyncDataSource, useFakeService, SectionItem } from "./hooks/useFakeService";
import { onExpandHandle } from "./event";

const SelectSectionExample: FC = () => {
    const [request] = useFakeService(3000);
    const form = useMemo(
        () =>
            createForm({
                effects: () => {
                    asyncDataSource("collapse", async () => {
                        return new Promise<SectionItem[]>(resolve => request(resolve));
                    });
                    onExpandHandle((expand, form) => {
                        form.query("tool-all").take(field => (field.decoratorProps.expand = expand));
                    });
                    onFieldValueChange("tool-all", field => {
                        const collapse = field.query(".collapse").take();
                        if (isArrayField(collapse)) {
                            collapse.value = field.value ? collapse.dataSource || [] : [];
                        }
                    });
                },
            }),
        [],
    );
    return (
        <Panel form={form}>
            <SchemaField>
                <SchemaField.Void
                    x-component="FormGrid"
                    x-component-props={{
                        columnGap: 0,
                        maxColumns: 3,
                    }}>
                    <SchemaField.Void
                        x-component="UserMapRecord"
                        x-reactions={{
                            dependencies: [".collapse#dataSource"],
                            fulfill: {
                                state: {
                                    componentProps: { record: "{{ $deps[0] }}" },
                                },
                            },
                        }}>
                        <SchemaField.Void
                            x-component="Card"
                            x-decorator="GridColumn"
                            x-decorator-props={{ gridSpan: 2 }}>
                            <SchemaField.String
                                name="search-user"
                                x-component="Input"
                                x-decorator="CardHeader"
                                x-component-props={{
                                    allowClear: true,
                                    placeholder: "输入部门或员工名称进行筛选",
                                    suffix: <SearchOutlined />,
                                }}
                                x-reactions={{
                                    dependencies: [".collapse#dataSource"],
                                    fulfill: {
                                        state: {
                                            disabled: "{{ ($deps[0]||[]).length === 0 }}",
                                        },
                                    },
                                }}
                            />
                            <SchemaField.Boolean
                                name="tool-all"
                                x-component="CheckedAll"
                                x-content="全选"
                                x-decorator="CheckedAll.ToolBar"
                                x-decorator-props={{
                                    onExpand: expand => form.notify("expand-collapse", { expand, path: "collapse" }),
                                }}
                                x-reactions={{
                                    dependencies: [".collapse", ".collapse#dataSource"],
                                    fulfill: {
                                        state: {
                                            data: {
                                                checked: "{{ ($deps[0]||[]).length }}",
                                                total: "{{ ($deps[1]||[]).length }}",
                                            },
                                        },
                                    },
                                }}
                            />
                            <SchemaField.Void x-component="ScrollWapper">
                                <SchemaField.Array
                                    name="collapse"
                                    x-component="SelectCollapse"
                                    x-component-props={{
                                        size: "small",
                                    }}
                                    x-reactions={{
                                        dependencies: [".search-user"],
                                        fulfill: {
                                            state: {
                                                componentProps: { search: "{{ $deps[0] }}" },
                                            },
                                        },
                                    }}>
                                    <SchemaField.Object>
                                        <SchemaField.Void
                                            x-component="SelectCollapse.UserCheckBox"
                                            x-decorator="SelectCollapse.PanelDecorator"
                                        />
                                        <SchemaField.Void x-component="SelectCollapse.UserGroup">
                                            <SchemaField.Void x-component="SelectCollapse.UserCheckBox">
                                                <SchemaField.Void x-component="SelectCollapse.UserCheckBox.Face" />
                                            </SchemaField.Void>
                                        </SchemaField.Void>
                                    </SchemaField.Object>
                                    <SchemaField.Void x-component="SelectCollapse.SelectSkeleton" />
                                    <SchemaField.Void x-component="SelectCollapse.SelectEmpty" />
                                </SchemaField.Array>
                            </SchemaField.Void>
                        </SchemaField.Void>
                        <SchemaField.Void
                            x-component="Card"
                            x-decorator="GridColumn"
                            x-decorator-props={{ gridSpan: 1 }}
                            x-component-props={{
                                title: "已选中的人",
                            }}>
                            <SchemaField.String
                                name="search-select"
                                x-component="Input"
                                x-component-props={{ suffix: <SearchOutlined /> }}
                            />
                            <SchemaField.Void x-component="ScrollWapper">
                                <SchemaField.Array
                                    name="collapse-selected"
                                    x-component="SelectCollapse"
                                    x-component-props={{
                                        expandIconPosition: "start",
                                        panelsIsValue: true,
                                        size: "small",
                                    }}
                                    x-reactions={{
                                        dependencies: [".search-select", ".collapse"],
                                        fulfill: {
                                            state: {
                                                componentProps: { search: "{{ $deps[0] }}" },
                                                value: "{{ $deps[1] }}",
                                            },
                                        },
                                    }}
                                    x-pattern="readPretty">
                                    <SchemaField.Object>
                                        <SchemaField.Void x-component="SelectCollapse.UserCheckBox" />
                                        <SchemaField.Void x-component="SelectCollapse.UserGroup">
                                            <SchemaField.Void x-component="SelectCollapse.UserCheckBox">
                                                <SchemaField.Void x-component="SelectCollapse.UserCheckBox.Face" />
                                            </SchemaField.Void>
                                        </SchemaField.Void>
                                    </SchemaField.Object>
                                    <SchemaField.Void
                                        x-component="SelectCollapse.UserCheckBox.Remove"
                                        x-component-props={{
                                            type: "select-user-collapse",
                                        }}
                                    />
                                    <SchemaField.Void
                                        x-component="SelectCollapse.SelectEmpty"
                                        x-component-props={{ description: "请左侧选择员工" }}
                                    />
                                </SchemaField.Array>
                            </SchemaField.Void>
                        </SchemaField.Void>
                    </SchemaField.Void>
                </SchemaField.Void>
            </SchemaField>
            <code className="consumer">
                <pre>
                    <FormConsumer>{form => JSON.stringify(form.values, null, 2)}</FormConsumer>
                </pre>
            </code>
        </Panel>
    );
};

export default SelectSectionExample;
