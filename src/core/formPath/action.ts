import { Field, GeneralField, isField, onFieldChange, onFieldReact, onFieldUnmount, onFormInit } from "@formily/core";

export const actionDisabled = (field: Field, name: string) => {
    const read = field.query(".read").value()||false;
    if (read) field.setComponent(name);
};

export const localEffect = (init: AnyFunc, hooks: AnyFunc, setTarget: TargetFn) => () => {
    hooks();
    onFormInit(init);
    onFieldUnmount("group.*.print", field => {
        init();
        field.form.query("group.*.print").forEach(field => setTarget(field));
    });

    onFieldReact("group.*.print", setTarget);
};

export const readEffect = () => {
    onFieldChange('group.*.read', field => {
        const read = isField(field) ? field.value||false : false;
        if (!read) return;

        field.query('.path').take(target => target.setState({ pattern: "disabled" }));
        field.query('.text').take(target => target.setState({ pattern: "disabled" }));
    });
};

export type FormDataType = {
    group: GroupItem[];
}

type AnyFunc = () => void;
type TargetFn = (field: GeneralField) => void;

type GroupItem = {
    path: string;
    read?: boolean;
    text?: string;
};