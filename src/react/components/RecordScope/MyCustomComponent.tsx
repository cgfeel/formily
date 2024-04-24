import { RecordScope } from "@formily/react";
import { FC, PropsWithChildren } from "react";

const MyCustomComponent: FC<PropsWithChildren<MyCustomComponentProps>> = ({ children, index, record }) => (
    <RecordScope getRecord={() => record} getIndex={() => index}>
        {children}
    </RecordScope>
);

type RecordType = {
    code: string;
    name: string;
};

export interface MyCustomComponentProps {
    index: number;
    record: RecordType;
}

export type RecordDataType = RecordType & {
    $index: number;
    $lookup?: RecordDataType;
};

export default MyCustomComponent;
