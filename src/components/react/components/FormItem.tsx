import { connect, mapProps } from "@formily/react";
import { Form } from "antd";

const FormItem = connect(
  Form.Item,
  mapProps(
    {
      description: "extra",
      required: true,
      title: "label",
      validateStatus: true,
    },
    (props, field) =>
      !("selfErrors" in field)
        ? props
        : {
            ...props,
            help: field.selfErrors.length ? field.selfErrors : void 0,
          },
  ),
);

export default FormItem;
