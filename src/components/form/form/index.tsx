import { PreviewText } from "@formily/antd-v5";
import { Form as FormType, ObjectField, IFormFeedback } from "@formily/core";
import { useParentForm, FormProvider, JSXComponent } from "@formily/react";
import React from "react";
import { FormLayout, IFormLayoutProps } from "../../formLayout/form-layout";

export interface FormProps extends IFormLayoutProps {
    form?: FormType;
    component?: JSXComponent;
    onAutoSubmit?: (values: any) => any;
    onAutoSubmitFailed?: (feedbacks: IFormFeedback[]) => void;
    previewTextPlaceholder?: React.ReactNode;
}

export const Form: React.FC<React.PropsWithChildren<FormProps>> = ({
    form,
    component,
    onAutoSubmit,
    onAutoSubmitFailed,
    previewTextPlaceholder,
    ...props
}) => {
    const top = useParentForm();
    const renderContent = (form: FormType | ObjectField) => (
        <PreviewText.Placeholder value={previewTextPlaceholder}>
            <FormLayout {...props}>
                {component &&
                    React.createElement(
                        component,
                        {
                            onSubmit(e: React.FormEvent) {
                                e?.stopPropagation?.();
                                e?.preventDefault?.();
                                form.submit(onAutoSubmit).catch(onAutoSubmitFailed);
                            },
                        },
                        props.children,
                    )}
            </FormLayout>
        </PreviewText.Placeholder>
    );
    if (form) return <FormProvider form={form}>{renderContent(form)}</FormProvider>;
    if (!top) throw new Error("must pass form instance by createForm");
    return renderContent(top);
};

Form.defaultProps = {
    component: "form",
};

export default Form;
