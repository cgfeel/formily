import { FC } from "react";
import Layout from "./Layout";
import SchemaField from "../SchemaField";

const MarkupSchema: FC = () => (
    <Layout>
        <SchemaField>
            <SchemaField.String title="我是必填项" x-component="Input" x-decorator="FormItem" required />
        </SchemaField>
    </Layout>
);

export default MarkupSchema;
