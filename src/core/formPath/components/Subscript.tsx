import { Field, FormPath, GeneralField, createForm, isField } from "@formily/core";
import { observer } from "@formily/react";
import { observable } from "@formily/reactive";
import { FC, useMemo } from "react";
import Panel, { Consumer } from "../Panel";
import SubscriptSchema from "../schema/SubscriptSchema";
import { actionDisabled, localEffect, readEffect } from "../action";

const target = observable({
    values: {},
});

const values = {
    group: [
        { path: "array.0.aa", text: "000", read: true },
        { path: "array.1.aa", text: "111", read: true },
    ],
};

const init = () => {
    target.values = { array: [] };
};

const setTarget = (field: GeneralField) => {
    if (!isField(field)) return;
    const path = field.query(".path").value();
    const text = field.query(".text").value();

    if (path && text) {
        FormPath.setIn(target.values, path, text);
        field.value = FormPath.getIn(target.values, path);
    } else {
        field.value = "";
    }
};

const effects = localEffect(init, readEffect, setTarget);
const pathReaction = (field: Field) => {
    field.setState({ pattern: "disabled" });
    if (!field.value) {
        const num = field.query("...").value();
        field.value = `array.${num.length - 1}.aa`;
    }
};

const Print = observer(() => <pre>{JSON.stringify(target.values, null, 2)}</pre>);
const Subscript: FC = () => {
    const form = useMemo(() => createForm({ values, effects }), []);
    return (
        <Panel header={<h2>下标路径</h2>} form={form}>
            <SubscriptSchema
                scope={{ actionDisabled, pathReaction }}
                reactions={{
                    copy: "{{actionDisabled($self, 'CopyDisabledBtn')}}",
                    path: "{{pathReaction($self)}}",
                    remove: "{{actionDisabled($self, 'RemoveDisabledBtn')}}",
                }}
            />
            <Consumer>
                <Print />
            </Consumer>
        </Panel>
    );
};

export default Subscript;
