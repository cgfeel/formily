import { FormPath, GeneralField, createForm, isField, onFieldInit } from "@formily/core";
import { FC, useMemo } from "react";
import Consumer, { FormData } from "../Consumer";
import Panel from "../Panel";
import { FilterFn, actionDisabled, printEffect } from "../action";
import SubscriptSchema from "../schema/SubscriptSchema";

const target = { values: {} };
const values = {
    group: [{ path: "parent.[aa,bb]", text: "[11, 22]", read: true }],
};

const pathValidator = (value: string) => (/\[.+\]/.test(value) ? "" : "路径不对或解构未分配值");

const itemFilter: FilterFnType = ([path, text], unparse) => {
    if (!path || "" !== pathValidator(path) || !text) {
        return [];
    }

    const str = unparse ? "" : FormPath.parse(path).toString();
    return [path, JSON.parse(text), str === "" ? "" : ` - parse: ${str}`];
};

const filter = ({ group }: FormData) => {
    target.values = {};
    group.forEach(({ path = "", text = "" }) => {
        try {
            const [address, value] = itemFilter([path, text], true);
            if (address && value) {
                FormPath.setIn(target.values, address, value);
            }
        } catch {}
    });
    return target.values;
};

const validator = (field: GeneralField) => {
    isField(field) &&
        field.setValidator(value => {
            try {
                value && JSON.parse(value);
                return "";
            } catch {
                return "不是有效的 JSON";
            }
        });
};

const Deconstruct: FC = () => {
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
                        会自动将匹配值转化为 <code>JSON</code> 作为路径值去匹配，演示中禁止匹配空对象 <code>.[]</code>
                        ，因为得到的是非字符的空对象，作为演示无意义，如果要核对匹配路径可以在“匹配路径语法”选项中查看“解构匹配”
                    </p>
                    <p>
                        解构表达式类似于 <code>ES6</code> 的解构语法，只是它不支持 <code>...</code>{" "}
                        解构，在前后端数据不一致的场景非常适用，它主要有几个特点：
                    </p>
                    <ul>
                        <li>
                            解构表达式会作为点路径的某个节点，我们可以把它看做一个普通字符串节点，只是在数据操作时会生效，所以在匹配语法中只需要把解构表达式作为普通节点节点来匹配即可
                        </li>
                        <li>
                            在 <code>setIn</code> 中使用解构路径，数据会被解构
                        </li>
                        <li>
                            在 <code>getIn</code> 中使用解构路径，数据会被解构
                        </li>
                    </ul>
                </div>
            }
            header={<h2>解构表达式</h2>}
            form={form}>
            <SubscriptSchema
                reactions={{
                    copy: "{{actionDisabled($self, 'CopyDisabledBtn')}}",
                    remove: "{{actionDisabled($self, 'RemoveDisabledBtn')}}",
                }}
                scope={{ actionDisabled }}
                pathValidator={pathValidator}
            />
            <Consumer values={form.values} filter={filter} />
        </Panel>
    );
};

type FilterFnType = (value: Parameters<FilterFn>[0], unparse?: boolean) => ReturnType<FilterFn>;

export default Deconstruct;
