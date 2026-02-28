import { FormPath, GeneralField, isField } from "@formily/core";
import { Path } from "@formily/path";

const isPathkey = (obs: Path, key: string): key is keyof Path => {
  return key in obs;
};

export const extraCode = (field: GeneralField) => {
  const path = field.query("path").value() || "";
  const name = field.path.toString();

  if (path) {
    field.display = "visible";
    field.setDecoratorProps({ extra: `FormPath.parse('${path}').${name};` });
  } else {
    field.display = "none";
  }
};

export const fieldData = (field: GeneralField, self?: boolean) => {
  const target = self ? field : field.parent;
  const { display } = target;

  const path = field.query("path").value() || "";
  const name = target.path.toString();

  const formPath = FormPath.parse(path);
  if (!isField(field) || display !== "visible" || !isPathkey(formPath, name)) return;

  if (["segments", "tree"].indexOf(name) < 0) {
    field.value = String(formPath[name]);
  } else {
    const data = formPath[name];
    field.value = data ? JSON.stringify(data, null, 2) : String(data);
  }
};
