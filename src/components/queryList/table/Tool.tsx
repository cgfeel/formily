import { Card } from "antd";
import { FC } from "react";
import { SchemaField } from ".";

const Tool: FC = () => (
    <SchemaField.String
        name="visible"
        title="展示"
        x-component="Checkbox.Group"
        x-decorator="FormItem"
        default={["name"]}
        enum={[{ label: "姓名", value: "name" }]}
    />
);

export default Tool;
