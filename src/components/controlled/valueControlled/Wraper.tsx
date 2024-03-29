import { Input } from "@formily/antd-v5";
import { Card, CardProps, Divider } from "antd";
import { FC, PropsWithChildren, ReactNode, useRef } from "react";
import FormItem from "../../formItem/form-item";

const Wraper: FC<PropsWithChildren<WraperProps>> = ({ children, footer, update, value = "", ...props }) => {
    const count = useRef(1);
    return (
        <Card {...props}>
            <FormItem>
                <Input placeholder="控制者" value={value} onChange={event => update && update(event.target.value)} />
            </FormItem>
            {children}
            根组件渲染次数：{count.current++}
            {footer && (
                <>
                    <Divider /> {footer}
                </>
            )}
        </Card>
    );
};

export interface WraperProps extends CardProps {
    footer?: ReactNode;
    value?: string;
    update?: (value: string) => void;
}

export default Wraper;
