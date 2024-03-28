import { createForm } from "@formily/core";
import { ISchema } from "@formily/react";
import { FC } from "react";
import { options } from "../../formItem/other/dataSource";
import Panel from "../Panel";
import SchemaField from "../SchemaField";

const form = createForm();
const schema: ISchema = {
    type: "object",
    properties: {
        cascader: {
            required: true,
            title: "选择框",
            type: "string",
            "x-component": "Cascader",
            "x-decorator": "FormItem",
            enum: options,
        },
    },
};

const CascaderSync: FC = () => (
    <Panel
        form={form}
        header={
            <h2>
                <code>Json Schema</code> 同步数据源案例
            </h2>
        }>
        <SchemaField schema={schema} />
    </Panel>
);

export default CascaderSync;
