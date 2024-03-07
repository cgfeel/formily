import { FC } from "react";
import FieldJsx from "../components/login/FieldJsx";
import MarkupSchema from "../components/login/MarkupSchema";
import JsonSchema from "../components/login/JsonSchema";

const LoginRegister: FC = () => (
    <>
        <MarkupSchema />
        <JsonSchema />
        <FieldJsx />
    </>
);

export default LoginRegister;
