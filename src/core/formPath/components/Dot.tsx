import { FormPath, createForm } from "@formily/core";
import { FC, useMemo } from "react";
import Consumer, { FormData } from "../Consumer";
import Panel from "../Panel";
import { actionDisabled, printEffect } from "../action";
import SubscriptSchema from "../schema/SubscriptSchema";

const target = { values: {} };
const values = {
    group: [{ path: "a.b.c", text: "value", read: true }],
};

const filter = ({ group }: FormData) => {
    target.values = {};
    group.forEach(({ path, text }) => {
        try {
            if (path && text) {
                FormPath.setIn(target.values, path, text);
            }
        } catch {}
    });
    return target.values;
};

const Dot: FC = () => {
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
                <p>
                    就是我们最常用的 <code>a.b.c</code> 格式，用点符号来分割每个路径节点，主要用来读写数据
                </p>
            }
            header={<h2>点路径</h2>}
            form={form}>
            <SubscriptSchema
                scope={{ actionDisabled }}
                reactions={{
                    copy: "{{actionDisabled($self, 'CopyDisabledBtn')}}",
                    remove: "{{actionDisabled($self, 'RemoveDisabledBtn')}}",
                }}
            />
            <Consumer values={form.values} filter={filter} />
        </Panel>
    );
};

export default Dot;
