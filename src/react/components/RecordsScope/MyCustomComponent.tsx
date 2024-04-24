import { RecordsScope } from "@formily/react";
import { FC, PropsWithChildren } from "react";

const MyCustomComponent: FC<PropsWithChildren<MyCustomComponentProps>> = ({ children, records }) => (
    <RecordsScope getRecords={() => records}>{children}</RecordsScope>
);

export interface MyCustomComponentProps {
    records: RecordType[];
}

export type RecordType = {
    code: string;
    name: string;
};

export default MyCustomComponent;
