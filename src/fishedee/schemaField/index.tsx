import { FC } from "react";
import CustomIndex from "../../components/controlled/schemaControlled/custom";
import JsonSchema from "./JsonSchema";
import MarkupSchema from "./MarkupSchema";

const SchemaField: FC = () => (
    <>
        <MarkupSchema />
        <JsonSchema />
        <CustomIndex />
    </>
);

export default SchemaField;
