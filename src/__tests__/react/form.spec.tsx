import { createForm } from "@formily/core";
import { Field, FormConsumer, FormProvider, ObjectField, VoidField, useParentForm } from "@formily/react";
import { render } from "@testing-library/react";
import { FC, HTMLAttributes, PropsWithChildren } from "react";

const DisplayParentForm: FC<PropsWithChildren<HTMLAttributes<HTMLDivElement>>> = ({ children, ...props }) => {
    const form = useParentForm();
    return (
        <div {...props}>
            {children}
            {form.displayName}
        </div>
    );
};

// 渲染表单
test("render form", () => {
    const form = createForm();
    render(
        <FormProvider form={form}>
            <FormConsumer>{form => `${form.mounted}`}</FormConsumer>
        </FormProvider>,
    );
    expect(form.mounted).toBeTruthy();
});

// 查询最近的 ObjectField 或 Form
test("useParentForm", () => {
    const form = createForm();
    const { container, queryByTestId } = render(
        <FormProvider form={form}>
            <ObjectField name="aa">
                <Field name="bb">
                    <DisplayParentForm data-testid="111" />
                </Field>
            </ObjectField>
            <VoidField name="cc">
                <Field name="dd">
                    <DisplayParentForm data-testid="222" />
                </Field>
            </VoidField>
            <DisplayParentForm data-testid="333" />
        </FormProvider>,
    );
    expect(queryByTestId("111")?.textContent).toBe("ObjectField");
    expect(queryByTestId("222")?.textContent).toBe("Form");
    expect(queryByTestId("333")?.textContent).toBe("Form");
});
