import { FormCollapse, IFormCollapse } from "@formily/antd-v5";
import { createForm } from "@formily/core";
import { FC } from "react";
import Pannel from "./Pannel";
// import SchemaField from "./SchemaField";

const form = createForm();
const formCollapse = FormCollapse.createFormCollapse();

const MarkupSchema: FC = () => (
    <Pannel form={form} formCollapse={formCollapse}>
        {/*<SchemaField>
        <SchemaField.Void
            title="折叠面板"
            x-component="FormCollapse"
            x-decorator="FormItem"
            x-component-props={{ formCollapse } as { formCollapse: IFormCollapse }}
        >
            <SchemaField.String />
        </SchemaField.Void>
    </SchemaField>
    <FormCollapse formCollapse={formCollapse as IFormCollapse}>
        <FormCollapse.CollapsePanel header="a1" key="a1"></FormCollapse.CollapsePanel>
</FormCollapse>*/}
    </Pannel>
);

export default MarkupSchema;
