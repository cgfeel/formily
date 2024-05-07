import { createForm } from "@formily/core";
import { FormProvider, createSchemaField } from "@formily/react";
import { FC, PropsWithChildren } from "react";
import { Input, MarkupProps } from "./SchemaComs";

describe("json schema field", () => {
    const SchemaField = createSchemaField({
        components: {
            Input,
        },
    });
    const Markup: FC<PropsWithChildren<MarkupProps>> = ({ children, form, ...props }) => (
        <FormProvider form={form}>
            <SchemaField {...props}>{children}</SchemaField>
        </FormProvider>
    );
    test("string field", () => {
        const form = createForm();
    });
});
