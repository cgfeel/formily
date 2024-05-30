import { observer, useField } from "@formily/react";
import { Button, ButtonProps } from "antd";
import { FC, PropsWithChildren } from "react";

const SelectBtn: FC<PropsWithChildren<ButtonProps>> = ({ children, onClick, ...props }) => {
    const field = useField();
    return (
        <Button
            {...props}
            onClick={e => {
                const { data } = field;
                field.setData(data === 1 ? 2 : 1);

                onClick && onClick(e);
            }}>
            {children}
        </Button>
    );
};

export default observer(SelectBtn);
