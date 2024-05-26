import { createForm } from "@formily/core";
import { FormConsumer } from "@formily/react";
import { FC } from "react";
import Wrapper from "../../fieldAction/Wrapper";
import BatchChange from "./BatchChange";
import BatchReact from "./BatchReact";
import FieldChange from "./FieldChange";
import FieldReact from "./FieldReact";
import FieldRevise from "./FieldRevise";
import FieldScope, { VisibleContainer } from "./FieldScope";
import SchemaField from "./SchemaField";

const form = createForm();

const BaseReaction: FC = () => (
    <Wrapper form={form}>
        <SchemaField components={{ VisibleContainer }}>
            <FieldChange />
            <FieldReact />
            <FieldRevise />
            <SchemaField.Void x-component="VisibleContainer">
                <FieldScope />
            </SchemaField.Void>
            <BatchChange />
            <BatchReact />
        </SchemaField>
        <code className="consumer">
            <pre>
                <FormConsumer>{form => JSON.stringify(form.values, null, 2)}</FormConsumer>
            </pre>
        </code>
    </Wrapper>
);

export default BaseReaction;
