import { Editable, Input, Select, Space } from "@formily/antd-v5";
import { createSchemaField, observer } from "@formily/react";
import styled from "@emotion/styled";
import { Card, EmptyProps, Empty as EmptyRaw } from "antd";
import FormItem from "../../../components/formItem/form-item";
import CodePretty from "../custom/CodePretty";
import FieldInput from "../custom/FieldInput";
import ReadPretty from "../custom/ReadPretty";
import DescItem from "../custom/descItem";

const Header = styled.div`
    width: 600px;
`;

const Empty = observer<Omit<EmptyProps, "image">>(props => (
    <EmptyRaw {...props} image={EmptyRaw.PRESENTED_IMAGE_SIMPLE} />
));

const SchemaField = createSchemaField({
    components: {
        Card,
        CodePretty,
        DescItem,
        Editable,
        Empty,
        FieldInput,
        FormItem,
        Header,
        Input,
        ReadPretty,
        Select,
        Space,
    },
});

export default SchemaField;
