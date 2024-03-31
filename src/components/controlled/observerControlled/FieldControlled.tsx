import { createForm } from "@formily/core";
import { observable } from "@formily/reactive";
import { observer } from "@formily/react";
import { FC, useRef } from "react";
import Panel from "../Panel";
import Wraper from "../valueControlled/Wraper";
import FormCom from "./FormCom";

const values = observable({ input: "" });
const form = createForm({ values });

const WraperObserver = observer(Wraper);

const FieldControlled: FC = () => {
    const ref = useRef(1);
    return (
        <Panel
            footer={
                <p>
                    就是”响应式值受控“的方式，但有在使用自定义 <code>schema</code> 组件的情况更建议使用”
                    <code>Schema</code> 片段联动{"(自定义组件)"}“
                </p>
            }
            header={<h2>最佳实践</h2>}>
            <WraperObserver
                name="Controller 组件"
                footer={<FormCom form={form}>根组件渲染次数：{ref.current++}</FormCom>}
                values={values}
                update={input => {
                    values.input = input;
                }}
            />
        </Panel>
    );
};

export default FieldControlled;
