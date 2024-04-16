import { FormPath, createForm } from "@formily/core";
import { FC, useMemo } from "react";
import Consumer, { FormData } from "../Consumer";
import Panel from "../Panel";
import { actionDisabled, checkDataPath, printEffect } from "../action/pathAction";
import SubscriptSchema from "../schema/SubscriptSchema";

const target = { values: {} };
const values = {
    group: [{ path: "a.b.c", text: "value", read: true }],
};

const filter = ({ group }: FormData) => {
    target.values = {};
    group.forEach(({ path, text }) => {
        try {
            if (path && text) {
                FormPath.setIn(target.values, path, text);
            }
        } catch {}
    });
    return target.values;
};

const Dot: FC = () => {
    const form = useMemo(
        () =>
            createForm({
                values,
                effects: () => {
                    printEffect();
                },
            }),
        [],
    );
    return (
        <Panel
            footer={
                <div>
                    <p>
                        就是我们最常用的 <code>a.b.c</code> 格式，用点符号来分割每个路径节点，主要用来读写数据
                    </p>
                    <p>
                        <code>FormPath.setIn</code> 设置匹配路径的问题，下面所有数据路径案例都存在：
                    </p>
                    <ul>
                        <li>
                            通过 <code>FormPath.setIn</code> 可以设置带有 <code>*</code> 匹配路径，会将赋值的对象{" "}
                            <code>target</code> 作为值，而不是提供的 <code>value</code>
                        </li>
                        <li>这样就失去原本的意义了，所以在数据路径演示中屏蔽了填写匹配路径</li>
                    </ul>
                </div>
            }
            header={<h2>点路径</h2>}
            form={form}>
            <SubscriptSchema
                scope={{ actionDisabled }}
                reactions={{
                    copy: "{{actionDisabled($self, 'CopyDisabledBtn')}}",
                    remove: "{{actionDisabled($self, 'RemoveDisabledBtn')}}",
                }}
                pathValidator={checkDataPath}
            />
            <Consumer values={form.values} filter={filter} />
        </Panel>
    );
};

export default Dot;
