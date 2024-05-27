import { createForm } from "@formily/core";
import { FC } from "react";
import Wrapper from "../fieldAction/Wrapper";
import SchemaField from "./SchemaField";

const form = createForm();

const ArrayTableExample: FC = () => (
    <Wrapper form={form}>
        <SchemaField>
            <SchemaField.Array name="data" x-component="ArrayField">
                <SchemaField.Object>
                    <SchemaField.Void name="name-column" title="姓名" x-component="ArrayField.Column">
                        <SchemaField.String name="name" x-component="Input" x-decorator="FormItem" />
                    </SchemaField.Void>
                    <SchemaField.Void name="age-column" title="年龄" x-component="ArrayField.Column">
                        <SchemaField.String name="age" x-component="NumberPicker" x-decorator="FormItem" />
                    </SchemaField.Void>
                </SchemaField.Object>
                <SchemaField.Void x-component="ArrayField.Addition" />
            </SchemaField.Array>
        </SchemaField>
    </Wrapper>
);

export default ArrayTableExample;
