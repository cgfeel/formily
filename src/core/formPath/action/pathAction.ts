import { Field, FormPath, GeneralField, isField, onFieldChange, onFieldReact } from "@formily/core";

const onlyRead = () => {
    onFieldChange('group.*.read', field => {
        const read = isField(field) ? field.value||false : false;
        if (!read) return;

        field.query('.path').take(target => target.setState({ pattern: "disabled" }));
        field.query('.text').take(target => target.setState({ pattern: "disabled" }));
    });
};

export const actionDisabled = (field: Field, name: string) => {
    const read = field.query(".read").value()||false;
    if (read) field.setComponent(name);
};

export const checkDataPath = (value: string) => {
    try {
        return value && FormPath.parse(value).isMatchPattern ? "只能使用数据路径" : "";
    } catch {
        return '路径语法错误';
    }
};

export const checkMatchPath = (field: GeneralField) => {
    isField(field) && 
    field.setValidator(value => {
        try {
            const group = [String(field.query('.path').value()||''), String(value||'')].filter(value => value ? FormPath.parse(value).isMatchPattern : false);
            return group.length === 2 ? "不能全是匹配路径" : "";
        } catch {
            return '路径或匹配有错误';
        }
    });
};

export const matchEffect = (reactFilter?: FilterFn) => {
    onlyRead();
    onFieldReact("group.*.print", field => {
        if (!isField(field)) return;
        const pathFiled = field.query(".path");
        const path = String(pathFiled.value()||'');
        const text = String(field.query(".text").value()||'');

        try {
            const [address = '', value = '', additional = ''] = reactFilter ? reactFilter([path, text, field]) : [path, text];
            if (address && value) {
                field.value = value + additional;
            } else {
                field.value = "";
            }
        } catch {
        }
    });
};

export const printEffect = (reactFilter?: FilterFn) => {
    onlyRead();
    onFieldReact("group.*.print", field => {
        if (!isField(field)) return;
        const pathFiled = field.query(".path");
        const path = String(pathFiled.value()||'');

        if (checkDataPath(path) !== '') {
            field.value = '';
            return;
        }

        try {
            const text = String(field.query(".text").value()||'');
            const [address = '', value = '', additional = ''] = reactFilter ? reactFilter([path, text]) : [path, text];
            const target = {};

            if (address && value) {
                FormPath.setIn(target, address, value);
                field.value = FormPath.getIn(target, address) + additional;
            } else {
                field.value = "";
            }
        } catch {
        }
    });
};

export type FilterFn = (value: [string, string, Field?]) => string[];