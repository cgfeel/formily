import { FC, PropsWithChildren, ReactNode } from "react";
import SchemaField from "../SchemaPropertyField";

const DescItemSchema: FC<PropsWithChildren<DescItemSchemaProps>> = ({
  children,
  feedbackText,
  name,
  title,
}) => (
  <SchemaField.Void
    name={name}
    title={title || name}
    x-decorator="DescItem"
    x-decorator-props={{ feedbackText }}
    x-reactions="{{extraCode($self)}}"
  >
    {children}
  </SchemaField.Void>
);

export interface DescItemSchemaProps {
  name: string;
  title?: string;
  feedbackText?: ReactNode;
}

export default DescItemSchema;
