import { FC } from "react";
import SchemaField from "../SchemaField";

const EmptySchema: FC = () => (
  <SchemaField.Void
    x-component="Empty"
    x-component-props={{ description: "请先设置路径" }}
    x-reactions={{
      dependencies: ["path"],
      when: "{{!!$deps[0] && validator($deps[0])}}",
      fulfill: {
        state: {
          display: "none",
        },
      },
      otherwise: {
        state: {
          display: "visible",
        },
      },
    }}
  />
);

export default EmptySchema;
