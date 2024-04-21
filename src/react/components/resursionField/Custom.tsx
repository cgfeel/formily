import { ISchema, RecursionField } from "@formily/react";
import { FC } from "react";

// onlyRenderProperties：是否只渲染properties..
const Custom: FC<CustomProps> = ({ schema }) => <RecursionField schema={schema} onlyRenderProperties />;

export interface CustomProps {
    schema: ISchema;
}

export default Custom;
