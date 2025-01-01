import { createEffectHook, Form } from "@formily/core";

export const onExpandCollapse = createEffectHook<(payload: ExpandPayloadType, form: Form) => ListenerType<ExpandPayloadType>>(
    "expand-collapse",
    (payload, form) => listener => listener(payload, form),
);

export const onExpandHandle = createEffectHook<(payload: boolean, form: Form) => ListenerType<boolean>>(
    "expand-handle",
    (payload, form) => listener => listener(payload, form),
);

export const onSelectUserEvent = createEffectHook<(payload: PayloadType, form: Form) => ListenerType<PayloadType>>(
    "select-user-event",
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