import { Field, FormPath, createForm } from "@formily/core";
import { FC, useMemo } from "react";
import Panel from "../Panel";
import { FilterFn, actionDisabled, matchEffect } from "../action";
import SubscriptSchema from "../schema/SubscriptSchema";

const defaultPath = "aa.*[:100].bb";
const values = {
    group: [
        { path: "aa.*[1:2].bb", text: "aa.1.bb", read: true },
        { path: "aa.*[1:2].bb", text: "aa.2.bb", read: true },
        { path: "aa.*[1:2].bb", text: "aa.3.bb", read: true },
        { path: "aa.*[1:].bb", text: "aa.3.bb", read: true },
        { path: defaultPath, text: "aa.3.bb", read: true },
        { path: defaultPath, text: "aa.1000.bb", read: true },
    ],
};

const itemFilter: FilterFn = ([path, text]) => {
    return "" !== validator(path) || !text ? [] : [path, FormPath.parse(path).match(text) ? "true" : "false"];
};

const pathReaction = (field: Field) => {
    if (!field.value) {
        field.value = defaultPath;
    }
};

const validator = (value: string) => {
    return /\*\[\d*:\d*\]/.test(value) ? "" : "不是范围匹配路径";
};

const RangeMatch: FC = () => {
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
                    <p>
                        范围匹配主要用于匹配数组索引范围，语法：<code>*[x:y]</code>，x 和 y 可以为空，代表开区间匹配
                    </p>
                </div>
            }
            form={form}
            header={<h2>范围匹配</h2>}>
            <SubscriptSchema
                reactions={{
                    copy: "{{actionDisabled($self, 'CopyDisabledBtn')}}",
                    path: "{{pathReaction($self)}}",
                    remove: "{{actionDisabled($self, 'RemoveDisabledBtn')}}",
                }}
                scope={{ actionDisabled, pathReaction }}
                pathValidator={validator}
            />
        </Panel>
    );
};

export default RangeMatch;
