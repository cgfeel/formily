import { createForm, onFieldChange } from "@formily/core";
import { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { FC, PropsWithChildren, ReactNode, createContext } from "react";
import useStylish from "../commonStylish";
import { visableField } from "./table/Tool";

dayjs.extend(customParseFormat);

const dateFormat = "YYYY-MM-DD";
const disabledDate: RangePickerProps["disabledDate"] = current => {
  return (
    current &&
    (current > dayjs("2026-06-01", dateFormat).endOf("day") ||
      current < dayjs("2022-06-01", dateFormat).endOf("day"))
  );
};

const queryForm = createForm();
const tableForm = createForm({
  effects: () => {
    onFieldChange("visible", ["value"], field => {
      visableField.forEach(({ value }) => {
        field.query(`table_list.column_${value}`).take(target => {
          if ("value" in field) {
            target.visible = field.value.indexOf(value) >= 0;
          }
        });
      });
    });
  },
});

const formData = { query: queryForm, table: tableForm, dateFormat, dayjs, disabledDate };
const FormContext = createContext(formData);

const Pannel: FC<PropsWithChildren<PannelProps>> = ({ children, footer, header }) => {
  const stylish = useStylish();
  return (
    <FormContext.Provider value={formData}>
      <div className={stylish.wraper}>
        {header}
        <div className={stylish.pannel}>{children}</div>
        {footer}
      </div>
    </FormContext.Provider>
  );
};

export interface PannelProps {
  footer?: ReactNode;
  header?: ReactNode;
}

export { FormContext };

export default Pannel;
