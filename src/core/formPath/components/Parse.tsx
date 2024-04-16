import { FormPath, createForm } from "@formily/core";
import { FC, useMemo } from "react";
import Panel from "../Panel";
import { FilterFn, actionDisabled, matchEffect } from "../action/pathAction";
import SubscriptSchema from "../schema/SubscriptSchema";

const values = {
    group: [{ path: "aa.0.bb", text: "", read: true }],
};

const itemFilter: FilterFn = ([path]) => {
    try {
        return [path, FormPath.parse(path).toString()];
    } catch {
        return [];
    }
};

const Parse: FC = () => {
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
        <Panel footer={<p>解析路径</p>} form={form} header={<h2>parse</h2>}>
            <SubscriptSchema
                reactions={{
                    copy: "{{actionDisabled($self, 'CopyDisabledBtn')}}",
                    remove: "{{actionDisabled($self, 'RemoveDisabledBtn')}}",
                    text: {
                        fulfill: {
                            state: { display: "none" },
                        },
                    },
                }}
                scope={{ actionDisabled }}
            />
        </Panel>
    );
};

export default Parse;
