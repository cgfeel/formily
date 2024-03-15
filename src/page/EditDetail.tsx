import { FC } from "react";
import FieldJsx from "../components/editDetail/FieldJsx";
import JsonSchema from "../components/editDetail/JsonSchema";
import MarkupSchema from "../components/editDetail/MarkupSchema";

const EditDetail: FC = () => (
    <>
        <MarkupSchema />
        <JsonSchema />
        <FieldJsx />
    </>
);

export default EditDetail;
