import {
  Form,
  createEffectHook,
  isField,
  onFieldChange,
  onFieldMount,
  onFieldValueChange,
} from "@formily/core";
import { observer, useFormEffects } from "@formily/react";
import { Tag } from "antd";
import { createStyles } from "antd-style";
import { FC, useState } from "react";

const useStyle = createStyles(({ css }, mount: boolean) => {
  const color = mount ? "#000" : "#666";
  return css`
    background-color: #f2f2f2;
    border: 1px solid #ddd;
    color: ${color};
    margin-bottom: 24px;
    padding: 8px;
  `;
});

const onFieldClear = createEffectHook("field-clear", (_, form: Form) => listener => listener(form));

const Field: FC<FieldProps> = ({ name }) => {
  const [component, setComponent] = useState<string>();
  const [value, setValue] = useState<string>();
  const [mount, setMount] = useState(false);

  const { styles } = useStyle(mount);
  useFormEffects(() => {
    onFieldMount(name, () => setMount(true));
    onFieldValueChange(name, field => isField(field) && setValue(field.value));
    onFieldChange(
      name,
      ["component"],
      field => Array.isArray(field.component) && setComponent(field.component[0]),
    );
    onFieldClear((form: Form) => {
      setMount(false);
      setValue(form.values[name]);
      setComponent(
        Array.isArray(form.values[name]?.component) ? form.values[name]?.component[0] : void 0,
      );
    });
  });
  return (
    <div className={styles}>
      字段名-{name}：
      <Tag color={mount ? "success" : "default"}>状态：{mount ? "已挂载" : "未挂载"}</Tag>{" "}
      <Tag color={value ? "success" : "default"}>字段值：{value || "undefined"}</Tag>{" "}
      <Tag color={component ? "success" : "default"}>组件：{component || "undefined"}</Tag>
    </div>
  );
};

export interface FieldProps {
  name: string;
}

export default observer(Field);
