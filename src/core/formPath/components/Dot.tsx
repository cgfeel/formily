import { FormPath, GeneralField, createForm, isField } from "@formily/core";
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
    group: [{ path: "a.b.c", text: "value", read: true }],
};

const init = () => {
    target.values = {};
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
const Print = observer(() => <pre>{JSON.stringify(target.values, null, 2)}</pre>);

const Dot: FC = () => {
    const form = useMemo(() => createForm({ values, effects }), []);
    return (
        <Panel header={<h2>点路径</h2>} form={form}>
            <SubscriptSchema
                scope={{ actionDisabled }}
                reactions={{
                    copy: "{{actionDisabled($self, 'CopyDisabledBtn')}}",
                    remove: "{{actionDisabled($self, 'RemoveDisabledBtn')}}",
                }}
            />
            <Consumer>
                <Print />
            </Consumer>
        </Panel>
    );
};

export default Dot;
