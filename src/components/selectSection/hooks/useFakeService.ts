import { action } from "@formily/reactive";
import { FormPathPattern, isField, onFieldInit } from "@formily/core";
import { useCallback } from "react";
import z from "zod";

const getSectionScmema = (name: string) =>
  z
    .string({ message: `${name} 必须为字符类型` })
    .refine(value => value.trim() !== "", { message: `${name} 不能为空字符` });

const sectionItem = z.object({
  name: getSectionScmema("员工"),
  section: getSectionScmema("部门"),
  mail: z.string().optional(),
});

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
];

export const asyncDataSource = (
  pattern: FormPathPattern,
  service: () => Promise<SectionItem[]>,
) => {
  onFieldInit(pattern, field => {
    if (isField(field)) {
      field.loading = true;
      service().then(
        action.bound!((data: SectionItem[]) => {
          field.dataSource = data;
          field.loading = false;
        }),
      );
    }
  });
};

export const isSectionItem = (value: unknown): value is SectionItem =>
  sectionItem.safeParse(value).success;

export const useFakeService = (delay: number) => {
  const request = useCallback(
    (callback: FakeCallBackType) => {
      setTimeout(
        () =>
          callback(
            data.map(item => ({
              ...item,
              mail: `${item.name.toLowerCase()}@mail.com`,
            })),
          ),
        delay,
      );
    },
    [delay],
  );

  return [request] as const;
};

export type SectionItem = z.infer<typeof sectionItem>;

type FakeCallBackType = (data: SectionItem[]) => void;
