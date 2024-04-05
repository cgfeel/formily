import { Button } from "antd";
import { FC, PropsWithChildren } from "react";
import Line, { LineProps } from "./Line";

const ButtonRun: FC<PropsWithChildren<ButtonRunProps>> = ({ children, tips, onClick }) => (
    <Line tips={tips}>
        <Button onClick={onClick}>{children}</Button>
    </Line>
);

export interface ButtonRunProps extends LineProps {
    onClick?: () => void;
}

export default ButtonRun;
