import { FormPath, createForm, onFieldInit } from "@formily/core";
import { FC, useMemo } from "react";
import Panel from "../Panel";
import { FilterFn, actionDisabled, checkMatchPath, matchEffect } from "../action/pathAction";
import SubscriptSchema from "../schema/SubscriptSchema";

const values = {
    group: [{ path: "aa.*.cc", text: "aa.bb.cc", read: true }],
};

const itemFilter: FilterFn = ([path, text]) => {
    const group = [path, text].filter(value => (value ? FormPath.parse(value).isMatchPattern : false));
    return group.length === 2 ? [] : [path, String(FormPath.parse(path).match(text))];
};

const Match: FC = () => {
    const form = useMemo(
        () =>
            createForm({
                values,
                effects: () => {
                    matchEffect(itemFilter);
                    onFieldInit("group.*.text", checkMatchPath);
                },
            }),
        [],
    );
    return (
        <Panel
            footer={
                <div>
                    <p>基于匹配型路径生成一个路径匹配器</p>
                    <p>
                        巩固：<code>match</code>{" "}
                        要求匹配和被匹配的路径至少有一个是数据路径语法即可，但是不建议被匹配的路径为匹配路径语法（包含
                        <code>*</code>），因为这种情况在开发环境下，只在首次匹配时才返回正确值，在后面重新渲染时返回{" "}
                        <code>undefined</code>
                    </p>
                </div>
            }
            form={form}
            header={<h2>match</h2>}>
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

export default Match;
