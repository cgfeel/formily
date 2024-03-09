import { FC } from "react";
import ForgetFieldJsx from "../components/forget/FieldJsx";
import ForgetJsonSchema from "../components/forget/JsonSchema";
import ForgetMarkupSchema from "../components/forget/MarkupSchema";
import LoginFieldJsx from "../components/login/FieldJsx";
import LoginJsonSchema from "../components/login/JsonSchema";
import LoginMarkupSchema from "../components/login/MarkupSchema";
import RegFieldJsx from "../components/register/FieldJsx";
import RegJsonSchema from "../components/register/JsonSchema";
import RegMarkupSchema from "../components/register/MarkupSchema";

const LoginRegister: FC = () => (
    <>
        <LoginMarkupSchema />
        <LoginJsonSchema />
        <LoginFieldJsx />
        <RegMarkupSchema />
        <RegJsonSchema />
        <RegFieldJsx />
        <ForgetMarkupSchema />
        <ForgetJsonSchema />
        <ForgetFieldJsx />
        {process.env.REACT_APP_API_URL || "none"}
    </>
);

export default LoginRegister;
