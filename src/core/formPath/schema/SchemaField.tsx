import styled from "@emotion/styled";
import { ArrayItems, Input, Space, Switch } from "@formily/antd-v5";
import { isField } from "@formily/core";
import { createSchemaField, observer, useField } from "@formily/react";
import { CopyOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { FC } from "react";
import FormItem from "../../../components/formItem/form-item";

const ActionBtn = styled(Button)`
    font-size: 16px;
    height: auto;
    padding: 0 0 0 6px;
    width: auto;
`;

const InputRead = styled(Input)`
    &.ant-input-disabled,
    &.ant-input-disabled:hover:not([disabled]) {
        background-color: transparent;
        border-color: transparent;
        color: #000;
    }
    & > input {
        font-weight: 600;
    }
`;

const RemoveDisabledBtn: FC = () => (
    <ActionBtn type="link" disabled>
        <DeleteOutlined />
    </ActionBtn>
);

const Consumer = observer(({ children }) => (
    <code className="consumer">
        <pre>{children}</pre>
    </code>
));

const CopyDisabledBtn: FC = () => (
    <ActionBtn type="link" disabled>
        <CopyOutlined />
    </ActionBtn>
);

const ReadPretty = observer(() => {
    const field = useField();
    const value = isField(field) ? field.value : "";

    return <InputRead value={value} disabled />;
});

const SchemaField = createSchemaField({
    components: {
        ArrayItems,
        Consumer,
        CopyDisabledBtn,
        FormItem,
        Input,
        ReadPretty,
        RemoveDisabledBtn,
        Space,
        Switch,
    },
});

export default SchemaField;
