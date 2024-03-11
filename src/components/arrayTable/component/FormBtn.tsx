import { Button, ButtonProps } from "antd";
import { FC, PropsWithChildren, useEffect, useState, useTransition } from "react";

const FormBtn: FC<PropsWithChildren<FormBtnProps>> = ({ children, disabled, num, onClick, ...props }) => {
    const [block, setBlock] = useState(num > 0);
    const [, setTransition] = useTransition();

    useEffect(() => {
        setBlock(num > 0);
    }, [num, setBlock]);

    return (
        <Button
            {...props}
            disabled={block || disabled}
            onClick={event => {
                setTransition(() => {
                    setBlock(true);
                    num === 0 && onClick && onClick(event);
                });
            }}>
            {children}
        </Button>
    );
};

export interface FormBtnProps extends ButtonProps {
    num: number;
}

export default FormBtn;
