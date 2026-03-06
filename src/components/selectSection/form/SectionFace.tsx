import { createForm, isArrayField } from "@formily/core";
import { FC, useMemo, useState } from "react";
import { onSelectUserEvent } from "../event";
import { isSectionItem } from "../hooks/useFakeService";
import { useMemoFn } from "../utils/fields";
import FaceSchema from "./FaceSchema";
import SectionBase, { SectionInputProps } from "./SectionBase";
import { fieldChangeHandle, provide, section } from "./utils";

const SectionFace: FC<SectionInputProps> = ({ value, onChange }) => {
  const [mount, setMount] = useState(false);
  const changeHandle = useMemoFn(onChange);

  const form = useMemo(
    () =>
      createForm({
        effects: () => {
          onSelectUserEvent(({ checked, group, section: sectionName, path = section }, form) => {
            const field = form.query(path).take();
            if (isArrayField(field) && !checked) {
              field.setValue(
                field.value
                  .filter(isSectionItem)
                  .filter(item => item.section !== sectionName || !group.includes(item.name)),
              );
            }
          });
          provide({
            name: section,
            onChange: changeHandle.current,
            setMount,
          });

          fieldChangeHandle();
        },
      }),
    [changeHandle],
  );

  return (
    <div
      style={{
        border: "1px dashed #ddd",
        padding: 10,
        paddingBottom: !value?.length ? undefined : 0,
      }}
    >
      <SectionBase fieldName={section} form={form} mount={mount} value={value}>
        <FaceSchema />
      </SectionBase>
    </div>
  );
};

export default SectionFace;
