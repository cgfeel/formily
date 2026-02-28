import { FC, PropsWithChildren } from "react";
import SchemaField from "../SchemaPropertyField";
import DescItemSchema, { DescItemSchemaProps } from "./DescItemSchema";

const SingleSchema: FC<PropsWithChildren<SingleSchemaProps>> = ({ children, ...props }) => (
  <DescItemSchema {...props}>
    {children}
    <SchemaField.String
      name={`${props.name}-print`}
      title="输出"
      x-component="Input"
      x-decorator="FormItem"
      x-pattern="readPretty"
      x-reactions="{{fieldData($self)}}"
    />
  </DescItemSchema>
);

export interface SingleSchemaProps extends DescItemSchemaProps {}

export default SingleSchema;
