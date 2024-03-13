import { FormButtonGroup, ISubmitProps, Submit } from "@formily/antd-v5";
import { FormProvider, IProviderProps } from "@formily/react";
import { FC, PropsWithChildren } from "react";

const Form: FC<PropsWithChildren<FormProps>> = ({ children, form, button = {} }) => (
    <FormProvider form={form}>
        {children}
        <FormButtonGroup align="center">
            <Submit {...button}>提交</Submit>
        </FormButtonGroup>
    </FormProvider>
);

export interface FormProps extends IProviderProps {
    button?: ISubmitProps;
}

export default Form;
