import { FormProvider, IProviderProps } from "@formily/react";
import { FC, PropsWithChildren, ReactNode } from "react";
import useStylish from "../commonStylish";

const field = ["a", "b", "c", "d", "e", "f", "g"];

const Pannel: FC<PropsWithChildren<PannelProps>> = ({ children, footer, form, header }) => {
    const stylish = useStylish();
    return (
        <div className={stylish.wraper}>
            {header}
            <div className={stylish.pannel}>
                <FormProvider form={form}>{children}</FormProvider>
            </div>
            {footer}
        </div>
    );
};

export interface PannelProps extends IProviderProps {
    footer?: ReactNode;
    header?: ReactNode;
}

export { field };

export default Pannel;
