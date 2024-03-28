import { createForm } from "@formily/core";
import { FC } from "react";
import Panel from "../Panel";
import { fetchAddress } from "../action/asyncLoader";
import SchemaField from "./SchemaField";

const form = createForm();

const SelectInputScope: FC = () => (
    <Panel
        form={form}
        header={
            <h2>
                通过 <code>scope</code> 依赖输入内容每次加载
            </h2>
        }>
        <SchemaField scope={{ fetchAddress }}>
            <SchemaField.String name="input" title="输入框" x-component="Input" x-decorator="FormItem" required />
            <SchemaField.String
                name="select"
                title="选择框"
                x-component="Select"
                x-decorator="FormItem"
                x-component-props={{ allowClear: true }}
                x-reactions={{
                    dependencies: ["input"],
                    fulfill: {
                        schema: {
                            enum: "{{fetchAddress($deps[0]||'')($self)}}",
                        },
                    },
                }}
                required
            />
        </SchemaField>
    </Panel>
);

export default SelectInputScope;
