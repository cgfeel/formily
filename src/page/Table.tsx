import { FC } from "react";
import JsonSchema from "../components/arrayTable/JsonSchema";
import MarkupSchema from "../components/arrayTable/MarkupSchema";
import QueryList from "../components/queryList";

const Table: FC = () => (
  <>
    <MarkupSchema />
    <JsonSchema />
    <QueryList />
  </>
);

export default Table;
