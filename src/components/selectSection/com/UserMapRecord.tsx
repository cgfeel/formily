import { FieldDataSource, isField } from "@formily/core";
import { observer, RecordScope, useField } from "@formily/react";
import { FC, PropsWithChildren } from "react";
import { SectionItem } from "../hooks/useFakeService";

const objectKeys = <T extends object, K = keyof T>(obj: T) => Object.keys(obj) as Array<K>;
const transformItem = (item: FieldDataSource[number]): SectionItem => {
    const record = { mail: "", name: "", section: "" };
    objectKeys(record).forEach(key => (record[key] = key in item && item[key] ? String(item[key]).trim() : ""));

    return record;
};

const UserMapRecord: FC<PropsWithChildren<UserMapRecordProps>> = ({ children, index }) => {
    const field = useField();

    const record = !isField(field) ? [] : field.dataSource;
    const userMap = record.reduce<Record<string, SectionItem>>((current, item) => {
        const record = transformItem(item);
        const { name, section } = record;

        return name === "" || section === ""
            ? current
            : {
                  ...current,
                  [name]: record,
              };
    }, {});

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
