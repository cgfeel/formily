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
        FormPath.setIn(target, path, text);

        return [path, JSON.stringify(target)];
    } catch {
        return [];
    }
};

const SetIn: FC = () => {
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
                    基于路径更新数据，虽然 <code>setIn</code> 接受匹配路径，但得到的值永远是 <code>{"{}"}</code>
                    ，没有任何意义
                </p>
            }
            form={form}
            header={<h2>setIn</h2>}>
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

export default SetIn;
