import { ExpressionScope, RecordScope, RecordsScope, createSchemaField, useExpressionScope } from "@formily/react";
import { FC, PropsWithChildren } from "react";

const Custom: FC = () => {
    const scope = useExpressionScope();
    return (
        <code className="consumer">
            <pre>{JSON.stringify(scope, null, 2)}</pre>
        </code>
    );
};

const MyExpress: FC<PropsWithChildren> = ({ children }) => (
    <ExpressionScope value={{ $innerScope: { code: "Inner Code", name: "Inner Name" } }}>{children}</ExpressionScope>
);

const MyRecord: FC<PropsWithChildren<MyRecordProps>> = ({ children, index, record }) => (
    <RecordScope getIndex={() => index} getRecord={() => record}>
        {children}
    </RecordScope>
);

const MyRecords: FC<PropsWithChildren<MyRecordsProps>> = ({ children, records }) => (
    <RecordsScope getRecords={() => records}>{children}</RecordsScope>
);

const SchemaField = createSchemaField({
    components: {
        Custom,
        MyExpress,
        MyRecord,
        MyRecords,
    },
    scope: {
        topScope: {
            code: "Top Code",
            name: "Top Name",
        },
    },
});

interface MyRecordProps {
    record: RecordType;
    index: number;
}

interface MyRecordsProps {
    records: RecordType[];
}

type RecordType = {
    code: string;
    name: string;
};

export default SchemaField;
