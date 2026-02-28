import { DatePicker, FormItem, ISubmitProps, Input, Select } from "@formily/antd-v5";
import { FormProvider, createSchemaField } from "@formily/react";
import { Card } from "antd";
import { FC, useContext } from "react";
import { FormContext } from "../Pannel";
import PriceInterval from "./PriceInterval";
import QueryFormRaw from "./QueryForm";

const SchemaField = createSchemaField({
  components: {
    DatePicker,
    FormItem,
    Input,
    PriceInterval,
    QueryFormRaw,
    Select,
  },
});

const QueryForm: FC<QueryFormProps> = ({ onSubmit = console.log }) => {
  const { dayjs, dateFormat, query, disabledDate } = useContext(FormContext);
  return (
    <Card>
      <FormProvider form={query}>
        <SchemaField>
          <SchemaField.Object
            x-component="QueryFormRaw"
            x-component-props={{ submit: { onSubmitFailed: console.log, onSubmit } }}
          >
            <SchemaField.String
              name="id"
              title="编号范围"
              x-component="PriceInterval"
              x-decorator="FormItem"
            />
            <SchemaField.String
              name="user_type"
              title="分组"
              x-component="Input"
              x-decorator="FormItem"
              x-component-props={{ maxLength: 5, placeholder: "随意填写字符" }}
            />
            <SchemaField.String
              name="sex"
              title="性别"
              x-component="Select"
              x-decorator="FormItem"
              enum={[
                { label: "男", value: 1 },
                { label: "女", value: 2 },
              ]}
            />
            <SchemaField.String
              name="grade"
              title="年级"
              x-component="Select"
              x-decorator="FormItem"
              enum={[
                { label: "一年级", value: 1 },
                { label: "二年级", value: 2 },
                { label: "三年级", value: 3 },
              ]}
            />
            <SchemaField.String
              name="date"
              title="出生年份"
              x-component="DatePicker"
              x-decorator="FormItem"
              x-component-props={{
                minDate: dayjs("2016-01-01", dateFormat),
                maxDate: dayjs("2019-12-31", dateFormat),
              }}
            />
            <SchemaField.String
              name="year"
              title="入学时间"
              x-component="DatePicker.RangePicker"
              x-decorator="FormItem"
              x-component-props={{
                minDate: dayjs("2022-05-30", dateFormat),
                maxDate: dayjs("2026-06-01", dateFormat),
                disabledDate,
              }}
              x-decorator-props={{
                gridSpan: 2,
              }}
            />
            <SchemaField.String
              name="region"
              title="地区"
              x-component="Select"
              x-decorator="FormItem"
              enum={[
                { label: "华东", value: 1 },
                { label: "华南", value: 2 },
                { label: "华北", value: 3 },
              ]}
            />
          </SchemaField.Object>
        </SchemaField>
      </FormProvider>
    </Card>
  );
};

export interface QueryFormProps {
  onSubmit?: ISubmitProps["onSubmit"];
}

export default QueryForm;
