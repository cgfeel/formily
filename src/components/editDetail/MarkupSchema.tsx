import { FC } from "react";
import SchemaFieldMarkup from "../register/components/SchemaFieldMarkup";
import Wrapper from "./Wrapper";

const MarkupSchema: FC = () => (
    <Wrapper
        header={
            <h2>
                通过<code>Markup Schema</code>编辑详情
            </h2>
        }>
        <SchemaFieldMarkup />
    </Wrapper>
);

export default MarkupSchema;
