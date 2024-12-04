import { isField } from "@formily/core";
import { connect, mapReadPretty, observer, useField } from "@formily/react";
import { Avatar, Checkbox, Space, Typography } from "antd";
import { FC } from "react";

const { Text } = Typography;
const Face: FC<UserItemType> = ({ name, section }) => (
    <Space>
        <Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${name}`} style={{ backgroundColor: "#d0e7c5" }} />
        <Text>{name}</Text>
        <Text>{section}</Text>
    </Space>
);

const UserReadPretty: FC = () => {
    const field = useField();
    const { name = "", section } = field.data as UserItemType;
    return name === "" ? <div>{section}</div> : <Face name={name} section={section} />;
};

const UserCheckBox: FC = () => {
    const field = useField();

    if (!field.data) {
        console.log("undefined", field.data);

        return null;
    }
    const { name, section } = field.data as UserItemType;

    return (
        <Checkbox onChange={({ target }) => isField(field) && field.setValue(target.checked)}>
            <Face name={name} section={section} />
        </Checkbox>
    );
};

export default observer(UserCheckBox);

// export default connect(observer(UserCheckBox), mapReadPretty(UserReadPretty));

type UserItemType = {
    name: string;
    section: string;
};
