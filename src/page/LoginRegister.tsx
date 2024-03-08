import { FC } from "react";
import LoginFieldJsx from "../components/login/FieldJsx";
import LoginJsonSchema from "../components/login/JsonSchema";
import LoginMarkupSchema from "../components/login/MarkupSchema";
import RegJsonSchema from "../components/register/JsonSchema";
import RegMarkupSchema from "../components/register/MarkupSchema";

const LoginRegister: FC = () => (
    <>
        <LoginMarkupSchema />
        <LoginJsonSchema />
        <LoginFieldJsx />
        <RegMarkupSchema />
        <RegJsonSchema />
    </>
);

export default LoginRegister;
