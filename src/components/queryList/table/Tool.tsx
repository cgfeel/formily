import { FC } from "react";
import { SchemaField } from ".";

const visableField = [
  { label: "姓名", value: "name" },
  { label: "性别", value: "sex" },
  { label: "年级", value: "grade" },
  { label: "出生", value: "date" },
  { label: "入学", value: "year" },
  { label: "地区", value: "region" },
];

const Tool: FC = () => (
  <SchemaField.String
    name="visible"
    title="展示"
    x-component="Checkbox.Group"
    x-decorator="FormItem"
    default={visableField.map(item => item.value)}
    enum={visableField}
  />
);

export { visableField };

export default Tool;
