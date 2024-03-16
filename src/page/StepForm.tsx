import { FC } from "react";
import MarkupSchema from "../components/step/MarkupSchema";
import JsonSchema from "../components/step/JsonSchema";

const StepForm: FC = () => (
    <>
        <MarkupSchema />
        <JsonSchema />
    </>
);

export default StepForm;
