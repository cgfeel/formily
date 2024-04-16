import { FormPath, createForm } from "@formily/core";
import { FC, useMemo } from "react";
import Panel from "../Panel";
import { FilterFn, actionDisabled, matchEffect } from "../action/pathAction";
import SubscriptSchema from "../schema/SubscriptSchema";

const values = {
    group: [{ path: "aa.bb.cc", text: "value", read: true }],
};

const itemFilter: FilterFn = ([path, text]) => {
    try {
        const target = {};
        FormPath.ensureIn(target, path, text);

        return [path, JSON.stringify(target)];
    } catch {
        return [];
    }
};

const EnsureIn: FC = () => {
    const form = useMemo(
        () =>
            createForm({
                values,
                effects: () => {
                    matchEffect(itemFilter);
                },
            }),
        [],
    );
    return (
        <Panel
            footer={
                <p>
                    确保某个路径下必须有数据，如果没有则创建数据，目前看和 <code>setIn</code> 用法一样
                </p>
            }
            form={form}
            header={<h2>ensureIn</h2>}>
            <SubscriptSchema
                reactions={{
                    copy: "{{actionDisabled($self, 'CopyDisabledBtn')}}",
                    remove: "{{actionDisabled($self, 'RemoveDisabledBtn')}}",
                }}
                scope={{ actionDisabled }}
            />
        </Panel>
    );
};

export default EnsureIn;
