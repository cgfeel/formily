import { Field, FormPath, createForm } from "@formily/core";
import { FC, useMemo } from "react";
import Panel from "../Panel";
import { FilterFn, actionDisabled, matchEffect } from "../action/pathAction";
import SubscriptSchema from "../schema/SubscriptSchema";

const defaultPath = "test~";
const values = {
    group: [
        { path: defaultPath, text: "test_111", read: true },
        { path: defaultPath, text: "test_222", read: true },
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
    return value.indexOf("~") < 0 ? "不是扩展匹配" : "";
};

const ExtendMatch: FC = () => {
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
                        扩展匹配主要用于匹配路径起始子串，语法：<code>pattern~</code>，<code>~</code> 不一定要在最后
                    </p>
                </div>
            }
            form={form}
            header={<h2>扩展匹配</h2>}>
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

export default ExtendMatch;
