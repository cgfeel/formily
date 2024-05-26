import { useField } from "@formily/react";
import { Divider } from "antd";
import { FC, PropsWithChildren } from "react";

const VoidComponent: FC<PropsWithChildren<{ title?: string }>> = ({ children, title }) => {
    const field = useField();
    return (
        <div>
            <Divider orientation="left" plain>
                {title || field.title}
            </Divider>
            {children}
            <div style={{ marginBottom: 20 }}>{field.description}</div>
        </div>
    );
};

export default VoidComponent;
