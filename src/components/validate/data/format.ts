import { FORMATS } from "../SchemaField";
import { Properties } from ".";

export const schemaFormat = FORMATS.reduce<Properties>(
  (current, format) => ({
    ...current,
    [`${format}_1`]: {
      required: true,
      title: `${format}格式1`,
      type: "string",
      "x-component": "Input",
      "x-decorator": "FormItem",
      format,
    },
    [`${format}_2`]: {
      required: true,
      title: `${format}格式2`,
      type: "string",
      "x-component": "Input",
      "x-decorator": "FormItem",
      "x-validator": format,
    },
    [`${format}_3`]: {
      required: true,
      title: `${format}格式3`,
      type: "string",
      "x-component": "Input",
      "x-decorator": "FormItem",
      "x-validator": { format },
    },
    [`${format}_4`]: {
      required: true,
      title: `${format}格式4`,
      type: "string",
      "x-component": "Input",
      "x-decorator": "FormItem",
      "x-validator": [format],
    },
    [`${format}_5`]: {
      required: true,
      title: `${format}格式5`,
      type: "string",
      "x-component": "Input",
      "x-decorator": "FormItem",
      "x-validator": [{ format }],
    },
  }),
  {},
);
