import { FC } from "react";
import SchemaField from "./SchemaField";

const Select: FC = () => (
    <SchemaField.Void title="Antd.1.3 选择组件" x-component="VoidComponent">
        <SchemaField.Number
            name="select"
            title="Select"
            x-component="Select"
            x-decorator="FormItem"
            enum={[
                { label: "Option 1", value: 1 },
                { label: "Option 2", value: 2 },
            ]}
            required
        />
        <SchemaField.String
            name="tree-select"
            title="TreeSelect"
            x-component="TreeSelect"
            x-decorator="FormItem"
            enum={[
                {
                    label: "Option 1",
                    value: 1,
                    children: [
                        {
                            key: "0-0-0",
                            title: "Child Node 1",
                            value: "0-0-0",
                        },
                        {
                            key: "0-0-1",
                            title: "Child Node 2",
                            value: "0-0-1",
                        },
                        {
                            key: "0-0-2",
                            title: "Child Node 3",
                            value: "0-0-2",
                        },
                    ],
                },
                {
                    label: "Option 2",
                    value: 2,
                    children: [
                        {
                            key: "0-1-0",
                            title: "Child Node 1",
                            value: "0-1-0",
                        },
                        {
                            key: "0-1-1",
                            title: "Child Node 2",
                            value: "0-1-1",
                        },
                        {
                            key: "0-1-2",
                            title: "Child Node 3",
                            value: "0-1-2",
                        },
                    ],
                },
            ]}
            required
        />
    </SchemaField.Void>
);

export default Select;
