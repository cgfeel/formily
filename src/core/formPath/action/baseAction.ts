import { FormPath, GeneralField, isField } from "@formily/core";

const validator = (validatorMethod: ValidatorMethodObserver) => (value: string, method: string) => {
    try {
        FormPath.parse(value);
        if (method in validatorMethod) {
            return validatorMethod[method](value);
        }

        return true;
    } catch {
        return false;
    }
}

export const extraCode = (actionMethod: ActionMethodObserver, validatorMethod: ValidatorMethodObserver) => (field: GeneralField) => {
    const name = field.path.toString();
    const method = `action_${name}`;

    if (method in actionMethod) {
        const path = field.query("path").value()||'';
        if (!!path && validator(validatorMethod)(path, method)) {
            field.display = "visible";
            actionMethod[method](field, path);
        } else {
            field.display = "none";
        }
    }
};

export const fieldData = (actionMethod: ActionMethodObserver) => (field: GeneralField, self?: boolean) => {
    const target = self ? field : field.parent;
    const { display } = target;

    const name = target.path.toString();
    const method = `action_${name}`;

    if (method in actionMethod && display === "visible") {
        const path = field.query("path").value()||'';
        try {
            actionMethod[method](field, path);
        } catch {
            if (isField(field)) field.value = '❌ 解析失败，请检查语法是否正确';
        }
    }
}

type ActionMethod = (field: GeneralField, path: string) => void;
type ActionMethodObserver = Record<string, ActionMethod>;

type ValidatorMethod = (value: string) => boolean;
type ValidatorMethodObserver = Record<string, ValidatorMethod>;