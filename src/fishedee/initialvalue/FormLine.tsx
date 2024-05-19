import { FormProvider, IProviderProps, observer } from "@formily/react";
import { FC, PropsWithChildren } from "react";
import Line, { LineProps } from "../fieldAction/Line";

const FormLine: FC<PropsWithChildren<FormLineProps>> = ({ children, form, title }) => (
    <FormProvider form={form}>
        <Line title={title}>
            {children}
            <span>time: {form.values.time || "undefined"}</span>
        </Line>
    </FormProvider>
);

export interface FormLineProps extends IProviderProps, LineProps {}

export default observer(FormLine);
