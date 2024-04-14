import { Field, FormPath, createForm } from "@formily/core";
import { FC, useMemo } from "react";
import Panel from "../Panel";
import { FilterFn, actionDisabled, matchEffect } from "../action/pathAction";
import SubscriptSchema from "../schema/SubscriptSchema";

const defaultPath = "*(!aa,bb,cc)";
const values = {
    group: [
        { path: defaultPath, text: "aa", read: true },
        { path: defaultPath, text: "kk", read: true },
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
    return /\*\(!.+\)/.test(value) ? "" : "不是反向匹配路径";
};

const ReverseMatch: FC = () => {
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
                        反向匹配主要用于排除指定路径，语法：<code>*(!pattern1,pattern2,pattern3)</code>
                    </p>
                </div>
            }
            form={form}
            header={<h2>反向匹配</h2>}>
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

export default ReverseMatch;
