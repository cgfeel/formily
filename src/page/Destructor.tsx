import { FC } from "react";
import FieldJsx from "../components/destructor/FieldJsx";
import JsonSchema from "../components/destructor/JsonSchema";
import MarkupSchema from "../components/destructor/MarkupSchema";

const Destructor: FC = () => (
    <>
        <MarkupSchema />
        <JsonSchema />
        <FieldJsx />
    </>
);

export default Destructor;
