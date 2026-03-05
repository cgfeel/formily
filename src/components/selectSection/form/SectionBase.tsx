import { Form, isArrayField } from "@formily/core";
import { FormProvider } from "@formily/react";
import { FC, PropsWithChildren, useEffect } from "react";
import type { SectionItem } from "../hooks/useFakeService";
import { isKey } from "../utils/fields";
import { filterValue } from "./utils";

const SectionBase: FC<PropsWithChildren<SectionBaseProps>> = ({
  children,
  fieldName,
  form,
  mount,
  value,
}) => {
  // 配合 input change
  useEffect(() => {
    if (mount) {
      form.query(fieldName).take(field => {
        if (!isArrayField(field)) return;

        const fieldValue = filterValue(field.value) ?? [];
        const pushData = filterValue(value) ?? [];

        if (fieldValue.length !== pushData.length) {
          field.value = pushData;
          return;
        }

        const mapValue = fieldValue.reduce<Record<string, SectionItem>>(
          (current, item) => ({ ...current, [`${item.name}:${item.section}`]: item }),
          {},
        );
        const pushValue = pushData.filter(
          ({ name, section }) => !isKey(`${name}:${section}`, mapValue),
        );

        if (pushValue.length > 0 || (pushData.length === 0 && fieldValue.length > 0))
          field.value = pushData;
      });
    }
  }, [fieldName, form, mount, value]);

  return <FormProvider form={form}>{children}</FormProvider>;
};

export default SectionBase;

export interface SectionInputProps {
  value?: SectionItem[];
  onChange?: (value?: SectionItem[]) => void;
}

interface SectionBaseProps {
  fieldName: string;
  form: Form;
  mount?: boolean;
  value?: SectionItem[];
}
