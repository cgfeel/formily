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
import { debounce, asyncDataSource, useFakeService } from "./hooks/useFakeService";

const SelectSectionExample: FC = () => {
    const [request] = useFakeService(3000);
    const form = useMemo(
        () =>
            createForm({
                effects: () => {
                    asyncDataSource("collapse", request);
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
                            x-component-props={{ suffix: <SearchOutlined /> }}
                            x-reactions={{
                                dependencies: [".collapse"],
                                fulfill: {
                                    state: {
                                        value: "{{ ($deps[0]||[]).length}}",
                                    },
                                },
                            }}
                        />
                        <SchemaField.Boolean
                            name="tool"
                            x-component="Checkbox"
                            x-content="全选"
                            x-data={`90/100`}
                            x-decorator="ToolBar"
                            x-reactions={{
                                dependencies: [".collapse", ".collapse#enum"],
                                fulfill: {
                                    state: {
                                        data: "{{ ($deps[0]||[]).length + '/' + ($deps[1]||[]).length }}",
                                    },
                                },
                            }}
                        />
                        <SchemaField.Void x-component="ScrollWapper">
                            <SchemaField.Array
                                enum={
                                    [
                                        /*{ name: "Levi", section: "技术" },
                                    { name: "Adam", section: "产品" },
                                    { name: "Austin", section: "UI" },
                                    { name: "David", section: "技术" },
                                    { name: "John", section: "HR" },
                                    { name: "Michael", section: "财务" },
                                    { name: "Nicholas", section: "UI" },
                                    { name: "Peter", section: "产品" },*/
                                    ]
                                }
                                name="collapse"
                                x-component="SelectCollapse"
                                x-component-props={{
                                    size: "small",
                                }}>
                                <SchemaField.Object>
                                    <SchemaField.Boolean
                                        x-component="SelectCollapse.UserCheckBox"
                                        x-decorator="SelectCollapse.PanelDecorator"
                                    />
                                    <SchemaField.Void x-component="UserGroup">
                                        <SchemaField.String
                                            x-component="SelectCollapse.UserCheckBox"
                                            x-content={<UserCheckBox.Face />}
                                        />
                                    </SchemaField.Void>
                                </SchemaField.Object>
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
                            x-decorator="ToolBar"
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
