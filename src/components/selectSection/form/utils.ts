import { createEffectContext, onFieldMount, onFieldValueChange } from "@formily/core";
import { SectionItem, isSectionItem } from "../hooks/useFakeService";
import { isDefined } from "../utils/fields";

const { consume, provide } = createEffectContext<ProviderInstance>();

const section = "user-map.section";

export const filterValue = (value: unknown) =>
  !Array.isArray(value)
    ? undefined
    : value.map(item => (isSectionItem(item) ? item : undefined)).filter(isDefined);

export const fieldChangeHandle = () => {
  const { name, onChange, setMount } = consume();
  onFieldMount(name, () => {
    setMount(true);
  });

  onFieldValueChange(name, field => {
    if (onChange) {
      const value = filterValue(field.value);
      onChange(value?.length ? value : undefined);
    }
  });
};

export { section, provide };

interface ProviderInstance {
  name: string;
  setMount: (mount: boolean) => void;
  onChange?: (value?: SectionItem[]) => void;
}
