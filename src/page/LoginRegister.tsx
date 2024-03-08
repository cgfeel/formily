import { FC } from "react";
import LoginFieldJsx from "../components/login/FieldJsx";
import LoginMarkupSchema from "../components/login/MarkupSchema";
import LoginJsonSchema from "../components/login/JsonSchema";
import RegMarkupSchema from "../components/register/MarkupSchema";

const LoginRegister: FC = () => (
    <>
        <LoginMarkupSchema />
        <LoginJsonSchema />
        <LoginFieldJsx />
        <RegMarkupSchema />
    </>
);

export default LoginRegister;
