import { FormProvider, IProviderProps } from "@formily/react";
import { FC, PropsWithChildren } from "react";
import Panel, { PanelProps } from "../Panel";

const Wrapper: FC<PropsWithChildren<WrapperProps>> = ({ children, form, ...props }) => (
    <Panel {...props}>
        <FormProvider form={form}>{children}</FormProvider>
    </Panel>
);

export interface WrapperProps extends IProviderProps, PanelProps {}

export default Wrapper;
