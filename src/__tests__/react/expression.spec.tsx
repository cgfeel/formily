import { createForm } from "@formily/core";
import { ExpressionScope, FormProvider, createSchemaField } from "@formily/react";
import { render } from "@testing-library/react";
import { FC, PropsWithChildren } from "react";
import { MarkupProps, TextComponent } from "./SchemaComs";

const Container: FC<PropsWithChildren> = ({ children }) => (
    <ExpressionScope value={{ $innerScope: "thisis inner scope value" }}>{children}</ExpressionScope>
);

const SchemaField = createSchemaField({
    components: {
        Container,
        TextComponent,
    },
});

const Markup: FC<PropsWithChildren<MarkupProps>> = ({ children, form, ...props }) => (
    <FormProvider form={form}>
        <SchemaField {...props}>{children}</SchemaField>
    </FormProvider>
);

// 自定义组件内部给 json-schema 表达式传递局部作用域
test("expression scope", async () => {
    const form = createForm();
    const { queryByTestId } = render(
        <Markup form={form} scope={{ $outerScope: "this is outer scope value" }}>
            <SchemaField.Void x-component="Container">
                <SchemaField.String
                    name="input"
                    x-component="TextComponent"
                    x-content="{{$innerScope + ' ' + $outerScope}}"
                    x-component-props={{ name: "test-input" }}
                />
            </SchemaField.Void>
        </Markup>,
    );

    expect(queryByTestId("test-input")?.textContent).toEqual("thisis inner scope value this is outer scope value");
});
