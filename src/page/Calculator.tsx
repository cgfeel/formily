import { FC } from "react";
import JsonSchema from "../components/calculator/JsonSchema";
import MarkupSchema from "../components/calculator/MarkupSchema";

const Calculator: FC = () => (
  <>
    <MarkupSchema />
    <JsonSchema />
  </>
);

export default Calculator;
