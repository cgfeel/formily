import { Field, FormPath, createForm, isField } from "@formily/core";
import { FC, useMemo } from "react";
import Consumer, { FormData } from "../Consumer";
import Panel from "../Panel";
import { actionDisabled, printEffect } from "../action";
import SubscriptSchema from "../schema/SubscriptSchema";

const target = { values: { array: [] } };
const values = {
    group: [
        { path: "array.0.aa", text: "000", read: true },
        { path: "array.1.aa", text: "111", read: true },
    ],
};

const filter = ({ group }: FormData) => {
    target.values = { array: [] };
    group.forEach(({ path, text }) => {
        if (path && text) {
            FormPath.setIn(target.values, path, text);
        }
    });
    return target.values;
};

const pathReaction = (field: Field) => {
    field.setState({ pattern: "disabled" });
    if (!field.value) {
        const path = { array: [] };
        field.query("...*.path").forEach(field => {
            if (isField(field) && field.value) FormPath.setIn(path, field.value, "");
        });

        const num = path.array.length;
        field.value = num % 2 === 0 ? `array.${num}.aa` : `array[${num}].aa`;
    }
};

const Subscript: FC = () => {
    const form = useMemo(
        () =>
            createForm({
                values,
                effects: () => {
                    printEffect();
                },
            }),
        [],
    );
    return (
        <Panel
            footer={<p>对于数组路径，都会有下标，我们的下标可以用点语法，也可以用中括号</p>}
            header={<h2>下标路径</h2>}
            form={form}>
            <SubscriptSchema
                scope={{ actionDisabled, pathReaction }}
                reactions={{
                    copy: "{{actionDisabled($self, 'CopyDisabledBtn')}}",
                    path: "{{pathReaction($self)}}",
                    remove: "{{actionDisabled($self, 'RemoveDisabledBtn')}}",
                }}
            />
            <Consumer values={form.values} filter={filter} />
        </Panel>
    );
};

export default Subscript;
