import { connect, mapReadPretty, useField } from "@formily/react";
import { Avatar, Checkbox, Space, Typography } from "antd";
import { FC } from "react";

const { Text } = Typography;
const Face: FC<UserItemType> = ({ name, section }) => (
    <Space>
        <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=levi" style={{ backgroundColor: "#d0e7c5" }} />
        <Text>{name}</Text>
        <Text>{section}</Text>
    </Space>
);

const UserCheckBox: FC = () => {
    const field = useField();
    const { name, section } = field.data as UserItemType;
    return (
        <Checkbox>
            <Face name={name} section={section} />
        </Checkbox>
    );
};

export default connect(UserCheckBox, mapReadPretty(UserCheckBox, { readPretty: true }));

type UserItemType = {
    name: string;
    section: string;
};
