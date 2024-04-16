import { Field, FormPath, GeneralField, createForm, isField, onFieldInit } from "@formily/core";
import { FC, useMemo } from "react";
import Panel from "../Panel";
import { FilterFn, actionDisabled, checkDataPath, printEffect } from "../action/pathAction";
import SubscriptSchema from "../schema/SubscriptSchema";

const defaultPath = "aa.1.cc";
const values = {
    group: [
        { path: "aa.bb.cc", text: ".dd", read: true },
        { path: "aa.1.cc", text: "..[].dd", read: true },
        { path: "aa.1.cc", text: "..[+].dd", read: true },
        { path: "aa.1.cc", text: "..[+10].dd", read: true },
    ],
};

const itemFilter: FilterFn = ([path, text]) => {
    const textValitor = !!text && text.indexOf(".") === 0;
    return !path || !textValitor ? [] : [path, FormPath.parse(text, path).toString()];
};

const pathReaction = (field: Field) => {
    if (!field.value) {
        field.value = defaultPath;
    }
};

const validator = (field: GeneralField) => {
    isField(field) &&
        field.setValidator(value => {
            const textValitor = !!value && value.indexOf(".") === 0;
            return textValitor ? "" : "不是有效相对路径";
        });
};

const Relative: FC = () => {
    const form = useMemo(
        () =>
            createForm({
                values,
                effects: () => {
                    printEffect(itemFilter);
                    onFieldInit("group.*.text", validator);
                },
            }),
        [],
    );
    return (
        <Panel
            footer={
                <div>
                    <p>
                        相对路径语法主要是在数据型路径头部用点语法表示，对于计算数组的相邻元素非常好用，它主要有几个特点：
                    </p>
                    <ul>
                        <li>一个点代表当前路径</li>
                        <li>
                            n 个点代表往前 n-1 步，中括号中可以用下标计算表达式：
                            <ul>
                                <li>
                                    <code>[+]</code> 代表当前下标+1，
                                </li>
                                <li>
                                    <code>[-]</code> 代表当前下标-1，
                                </li>
                                <li>
                                    <code>[+n]</code>代表当前下标+n，
                                </li>
                                <li>
                                    <code>[-n]</code>代表当前下标-n
                                </li>
                            </ul>
                        </li>
                        <li>
                            路径匹配的时候不能使用分组匹配和范围匹配，比如<code>*(..[+1].aa,..[+2].bb)</code>这样的形式
                        </li>
                    </ul>
                </div>
            }
            form={form}
            header={<h2>相对路径</h2>}>
            <SubscriptSchema
                reactions={{
                    copy: "{{actionDisabled($self, 'CopyDisabledBtn')}}",
                    path: "{{pathReaction($self)}}",
                    remove: "{{actionDisabled($self, 'RemoveDisabledBtn')}}",
                    text: {
                        fulfill: {
                            state: {
                                title: "相对路径",
                            },
                        },
                    },
                }}
                scope={{ actionDisabled, pathReaction }}
                pathValidator={checkDataPath}
            />
        </Panel>
    );
};

export default Relative;
