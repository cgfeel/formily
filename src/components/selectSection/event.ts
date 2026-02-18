import { createEffectHook, Form, isArrayField, isField, onFieldReact, onFieldValueChange } from "@formily/core";
import { asyncDataSource, SectionItem, useFakeService } from "./hooks/useFakeService";

export const createExpandCoolapse = (type: string) => {
    const onExpandCollapse = createEffectHook<(payload: boolean, form: Form) => ListenerType<boolean>>(
        `expand-${type}`,
        (payload, form) => listener => listener(payload, form),
    );

    const onSelectUserEvent = createEffectHook<(payload: PayloadType, form: Form) => ListenerType<PayloadType>>(
        `select-user-${type}`,
        (payload, form) => listener => listener(payload, form),
    );

    return { onExpandCollapse, onSelectUserEvent };
};

export const createModalFormEffect = (request: ReturnType<typeof useFakeService>[0]) => {
    asyncDataSource("user-map.collapse", async () => {
        return new Promise<SectionItem[]>(resolve => request(resolve));
    });
    asyncDataSource("user-map", async () => {
        return new Promise<SectionItem[]>(resolve => request(resolve));
    });
    // asyncDataSource("user-map.section", async () => {
    //     return new Promise<SectionItem[]>(resolve => request(resolve));
    // });
    onExpandHandle(({ expand, path }, form) => {
        if (path === "collapse") {
            form.query("tool-all").take(field => (field.decoratorProps.expand = expand));
        }
    });
    onSelectUserEvent(({ checked, group, section, path = "section" }, form) => {
        const field = form.query(path).take();
        if (isArrayField(field)) {
            const currentValue = field.value;
            const data = currentValue.filter(item => item.section !== section || group.indexOf(item.name) < 0);

            field.setValue(data.concat(!checked ? [] : group.map(name => ({ name, section }))));
        }
    });
    onFieldValueChange("tool-all", field => {
        const collapse = field.query(".collapse").take();
        if (isArrayField(collapse)) {
            collapse.value = field.value ? collapse.dataSource || [] : [];
        }
    });
    onFieldReact("collapse", field => {
        if (isArrayField(field)) {
            const checked = (field.value || []).length;
            const total = (field.dataSource || []).length;

            field.query(".tool-all").take(target => {
                target.content = `全选 (${checked}/${total})`;
                target.data = { checked, total };
                target.componentProps = {
                    checked: total > 0 && checked === total,
                    disabled: total === 0,
                    indeterminate: checked > 0 && checked < total,
                };
            });
        }
    });
    onFieldValueChange("pick", field => {
        field.query('.section').take(target => {
            if (isField(target)) {
                target.value = !field.value ? [] : target.dataSource || [];
            }
        });
    });
};

export const onSelectUserEvent = createEffectHook<(payload: PayloadType, form: Form) => ListenerType<PayloadType>>(
    "select-user",
    (payload, form) => listener => listener(payload, form)
);

export const onExpandHandle = createEffectHook<(payload: ExpandPayloadType, form: Form) => ListenerType<ExpandPayloadType>>(
    "expand-handle",
    (payload, form) => listener => listener(payload, form),
);

export type PayloadType = {
    group: string[];
    section: string;
    checked?: boolean;
    path?: string;
};

export type SectionDataType = {
    list?: SectionType;
    search?: SectionType;
    searchKey?: string;
    userMap?: Record<string, SectionItem>;
};

export type SectionType = {
    expand: Set<string>;
    items: SectionItem[];
}

type ExpandPayloadType = {
    expand: boolean;
    path: string;
};

type ListenerType<T extends unknown> = (listener: (payload: T, form: Form) => void) => void;