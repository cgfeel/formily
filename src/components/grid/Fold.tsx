import { createForm } from "@formily/core";
import { createStyles, css } from "antd-style";
import { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { FC, createContext } from "react";
import QueryForm from "../queryList/form";
import Pannel from "./Pannel";

dayjs.extend(customParseFormat);

const dateFormat = "YYYY-MM-DD";
const disabledDate: RangePickerProps["disabledDate"] = current => {
  return (
    current &&
    (current > dayjs("2026-06-01", dateFormat).endOf("day") ||
      current < dayjs("2022-06-01", dateFormat).endOf("day"))
  );
};

const query = createForm();
const useStyles = createStyles(css`
  width: 1000px;
  & > div:not(:last-child) {
    margin-bottom: 12px;
  }
`);

const formData = { dateFormat, dayjs, query, disabledDate };
const FormContext = createContext(formData);

const Fold: FC = () => {
  const { styles } = useStyles();
  return (
    <FormContext.Provider value={formData}>
      <Pannel header={<h2>查询表单实现案例</h2>} form={query}>
        <div className={styles}>
          <QueryForm />
        </div>
      </Pannel>
    </FormContext.Provider>
  );
};

export default Fold;
