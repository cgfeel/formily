import { createForm } from "@formily/core";
import { FC } from "react";
import Panel from "../../Panel";
import SchemaField from "./SchemaField";

const form = createForm();

const Increment: FC = () => (
    <Panel
        form={form}
        header={
            <h2>
                <code>ResursionField</code> - 自增列表递归
            </h2>
        }>
        <SchemaField>
            <SchemaField.Array name="custom" x-component="ArrayItmes">
                <SchemaField.Object>
                    <SchemaField.String name="input" x-component="Input" />
                </SchemaField.Object>
            </SchemaField.Array>
        </SchemaField>
    </Panel>
);

export default Increment;
