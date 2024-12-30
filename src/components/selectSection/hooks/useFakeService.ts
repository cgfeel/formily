import { action } from "@formily/reactive";
import { FormPathPattern, isField, onFieldInit, onFieldReact } from "@formily/core";
import { useCallback } from "react";

const data = [
    { name: "Levi", section: "技术" },
    { name: "Adam", section: "产品" },
    { name: "Austin", section: "UI" },
    { name: "David", section: "技术" },
    { name: "John", section: "HR" },
    { name: "Michael", section: "财务" },
    { name: "Nicholas", section: "UI" },
    { name: "Peter", section: "产品" },
]

export const asyncDataSource = (pattern: FormPathPattern, service: () => Promise<SectionItem[]>) => {
    onFieldInit(pattern, field => {
        if (isField(field)) {
            field.loading = true;
            service().then(action.bound!(data => {
                // console.log(field.address.toString(), data);
                field.dataSource = data;
                field.loading = false;
            }));
        }
    });
};

export const useFakeService = (delay: number) => {
    const request = useCallback((callback: FakeCallBackType) => {
        setTimeout(() => callback(data), delay);
    }, []);

    return [request];
};

export const debounce = <T extends Function, D extends any = any>(func: T, delay: number = 500) => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    function action(this: ThisParameterType<T>, ...args: D[]): void {
        if (timer !== null) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            func.hasOwnProperty('prototype') ? func.apply(this, args) : func(args);
            timer = null;
        }, delay);
    }

    return action;
};

export const throttle = <T extends Function, D extends any = any>(func: T, interval: number = 500) => {
    let lastTimer = Date.now();
    return function (this: ThisParameterType<T>|Window, ...args: D[]) {
        const now = Date.now();
        if (now >= lastTimer + interval) {
            lastTimer = now;
            func.apply(this, args);
        }
    }
};

export type SectionItem = Record<"name"|"section", string>;

type FakeCallBackType = (data: SectionItem[]) => void;