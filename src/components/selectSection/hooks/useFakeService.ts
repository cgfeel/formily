import { action } from "@formily/reactive";
import { FormPathPattern, isField, onFieldInit } from "@formily/core";
import { useCallback } from "react";
import z from "zod";

const getSectionScmema = (name: string) => z.string({ error: `${name} 必须为字符类型` }).refine(value => value.trim() !== '', { error: `${name} 不能为空字符` })
const sectionItem = z.object({
    name: getSectionScmema('员工'),
    section: getSectionScmema('部门'),
    mail: z.string().optional()
})

const data: SectionItem[] = [
    { name: "Levi", section: "技术-前端" },
    { name: "Adam", section: "产品" },
    { name: "Austin", section: "UI" },
    { name: "David", section: "技术-前端" },
    { name: "John", section: "HR" },
    { name: "Michael", section: "财务" },
    { name: "Nicholas", section: "UI" },
    { name: "Peter", section: "产品" },
    { name: "Smith", section: "能效" },
    { name: "Jones", section: "UX" },
    { name: "Williams", section: "财务" },
]

export const asyncDataSource = (pattern: FormPathPattern, service: () => Promise<SectionItem[]>) => {
    onFieldInit(pattern, field => {
        if (isField(field)) {
            field.loading = true;
            service().then(action.bound!((data: SectionItem[]) => {
                field.dataSource = data.map(item => ({ ...item, mail: `${item.name.toLowerCase()}@mail.com` }));
                field.loading = false;
            }));
        }
    });
};

export const isSectionItem = (value: unknown): value is SectionItem => sectionItem.safeParse(value).success

export const useFakeService = (delay: number) => {
    const request = useCallback((callback: FakeCallBackType) => {
        setTimeout(() => callback(data), delay);
    }, []);

    return [request] as const;
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

export type SectionItem = z.infer<typeof sectionItem>;

type FakeCallBackType = (data: SectionItem[]) => void;