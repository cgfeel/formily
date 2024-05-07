import { createForm } from "@formily/core";
import { FormProvider, Schema, createSchemaField } from "@formily/react";
import { render } from "@testing-library/react";
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

    // 字符字段，注意：这里模型是一个字段，而不是整个 ISchema 字段，所以必须给 SchemaField 一个 name 才能正常渲染
    test("string field", () => {
        const form = createForm();
        const schema = new Schema({
            default: "123",
            type: "string",
            "x-component": "Input",
        });

        const { queryByTestId } = render(<Markup name="string" form={form} schema={schema} />);
        expect(queryByTestId("input")).toBeVisible();
        expect(queryByTestId("input")?.getAttribute("value")).toEqual("123");
    });
});
