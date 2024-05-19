import { createForm, isField, onFormInit } from "@formily/core";
import { FormConsumer } from "@formily/react";
import { FC } from "react";
import Line from "../fieldAction/Line";
import Wrapper from "../fieldAction/Wrapper";

const form = createForm({
    effects: () => {
        onFormInit(form => {
            form.createField({ name: "name", required: true });
            form.createField({ name: "name2", required: true });
        });
    },
});

const ValidateInput: FC = () => (
    <Wrapper form={form} header={<h2>core.3.1.1 值变更触发</h2>}>
        <Line title="设置 name">
            <button onClick={() => form.query("name").take(field => isField(field) && field.onInput(""))}>
                input: ""
            </button>
            <button onClick={() => form.query("name").take(field => isField(field) && field.onInput("123"))}>
                input: "123"
            </button>
        </Line>
        <Line title="设置 name2">
            <button onClick={() => form.query("name2").take(field => isField(field) && field.onInput(""))}>
                input: ""
            </button>
            <button onClick={() => form.query("name2").take(field => isField(field) && field.onInput("123"))}>
                input: "123"
            </button>
        </Line>
        <div>
            <code className="consumer">
                <pre>
                    <FormConsumer>
                        {form => JSON.stringify(form.queryFeedbacks({ address: "*" }), null, 2)}
                    </FormConsumer>
                </pre>
            </code>
        </div>
    </Wrapper>
);

export default ValidateInput;
