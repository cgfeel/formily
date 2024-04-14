import { FormPath, GeneralField, isField } from "@formily/core";

const concatValue = (field: GeneralField) => {
    const array: string[] = [];
    field.query('.concat.concat-array.*').forEach(item => isField(item) && !!item.value && array.push(item.value));

    return [array, String(field.query('.concat-input').value())] as const;
};

const extraMethod: Record<string, ActionMethod> = {
    action_concat: (field, path) => {
        const [array, value] = concatValue(field);
        field.setDecoratorProps({ 
            extra: `FormPath.parse('${path}').concat(${array.length ? JSON.stringify(array) + ', ' : ''}'${value}');`, 
            feedbackError: FormPath.parse(path).isMatchPattern,
        });
    },
    action_toArr: (field, path) => {
        field.setDecoratorProps({ extra: `FormPath.parse('${path}').toArr();` });
    },
    action_toString: (field, path) => {
        field.setDecoratorProps({ extra: `FormPath.parse('${path}').toString();` });
    }
};

const fieldMethod: Record<string, ActionMethod> = {
    action_concat: (field, path) => {
        if (!isField(field)) return;
        if (FormPath.parse(path).isMatchPattern) {
            field.value = '❌ 只能用于“数据路径”语法，当前路径是“匹配路径”语法';
            return;
        }

        const [array, value] = concatValue(field);
        field.value = FormPath.parse(path).concat(array, value).toString();
    },
    action_toArr: (field, path) => {
        if (isField(field)) field.value = JSON.stringify(FormPath.parse(path).toArr(), null, 2);
    },
    action_toString: (field, path) => {
        if (isField(field)) field.value = FormPath.parse(path).toString();
    },
};

const validatorMethod: Record<string, ValidatorMethod> = {
    action_concat1: (value) => {
        return !FormPath.parse(value).isMatchPattern;
    },
};

const validator = (value: string, method: string) => {
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

export const extraCode = (field: GeneralField) => {
    const name = field.path.toString();
    const method = `action_${name}`;

    if (method in extraMethod) {
        const path = field.query("path").value()||'';
        if (!!path && validator(path, method)) {
            field.display = "visible";
            extraMethod[method](field, path);
        } else {
            field.display = "none";
        }
    }
};

export const fieldData = (field: GeneralField, self?: boolean) => {
    const target = self ? field : field.parent;
    const { display } = target;

    const name = target.path.toString();
    const method = `action_${name}`;

    if (method in fieldMethod && display === "visible") {
        const path = field.query("path").value()||'';
        try {
            fieldMethod[method](field, path);
        } catch {
            if (isField(field)) field.value = '❌ 解析失败，请检查语法是否正确';
        }
    }
}

type ActionMethod = (field: GeneralField, path: string) => void;
type ValidatorMethod = (value: string) => boolean;