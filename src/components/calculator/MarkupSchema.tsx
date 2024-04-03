import { createForm } from "@formily/core";
import { FC } from "react";
import Panel from "./Panel";
import SchemaField from "./SchemaField";
import { countValue } from "./server";

const form = createForm<{ projects: ProjectsItem[] }>();

const MarkupSchema: FC = () => (
    <Panel
        form={form}
        header={
            <h2>
                通过<code>Markup Schema</code>联动计算
            </h2>
        }>
        <SchemaField scope={{ countValue }}>
            <SchemaField.Array
                name="projects"
                title="Projects"
                x-component="ArrayTable"
                x-decorator="FormItem"
                x-component-props={{ scroll: { x: 1000 } }}>
                <SchemaField.Object>
                    <SchemaField.Void
                        x-component="ArrayTable.Column"
                        x-component-props={{ align: "center", title: "Sort", width: 50 }}>
                        <SchemaField.Void x-component="ArrayTable.SortHandle" x-decorator="FormItem" />
                    </SchemaField.Void>
                    <SchemaField.Void
                        x-component="ArrayTable.Column"
                        x-component-props={{ align: "center", title: "Index", width: 80 }}>
                        <SchemaField.Void x-component="ArrayTable.Index" x-decorator="FormItem" />
                    </SchemaField.Void>
                    <SchemaField.Void x-component="ArrayTable.Column" x-component-props={{ title: "Price" }}>
                        <SchemaField.Number
                            default={0}
                            name="price"
                            x-component="NumberPicker"
                            x-decorator="Editable"
                            x-component-props={{ addonAfter: "$", min: 0 }}
                            required
                        />
                    </SchemaField.Void>
                    <SchemaField.Void x-component="ArrayTable.Column" x-component-props={{ title: "Count" }}>
                        <SchemaField.Number
                            default={0}
                            name="count"
                            x-component="NumberPicker"
                            x-decorator="Editable"
                            x-component-props={{ min: 0 }}
                            required
                        />
                    </SchemaField.Void>
                    <SchemaField.Void x-component="ArrayTable.Column" x-component-props={{ title: "Total" }}>
                        <SchemaField.Number
                            name="total"
                            x-component="NumberPicker"
                            x-decorator="FormItem"
                            x-pattern="readPretty"
                            x-component-props={{ addonAfter: "$" }}
                            x-reactions={{
                                dependencies: [".count", ".price"],
                                when: "{{$deps[0] && $deps[1]}}",
                                fulfill: {
                                    state: {
                                        value: "{{$deps[0] * $deps[1]}}",
                                    },
                                },
                                otherwise: {
                                    state: {
                                        value: 0,
                                    },
                                },
                            }}
                        />
                    </SchemaField.Void>
                    <SchemaField.Void
                        x-component="ArrayTable.Column"
                        x-component-props={{
                            dataIndex: "options",
                            fixed: "right",
                            title: "Options",
                            width: 200,
                        }}>
                        <SchemaField.Void x-component="FormItem">
                            <SchemaField.Void x-component="ArrayTable.Remove" />
                            <SchemaField.Void x-component="ArrayTable.MoveDown" />
                            <SchemaField.Void x-component="ArrayTable.MoveUp" />
                        </SchemaField.Void>
                    </SchemaField.Void>
                </SchemaField.Object>
                <SchemaField.Void title="Add" x-component="ArrayTable.Addition" />
            </SchemaField.Array>
            <SchemaField.Number
                name="total"
                title="Total"
                x-component="NumberPicker"
                x-decorator="FormItem"
                x-pattern="readPretty"
                x-component-props={{ addonAfter: "$" }}
                x-reactions={{
                    dependencies: [".projects"],
                    when: "{{$deps.length > 0}}",
                    fulfill: {
                        state: {
                            value: "{{countValue($deps[0])}}",
                        },
                    },
                }}
            />
        </SchemaField>
    </Panel>
);

export default MarkupSchema;
