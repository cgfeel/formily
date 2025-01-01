import { observer, RecordScope } from "@formily/react";
import { FC, PropsWithChildren, useMemo } from "react";
import { SectionItem } from "../hooks/useFakeService";

const UserMapRecord: FC<PropsWithChildren<UserMapRecordProps>> = ({ children, index, record = [] }) => {
    const userMap = useMemo(
        () =>
            record.reduce((current, item) => {
                const name = item.name.trim();
                return {
                    ...current,
                    [name]: item,
                };
            }, {}),
        [record],
    );
    return index === undefined ? (
        <RecordScope getRecord={() => ({ userMap })}>{children}</RecordScope>
    ) : (
        <RecordScope getRecord={() => ({ userMap })} getIndex={() => index}>
            {children}
        </RecordScope>
    );
};

export default observer(UserMapRecord);

interface UserMapRecordProps {
    index?: number;
    record?: SectionItem[];
}
