import { createEffectHook, Form, isArrayField } from "@formily/core";
import {
  asyncDataSource,
  isSectionItem,
  SectionItem,
  useFakeService,
} from "./hooks/useFakeService";
import { isDefined, isKey } from "./utils/fields";

const onSelectUserEvent = createEffectHook<
  (payload: PayloadType, form: Form) => ListenerType<PayloadType>
>("select-user", (payload, form) => listener => listener(payload, form));

export const createModalFormEffect = (request: ReturnType<typeof useFakeService>[0]) => {
  const result: { current: Promise<SectionItem[]> } = { current: Promise.resolve([]) };
  asyncDataSource("user-map", async () => {
    result.current = new Promise<SectionItem[]>(resolve => request(resolve));
    return result.current;
  });

  onSelectUserEvent(({ checked, group, section, path = "user-map.section" }, form) => {
    const field = form.query(path).take();
    if (isArrayField(field)) {
      result.current.then(sectionItems => {
        const record = sectionItems.reduce<Record<string, SectionItem>>(
          (current, item) => (!item.name ? current : { ...current, [item.name]: item }),
          {},
        );

        const currentValue = field.value
          .filter(isSectionItem)
          .filter(item => item.section !== section || !group.includes(item.name));

        field.setValue(
          !checked
            ? currentValue
            : currentValue.concat(
                group
                  .filter(Boolean)
                  .map(name => (isKey(name, record) ? record[name] : undefined))
                  .filter(isDefined),
              ),
        );
      });
    }
  });
};

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
};

export type SectionType = {
  expand: Set<string>;
  items: SectionItem[];
};

type ListenerType<T extends unknown> = (listener: (payload: T, form: Form) => void) => void;
