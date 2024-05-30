import { useField } from "@formily/react";
import { Divider } from "antd";
import { DOMAttributes, FC, PropsWithChildren } from "react";

const VoidComponent: FC<PropsWithChildren<VoidComponentProps>> = ({ children, title, onChange }) => {
    const field = useField();
    return (
        <div
            onChange={e => {
                e.preventDefault();
                e.stopPropagation();
                e.nativeEvent.stopImmediatePropagation();
                onChange && onChange(e);
            }}>
            <Divider orientation="left" plain>
                {title || field.title}
            </Divider>
            {children}
            <div style={{ marginBottom: 20 }}>{field.description}</div>
        </div>
    );
};

interface VoidComponentProps {
    title?: string;
    onChange?: DOMAttributes<HTMLDivElement>["onChange"];
}

export default VoidComponent;
