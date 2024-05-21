import { useField } from "@formily/react";
import { Divider } from "antd";
import { FC, PropsWithChildren } from "react";

const VoidComponent: FC<PropsWithChildren> = ({ children }) => {
    const field = useField();
    return (
        <div>
            <Divider orientation="left" plain>
                {field.title}
            </Divider>
            {children}
            <div style={{ marginBottom: 20 }}>{field.description}</div>
        </div>
    );
};

export default VoidComponent;
