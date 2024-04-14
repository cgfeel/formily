import { IProviderProps } from "@formily/react";
import { FC, PropsWithChildren, ReactNode } from "react";
import useStylish from "../../components/commonStylish";
import Form from "../../components/form/form";

const Wraper: FC<PropsWithChildren<WraperProps>> = ({ children, footer, form, header }) => {
    const stylish = useStylish();
    return (
        <div className={stylish.wraper}>
            {header}
            <div className={stylish.pannel}>
                <Form form={form}>{children}</Form>
            </div>
            {footer}
        </div>
    );
};

export interface WraperProps extends IProviderProps {
    footer?: ReactNode;
    header?: ReactNode;
}

export default Wraper;
