import { Field, FormPath, createForm, onFieldInit } from "@formily/core";
import { FC, useMemo } from "react";
import Panel from "../Panel";
import { FilterFn, actionDisabled, checkMatchPath, matchEffect } from "../action/pathAction";
import SubscriptSchema from "../schema/SubscriptSchema";

const defaultPath = "*";
const values = {
    group: [
        { path: defaultPath, text: "aa", read: true },
        { path: defaultPath, text: "aa.bb", read: true },
        { path: defaultPath, text: "cc", read: true },
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
    return value.indexOf("*") < 0 ? "缺少通配符" : "";
};

const FullMatch: FC = () => {
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
                    <p>
                        全匹配相当于是匹配所有路径，只需要用一个 <code>*</code>{" "}
                        标识即可，除了转义匹配，当前所有匹配规则如下：
                    </p>
                    <ul>
                        <li>匹配的路径只能是匹配路径语法搭配数据路径语法，或者匹配的都是数据路径语法</li>
                        <li>如果匹配和被匹配的路径都是匹配路径语法，则会报错</li>
                    </ul>
                </div>
            }
            form={form}
            header={<h2>全匹配</h2>}>
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

export default FullMatch;
