import { isArrayField, isField } from "@formily/core";
import { connect, mapReadPretty, observer, useField, useFieldSchema, useFormEffects } from "@formily/react";
import { Avatar, Checkbox, Space, Typography } from "antd";
import { FC, PropsWithChildren } from "react";
import { useSchemaData, useUserField } from "../hooks/useSelectCollapse";
import classNames from "classnames";

const { Text } = Typography;

const Face: FC = () => {
    const [, { name, search }] = useSchemaData();
    return (
        <Space>
            <Avatar
                src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${name}`}
                style={{ backgroundColor: "#d0e7c5" }}
            />
            <Text className={classNames({ searchChecked: name === search })}>{name}</Text>
        </Space>
    );
};

const UserReadPretty: FC = () => {
    const field = useField();
    const { name = "", section } = field.data as UserItemType;
    return name === "" ? <div>{section}</div> : <>{section}</>;
};

const InternalUserCheckBox: FC<PropsWithChildren> = ({ children }) => {
    const field = useField();
    const [, { empty, group, name, search, section, values }] = useSchemaData();

    // console.log(field.form.getValuesIn('.'));

    // useFormEffects();

    // console.log(field.data);

    // console.log("field", group, date);
    // const { name = "", section } = field.data;

    //  onChange={({ target }) => isField(field) && field.setValue(target.checked ? { name, section } : {})}
    return (
        <Checkbox
            checked={group.length === values.length}
            indeterminate={values.length > 0 && group.length > values.length}
            onChange={({ target }) => {
                field.form.notify("select-user-event", {
                    checked: target.checked,
                    group,
                    section,
                });
                // const { parent } = field;
                // const list = group.length > 0 ? group : [{ name, section }];

                // if (!isArrayField(parent)) return ;
                // isField(field) && field.setValue(target.checked ? { name, section } : {});
                // isArrayField(parent) && parent.push(target.checked ? { name, section } : {});
            }}
            disabled={empty}>
            <span className={classNames({ searchChecked: search !== "" && (name === search || section === search) })}>
                {children || name || section}
            </span>
        </Checkbox>
    );
};

const UserCheckBox = Object.assign(observer(InternalUserCheckBox), {
    Face: observer(Face),
});

export default UserCheckBox;

// export default connect(observer(UserCheckBox), mapReadPretty(UserReadPretty));

type UserItemType = {
    name: string;
    section: string;
};
