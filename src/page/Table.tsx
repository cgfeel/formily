import { FC } from "react";
import JsonSchema from "../components/arrayTable/JsonSchema";
import MarkupSchema from "../components/arrayTable/MarkupSchema";

const Table: FC = () => (
    <>
        <MarkupSchema />
        <JsonSchema />
    </>
);

export default Table;
