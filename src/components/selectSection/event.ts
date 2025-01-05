import { createEffectHook, Form } from "@formily/core";

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

export const onExpandHandle = createEffectHook<(payload: ExpandPayloadType, form: Form) => ListenerType<ExpandPayloadType>>(
    "expand-handle",
    (payload, form) => listener => listener(payload, form),
);

type ExpandPayloadType = {
    expand: boolean;
    path: string;
};

type ListenerType<T extends unknown> = (listener: (payload: T, form: Form) => void) => void;

type PayloadType = {
    group: string[];
    section: string;
    checked?: boolean;
};