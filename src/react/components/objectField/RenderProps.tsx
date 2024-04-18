import { createForm } from "@formily/core";
import { ObjectField } from "@formily/react";
import { FC } from "react";
import Panel from "../../Panel";
import ObjectFieldTypeCom from "./ObjectFieldTypeCom";

const form = createForm();

const RenderProps: FC = () => (
    <Panel form={form} header={<h2>RenderProps</h2>}>
        <ObjectField name="object">{field => <ObjectFieldTypeCom field={field} />}</ObjectField>
    </Panel>
);

export default RenderProps;
