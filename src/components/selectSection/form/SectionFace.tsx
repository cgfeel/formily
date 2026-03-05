import { createForm } from "@formily/core";
import { FC, useMemo, useState } from "react";
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
    <SectionBase fieldName={section} form={form} mount={mount} value={value}>
      <FaceSchema />
    </SectionBase>
  );
};

export default SectionFace;
