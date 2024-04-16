import { FormPath, createForm } from "@formily/core";
import { FC, useMemo } from "react";
import { FilterFn, actionDisabled, matchEffect } from "../action/pathAction";
import Panel from "../Panel";
import SubscriptSchema from "../schema/SubscriptSchema";

const values = {
    group: [{ path: '{"aa":[{"bb":"value"}]}', text: "aa.0.bb", read: true }],
};

const itemFilter: FilterFn = ([path, text]) => {
    try {
        const data = JSON.parse(path);
        return [path, JSON.stringify(FormPath.getIn(data, text))];
    } catch {
        return [];
    }
};

const validator = (value: string) => {
    try {
        JSON.parse(value);
        return "";
    } catch {
        return "不是有效 JSON";
    }
};

const GetIn: FC = () => {
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
            footer={<p>基于路径获取数据，对于匹配路径一旦匹配，将得到匹配路径上所有的值</p>}
            form={form}
            header={<h2>getIn</h2>}>
            <SubscriptSchema
                componentProps={{
                    pathProps: {
                        placeholder: "请手写 JSON",
                    },
                }}
                reactions={{
                    copy: "{{actionDisabled($self, 'CopyDisabledBtn')}}",
                    remove: "{{actionDisabled($self, 'RemoveDisabledBtn')}}",
                    path: {
                        fulfill: {
                            state: { title: "JSON" },
                        },
                    },
                    text: {
                        fulfill: {
                            state: {
                                title: "路径",
                                validator: value => {
                                    try {
                                        FormPath.parse(value);
                                        return "";
                                    } catch {
                                        return "不是有效路径";
                                    }
                                },
                            },
                        },
                    },
                }}
                scope={{ actionDisabled }}
                pathValidator={validator}
            />
        </Panel>
    );
};

export default GetIn;
