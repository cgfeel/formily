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

const SelectSectionExample: FC = () => {
    const form = useMemo(
        () =>
            createForm({
                /*initialValues: {
                    "search-user": "test",
                    collapse: [{ name: "", section: "技术" }],
                },*/
                effects() {
                    onFormValuesChange(() => console.log("aaa"));
                    onFieldInit("collapse", field => {
                        // const data = (isArrayField(field) ? field.value : []) as UserItem[];
                        // field.setData({ list: data.map(({ name, section }) => name || section) });
                    });
                    onFieldChange("collapse.*", field => {
                        console.log(field.path.toString());
                    });
                    /*onFieldInit("collapse.*.section", field => {
                        if (isField(field)) {
                            const { parent } = field;
                            const data = (isArrayField(parent) ? parent.value : []) as UserItem[];

                            const [, path] = field.path.toArr();
                            data.forEach(
                                ({ name, section }) =>
                                    name === "" &&
                                    section === path &&
                                    field.setComponentProps({ defaultChecked: true }),
                            );
                        }
                    });*/
                    onFieldInit("collapse.*", field => {
                        /*if (isField(field)) {
                            const [, path] = field.path.toArr();
                            const { list = [] } = form.query("collapse").take()?.data || {};
                            if (list.indexOf(path) > -1) {
                                field.setComponentProps({ defaultChecked: true });
                            }
                        }*/
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
                            x-component-props={{ suffix: <SearchOutlined /> }}
                        />
                        <SchemaField.Boolean
                            name="tool"
                            x-component="Checkbox"
                            x-content="全选"
                            x-data={90}
                            x-decorator="ToolBar"
                        />
                        <SchemaField.Object
                            name="collapse"
                            x-component="SelectCollapse"
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
                            <SchemaField.String name="section" x-component="Checkbox" x-decorator="PanelStop" />
                            <SchemaField.Void x-component="UserGroup">
                                <SchemaField.Object name="user-item" x-component="UserCheckBox" />
                            </SchemaField.Void>
                        </SchemaField.Object>
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
                        <SchemaField.Object
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
                        />
                        <SchemaField.Array name="collapse">
                            <SchemaField.String name="section" />
                            <SchemaField.String name="user" />
                        </SchemaField.Array>
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
