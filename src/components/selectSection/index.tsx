import { SearchOutlined } from "@ant-design/icons";
import { createForm } from "@formily/core";
import { FC, useMemo } from "react";
import Panel from "./Panel";
import SchemaField from "./SchemaField";

const SelectSectionExample: FC = () => {
    const form = useMemo(() => createForm(), []);
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
                        />
                        <SchemaField.Boolean
                            name="tool"
                            x-component="Checkbox"
                            x-data="90"
                            x-decorator="ToolBar"
                            x-content="全选"
                        />
                        <SchemaField.Array
                            name="collapse"
                            x-component="SelectCollapse"
                            x-value={{}}
                            enum={[
                                { name: "Levi", section: "技术" },
                                { name: "Adam", section: "产品" },
                                { name: "Austin", section: "UI" },
                                { name: "David", section: "技术" },
                                { name: "John", section: "HR" },
                                { name: "Michael", section: "财务" },
                                { name: "Nicholas", section: "UI" },
                                { name: "Peter", section: "产品" },
                            ]}>
                            <SchemaField.Void>
                                <SchemaField.String name="section" x-component="Checkbox" x-decorator="PanelStop" />
                                <SchemaField.Void x-component="UserGroup">
                                    <SchemaField.Object name="user-item" x-component="UserCheckBox" />
                                </SchemaField.Void>
                            </SchemaField.Void>
                        </SchemaField.Array>
                    </SchemaField.Void>
                    <SchemaField.Void
                        x-component="Card"
                        x-decorator="GridColumn"
                        x-decorator-props={{ gridSpan: 1 }}
                        x-component-props={{
                            title: "已选中的人",
                        }}>
                        <SchemaField.String name="search-select" />
                        <SchemaField.Array name="collapse">
                            <SchemaField.String name="section" />
                            <SchemaField.String name="user" />
                        </SchemaField.Array>
                    </SchemaField.Void>
                </SchemaField.Void>
            </SchemaField>
        </Panel>
    );
};

export default SelectSectionExample;
