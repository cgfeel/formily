import { SearchOutlined } from "@ant-design/icons";
import { createForm, isArrayField, onFieldMount, onFieldValueChange } from "@formily/core";
import { FormProvider } from "@formily/react";
import { FC, useEffect, useMemo, useState } from "react";
import { createModalFormEffect } from "../event";
import { SectionItem, isSectionItem, useFakeService } from "../hooks/useFakeService";
import { getRandomInt, isDefined, useMemoFn } from "../utils/fields";
import Schema from "./Schema";

const filterValue = (value: unknown) =>
  !Array.isArray(value)
    ? undefined
    : value.map(item => (isSectionItem(item) ? item : undefined)).filter(isDefined);

const SectionInput: FC<SectionInputProps> = ({ value, onChange }) => {
  const [mount, setMount] = useState(false);
  const onChangeRef = useMemoFn(onChange);

  const [request] = useFakeService(getRandomInt(500, 3000));
  const form = useMemo(
    () =>
      createForm({
        effects: () => {
          createModalFormEffect(request);
          onFieldValueChange("user-map.search-list", field =>
            field.setComponentProps({ suffix: !field.value ? <SearchOutlined /> : undefined }),
          );

          // 配合 input change
          onFieldMount("user-map.section", () => {
            setMount(true);
          });

          onFieldValueChange("user-map.section", field => {
            if (onChangeRef.current) {
              const value = filterValue(field.value);
              onChangeRef.current(value?.length ? value : undefined);
            }
          });
        },
      }),
    [onChangeRef, request],
  );

  // 配合 input change
  useEffect(() => {
    if (mount) {
      form.query("user-map.section").take(field => {
        if (isArrayField(field)) field.value = filterValue(value) ?? [];
      });
    }
  }, [form, mount, value]);

  return (
    <FormProvider form={form}>
      <Schema />
    </FormProvider>
  );
};

export default SectionInput;

interface SectionInputProps {
  value?: SectionItem[];
  onChange?: (value?: SectionItem[]) => void;
}
