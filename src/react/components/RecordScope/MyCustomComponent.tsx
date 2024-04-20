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
    index: 0;
    record: RecordType;
}

export default MyCustomComponent;
