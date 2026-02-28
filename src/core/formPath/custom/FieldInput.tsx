import { Input } from "@formily/antd-v5";
import { InputProps } from "antd";
import { ChangeEvent, FC, useCallback } from "react";

const FieldInput: FC<FieldInputProps> = ({ onChange, patten = /[^\d\w]/g, ...props }) => {
  const { value } = props;
  const handle = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      const data = value.replace(patten, "");
      onChange && onChange(value === "" ? value : data);
    },
    [patten, onChange],
  );

  return (
    <Input
      {...props}
      onChange={handle}
      onBlur={() => {
        const data = value?.toString().replace(patten, "") || "";
        onChange && onChange(!value ? "" : data);
      }}
    />
  );
};

interface FieldInputProps extends Omit<InputProps, "onChange" | "onBlur"> {
  patten?: RegExp;
  onChange?: (value: string) => void;
}

export default FieldInput;
