import { FC } from "react";
import MarkupSchema from "../components/editDetail/MarkupSchema";
import JsonSchema from "../components/editDetail/JsonSchema";

const EditDetail: FC = () => (
    <>
        <MarkupSchema />
        <JsonSchema />
    </>
);

export default EditDetail;
