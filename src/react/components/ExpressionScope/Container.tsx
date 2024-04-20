import { ExpressionScope } from "@formily/react";
import { FC, PropsWithChildren } from "react";

const Container: FC<PropsWithChildren> = ({ children }) => (
    <ExpressionScope value={{ $innerScope: "this inner scope value" }}>{children}</ExpressionScope>
);

export default Container;
