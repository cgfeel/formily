import { isArrayField, isField } from "@formily/core";
import {
    connect,
    mapReadPretty,
    observer,
    RecursionField,
    useExpressionScope,
    useField,
    useFieldSchema,
    useFormEffects,
} from "@formily/react";
import { Avatar, Button, Checkbox, Col, Flex, Row, Space, Typography } from "antd";
import { FC, PropsWithChildren } from "react";
import { useCollapseScope, useSchemaData, useUserField } from "../hooks/useSelectCollapse";
import classNames from "classnames";
import { CloseOutlined } from "@ant-design/icons";

const { Text } = Typography;

const Face: FC = () => {
    const field = useField();
    const [, data] = useSchemaData();

    const { readPretty, remove, search, userMap } = useCollapseScope();
    const { name } = data;

    return (
        <Space>
            <Avatar
                src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${name}`}
                style={{ backgroundColor: "#d0e7c5" }}
            />
            <Row gutter={readPretty ? [0, 0] : [8, 8]}>
                <Col {...(readPretty ? { span: 24 } : { flex: "none" })}>
                    {remove ? (
                        <Flex justify="space-between">
                            <Text className={classNames({ searchChecked: name === search })}>{name}</Text>
                            <RecursionField
                                name={`remove-user`}
                                basePath={field.address}
                                schema={{ ...remove, "x-data": data }}
                                onlyRenderSelf
                            />
                        </Flex>
                    ) : (
                        <Text className={classNames({ searchChecked: name === search })}>{name}</Text>
                    )}
                </Col>
                <Col {...(readPretty ? { span: 24 } : { flex: "auto" })}>
                    {userMap[name] && <Text type="secondary">({userMap[name].mail})</Text>}
                </Col>
            </Row>
        </Space>
    );
};

const InternalUserCheckBox: FC<PropsWithChildren> = ({ children }) => {
    const field = useField();

    const [, { empty, group, name, section, values }] = useSchemaData();
    const { readPretty, search } = useCollapseScope();

    return readPretty ? (
        <UserReadPretty name={name} readPretty={true} search={search} section={section}>
            {children}
        </UserReadPretty>
    ) : (
        <Checkbox
            checked={group.length === values.length}
            indeterminate={values.length > 0 && group.length > values.length}
            onChange={({ target }) => {
                const entire = String(field.path.entire).split(".").shift();
                field.form.notify(`select-user-${entire}`, {
                    checked: target.checked,
                    group,
                    section,
                });
            }}
            onClick={event => event.stopPropagation()}
            disabled={empty}>
            <UserReadPretty name={name} search={search} section={section}>
                {children}
            </UserReadPretty>
        </Checkbox>
    );
};

const RemoveUser: FC<{ type?: string }> = ({ type }) => {
    const field = useField();

    const [, { group, section }] = useSchemaData();
    const { size } = useCollapseScope();

    return (
        <Button
            size={size}
            type="link"
            onClick={() => {
                const entire = String(field.path.entire).split(".").shift();
                field.form.notify(type || `select-user-${entire}`, {
                    checked: false,
                    group,
                    section,
                });
            }}>
            <CloseOutlined />
        </Button>
    );
};

const UserReadPretty: FC<PropsWithChildren<UserReadPrettyProps>> = ({
    children,
    name,
    readPretty,
    search,
    section,
}) => (
    <span
        className={classNames({
            searchChecked:
                search !== "" &&
                (name.toLowerCase().indexOf(search) > -1 || section.toLowerCase().indexOf(search) > -1),
            readPretty,
        })}>
        {children || name || section}
    </span>
);

const UserCheckBox = Object.assign(observer(InternalUserCheckBox), {
    Face: observer(Face),
    Remove: observer(RemoveUser),
});

export default UserCheckBox;

interface UserReadPrettyProps {
    name: string;
    search: string;
    section: string;
    readPretty?: boolean;
}
