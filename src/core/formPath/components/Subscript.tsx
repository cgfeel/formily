import { Field, FormPath, createForm, isField } from "@formily/core";
import { FC, useMemo } from "react";
import Consumer, { FormData } from "../Consumer";
import Panel from "../Panel";
import { actionDisabled, printEffect } from "../action/pathAction";
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
            footer={
                <div>
                    <p>
                        对于数组路径，都会有下标，我们的下标可以用点语法，也可以用中括号， 下标路径和点路径的区别在于：
                    </p>
                    <ul>
                        <li>
                            下标路径是作为数组 <code>{"[]"}</code> 处理，点路径是作为对象 <code>{"{}"}</code> 处理
                        </li>
                        <li>它们都可以使用数值，下标路径中会将数值作为数组的索引，点路径会作为对象的键名</li>
                        <li>
                            在演示中，下标路径初始值是 <code>{"{ array: [] }"}</code>，点路径初始值是{" "}
                            <code>{"{}"}</code>
                        </li>
                    </ul>
                </div>
            }
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
