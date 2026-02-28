import styled from "@emotion/styled";
import { ArrayItems, Input, Select, Space, Switch } from "@formily/antd-v5";
import { createSchemaField, observer } from "@formily/react";
import { CopyOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { FC } from "react";
import FormItem from "../../../components/formItem/form-item";
import ReadPretty from "../custom/ReadPretty";

const ActionBtn = styled(Button)`
  font-size: 16px;
  height: auto;
  padding: 0 0 0 6px;
  width: auto;
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

const SchemaField = createSchemaField({
  components: {
    ArrayItems,
    Consumer,
    CopyDisabledBtn,
    FormItem,
    Input,
    ReadPretty,
    RemoveDisabledBtn,
    Select,
    Space,
    Switch,
  },
});

export default SchemaField;
