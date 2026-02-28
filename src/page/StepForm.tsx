import { FC } from "react";
import JsonSchema from "../components/step/JsonSchema";
import MarkupSchema from "../components/step/MarkupSchema";

const StepForm: FC = () => (
  <>
    <MarkupSchema />
    <JsonSchema />
  </>
);

export default StepForm;
