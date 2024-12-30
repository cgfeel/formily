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
import { FormConsumer } from "@formily/react";
import UserCheckBox from "./com/UserCheckBox";
import { debounce, asyncDataSource, useFakeService, SectionItem } from "./hooks/useFakeService";

const SelectSectionExample: FC = () => {
    const [request] = useFakeService(3000);
    const form = useMemo(
        () =>
            createForm({
                effects: () => {
                    asyncDataSource("collapse", async () => {
                        return new Promise<SectionItem[]>(resolve => request(resolve));
                    });
                    onFieldValueChange("tool-all", field => {
                        const collapse = field.query(".collapse").take();
                        if (isArrayField(collapse)) {
                            collapse.value = field.value ? collapse.dataSource || [] : [];
                            console.log(field.value, collapse.value);
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
                    <SchemaField.Void x-component="Card" x-decorator="GridColumn" x-decorator-props={{ gridSpan: 2 }}>
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
                                    activeKey: [],
                                    size: "small",
                                }}
                                x-reactions={{
                                    dependencies: [".search-user"],
                                    fulfill: {
                                        state: {
                                            data: { search: "{{ $deps[0] || '' }}" },
                                        },
                                    },
                                }}>
                                <SchemaField.Object>
                                    <SchemaField.Boolean
                                        x-component="SelectCollapse.UserCheckBox"
                                        x-decorator="SelectCollapse.PanelDecorator"
                                    />
                                    <SchemaField.Void x-component="SelectCollapse.UserGroup">
                                        <SchemaField.String
                                            x-component="SelectCollapse.UserCheckBox"
                                            x-content={<UserCheckBox.Face />}
                                        />
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
                        {/* <SchemaField.Object
                            name="user-item-1"
                            x-component="UserCheckBox"
                            x-data={{ name: "", section: "技术" }}
                            x-read-pretty
                        />
                        <SchemaField.Object
                            name="user-item-2"
                            x-component="UserCheckBox"
                            x-data={{ name: "levi", section: "技术" }}
                            x-read-pretty
                        /> */}
                        <SchemaField.Void x-component="ScrollWapper">
                            <SchemaField.Array name="collapse">
                                <SchemaField.String name="section" />
                                <SchemaField.String name="user" />
                            </SchemaField.Array>
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
