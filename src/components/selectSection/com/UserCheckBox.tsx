import { isArrayField, isField } from "@formily/core";
import {
    connect,
    mapReadPretty,
    observer,
    useExpressionScope,
    useField,
    useFieldSchema,
    useFormEffects,
} from "@formily/react";
import { Avatar, Checkbox, Space, Typography } from "antd";
import { FC, PropsWithChildren } from "react";
import { useCollapseScope, useSchemaData, useUserField } from "../hooks/useSelectCollapse";
import classNames from "classnames";

const { Text } = Typography;

const Face: FC = () => {
    const [, { name }] = useSchemaData();
    const { search, userMap } = useCollapseScope();

    return (
        <Space>
            <Avatar
                src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${name}`}
                style={{ backgroundColor: "#d0e7c5" }}
            />
            <Text className={classNames({ searchChecked: name === search })}>{name}</Text>
            {userMap[name] && <Text type="secondary">({userMap[name].mail})</Text>}
        </Space>
    );
};

const InternalUserCheckBox: FC<PropsWithChildren> = ({ children }) => {
    const field = useField();

    const [, { empty, group, name, readPretty, section, values }] = useSchemaData();
    const { search } = useCollapseScope();

    return readPretty ? (
        <UserReadPretty name={name} search={search} section={section}>
            {children}
        </UserReadPretty>
    ) : (
        <Checkbox
            checked={group.length === values.length}
            indeterminate={values.length > 0 && group.length > values.length}
            onChange={({ target }) => {
                field.form.notify("select-user-event", {
                    checked: target.checked,
                    group,
                    section,
                });
            }}
            disabled={empty}>
            <UserReadPretty name={name} search={search} section={section}>
                {children}
            </UserReadPretty>
        </Checkbox>
    );
};

const UserReadPretty: FC<PropsWithChildren<UserReadPrettyProps>> = ({ children, name, search, section }) => (
    <span
        className={classNames({
            searchChecked:
                search !== "" &&
                (name.toLowerCase().indexOf(search) > -1 || section.toLowerCase().indexOf(search) > -1),
        })}>
        {children || name || section}
    </span>
);

const UserCheckBox = Object.assign(observer(InternalUserCheckBox), {
    Face: observer(Face),
});

export default UserCheckBox;

interface UserReadPrettyProps {
    name: string;
    search: string;
    section: string;
}

type UserItemType = {
    name: string;
    section: string;
};
