import { observer, useField } from "@formily/react";
import { Typography } from "antd";
import { FC, PropsWithChildren } from "react";

const { Text } = Typography;

const TipTitle: FC<PropsWithChildren> = ({ children }) => {
    const field = useField();

    return (
        <>
            <div>
                <Text type="secondary">{field.title}</Text>
            </div>
            <div>{children}</div>
        </>
    );
};

export default observer(TipTitle);
