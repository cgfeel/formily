import { FC } from "react";
import SchemaField from "./SchemaField";

const TimePicker: FC = () => (
  <SchemaField.Void title="Antd.1.4 日期与时间组件" x-component="VoidComponent">
    <SchemaField.String
      name="tim-picker"
      title="TimePicker"
      x-component="TimePicker"
      x-decorator="FormItem"
      required
    />
    <SchemaField.Array
      name="[time-range-picker1, time-range-picker2]"
      title="TimePicker.RangePicker"
      x-component="TimePicker.RangePicker"
      x-decorator="FormItem"
      required
    />
    <SchemaField.String
      name="date-picker"
      title="DatePicker"
      x-component="DatePicker"
      x-decorator="FormItem"
      required
    />
    <SchemaField.Array
      name="[date-range-picker1, date-range-picker2]"
      title="DatePicker.RangePicker"
      x-component="DatePicker.RangePicker"
      x-decorator="FormItem"
      required
    />
  </SchemaField.Void>
);

export default TimePicker;
