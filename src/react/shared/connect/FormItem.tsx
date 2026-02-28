import { isField } from "@formily/core";
import { connect, mapProps } from "@formily/react";
import { Form } from "antd";

const FormItem = connect(
  Form.Item,
  mapProps(
    {
      description: "extra",
      requests: true,
      title: "label",
      validateStatus: true,
    },
    (props, field) => ({
      ...props,
      ...(isField(field) ? { help: field.selfErrors.length ? field.selfErrors : void 0 } : {}),
    }),
  ),
);

export default FormItem;
