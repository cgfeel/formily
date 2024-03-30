import { createForm } from "@formily/core";
import { observable } from "@formily/reactive";
import { observer } from "@formily/react";
import { FC, useRef } from "react";
import Form from "../../form/form";
import Panel from "../Panel";
import SchemaField from "../SchemaField";
import Wraper from "../valueControlled/Wraper";

const values = observable({ input: "" });
const form = createForm({ values });

const WraperObserver = observer(Wraper);

const FieldControlled: FC = () => {
    const ref = useRef(1);
    return (
        <Panel
            footer={
                <p>
                    就是”响应式值受控“的方式，但有在使用 <code>schema</code>
                </p>
            }
            header={<h2>最佳实践</h2>}>
            <WraperObserver
                name="Controller 组件"
                footer={
                    <Form form={form}>
                        <SchemaField>
                            <SchemaField.String
                                name="input"
                                x-component="Input"
                                x-decorator="FormItem"
                                x-pattern="readOnly"
                                x-component-props={{ placeholder: "受控者" }}
                            />
                        </SchemaField>
                        根组件渲染次数：{ref.current++}
                    </Form>
                }
                values={values}
                update={input => {
                    values.input = input;
                }}
            />
        </Panel>
    );
};

export default FieldControlled;
