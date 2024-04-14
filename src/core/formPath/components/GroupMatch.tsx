import { Field, FormPath, createForm } from "@formily/core";
import { FC, useMemo } from "react";
import Panel from "../Panel";
import { FilterFn, actionDisabled, matchEffect } from "../action";
import SubscriptSchema from "../schema/SubscriptSchema";

const defaultPath = "aa.*(bb,kk,dd,ee.*(oo,gg).gg).cc";
const values = {
    group: [
        { path: defaultPath, text: "aa.bb.cc", read: true },
        { path: defaultPath, text: "aa.kk.cc", read: true },
        { path: defaultPath, text: "aa.dd.cc", read: true },
        { path: defaultPath, text: "aa.ee.oo.gg.cc", read: true },
        { path: defaultPath, text: "aa.ee.gg.gg.cc", read: true },
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
    return /\*\(.+\)/.test(value) ? "" : "不是分组匹配路径";
};

const GroupMatch: FC = () => {
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
                        分组匹配可以匹配多个路径，同时还支持嵌套，语法： <code>*(pattern1,pattern2,pattern3...)</code>
                    </p>
                </div>
            }
            form={form}
            header={<h2>分组匹配</h2>}>
            <SubscriptSchema
                componentProps={{ pathProps: { style: { width: 240 } } }}
                reactions={{
                    copy: "{{actionDisabled($self, 'CopyDisabledBtn')}}",
                    path: "{{pathReaction($self)}}",
                    remove: "{{actionDisabled($self, 'RemoveDisabledBtn')}}",
                    text: {
                        fulfill: {
                            state: {
                                title: "匹配",
                            },
                        },
                    },
                }}
                scope={{ actionDisabled, pathReaction }}
                pathValidator={validator}
            />
        </Panel>
    );
};

export default GroupMatch;
