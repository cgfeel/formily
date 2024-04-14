import { FormPath, createForm } from "@formily/core";
import { FC, useMemo } from "react";
import Panel from "../Panel";
import { FilterFn, actionDisabled, matchEffect } from "../action";
import SubscriptSchema from "../schema/SubscriptSchema";

const values = {
    group: [{ path: "target.[aa,bb]", text: "target.[aa,bb]", read: true }],
};

const itemFilter: FilterFn = ([path, text]) => {
    return "" !== validator(path) || !text ? [] : [path, FormPath.parse(path).match(text) ? "true" : "false"];
};

const validator = (value: string) => {
    return /\[.*\]/.test(value) ? "" : "不是解构匹配路径";
};

const DeconstructMatch: FC = () => {
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
                <div>
                    <p>对于携带解构表达式的路径，我们匹配的话，直接匹配即可，无需转义</p>
                </div>
            }
            form={form}
            header={<h2>解构匹配</h2>}>
            <SubscriptSchema
                reactions={{
                    copy: "{{actionDisabled($self, 'CopyDisabledBtn')}}",
                    remove: "{{actionDisabled($self, 'RemoveDisabledBtn')}}",
                }}
                scope={{ actionDisabled }}
                pathValidator={validator}
            />
        </Panel>
    );
};

export default DeconstructMatch;
