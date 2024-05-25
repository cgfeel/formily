import { Field, ObjectField, isObjectField } from "@formily/core";
import { RecordScope, Schema, useField, useFieldSchema } from "@formily/react";
import { toJS } from "@formily/reactive";
import { Button, Col, Select, Space } from "antd";
import { FC, PropsWithChildren, createContext, useCallback, useContext } from "react";

function mixin<T extends object = object>(target: T): T & ObjectBaseMixins {
    return Object.assign(target, { Addition, Options, Remove });
}

const defaultFilter: Exclude<ObjectRemoveProps["filter"], undefined> = data => {
    const { children } = data;
    if (!Array.isArray(children)) return data;

    const items = children.map(item => defaultFilter(item)).filter(Boolean);
    return items.length === 0 ? null : { ...data, children: items };
};

const isFn = (target: any): target is FnType => typeof target === "function";

const useIndex = () => useContext(ItemContext).index;
const useObject = () => useContext(ObjectBaseContext);
const useRecord = () => {
    const { record } = useContext(ItemContext);
    return isFn(record) ? record() : record;
};

const ItemContext = createContext<IObjectBaseItemProps>({} as IObjectBaseItemProps);
const ObjectBaseContext = createContext<IObjectBaseInstance>({} as IObjectBaseInstance);

const Addition: FC<ObjectAdditionProps> = ({ groupTitle = "加条件组", title = "加条件" }) => {
    const record = useRecord();
    const {
        field,
        props: { defaultData },
    } = useObject();

    return (
        <Space>
            <Button
                onClick={() => {
                    record.children.push(defaultData.item);
                    field.value = toJS(field.value);
                }}>
                {title}
            </Button>
            <Button
                onClick={() => {
                    record.children.push({ ops: defaultData.ops, children: [defaultData.item] });
                    field.value = toJS(field.value);
                }}>
                {groupTitle}
            </Button>
        </Space>
    );
};

const InternalObjectBase: FC<PropsWithChildren<IObjectBaseProps>> = ({ children, ...props }) => {
    const field = useField();
    const schema = useFieldSchema();
    return !isObjectField(field) ? null : (
        <RecordScope getRecord={() => field.value}>
            <ObjectBaseContext.Provider value={{ field, schema, props }}>{children}</ObjectBaseContext.Provider>
        </RecordScope>
    );
};

const Item: FC<PropsWithChildren<IObjectBaseItemProps>> = ({ children, record, ...props }) => (
    <ItemContext.Provider value={{ ...props, record }}>
        <RecordScope getRecord={isFn(record) ? record : () => record}>{children}</RecordScope>
    </ItemContext.Provider>
);

const Options: FC = () => {
    const field = useField<Field>();
    return (
        <Col flex="70px">
            <Select value={field.value} options={field.dataSource || []} onChange={value => (field.value = value)} />
        </Col>
    );
};

const Remove: FC<ObjectRemoveProps> = ({ title = "删除", filter = defaultFilter }) => {
    const record = useRecord();
    const { field } = useObject();

    const index = useIndex();
    const handler = useCallback(filter, [filter]);

    return (
        <Button
            onClick={() => {
                if (index !== undefined) {
                    record.children.splice(index, 1);
                    field.value = handler(toJS(field.value)) || {};
                }
            }}>
            {title}
        </Button>
    );
};

const ObjectBase = Object.assign(InternalObjectBase, {
    Addition,
    Item,
    Remove,
    Options,
    mixin,
});

type DefaultDataType = {
    ops: string;
    item: Record<string, any>;
};

type FnType = () => Record<string, any>;

export interface IObjectBaseInstance {
    field: ObjectField;
    props: IObjectBaseProps;
    schema: Schema;
}

export interface IObjectBaseItemProps {
    record: (() => Record<string, any>) | Record<string, any>;
    index?: number;
}

export interface IObjectBaseProps {
    defaultData: DefaultDataType;
    disabled?: boolean;
}

export interface ObjectAdditionProps {
    groupTitle?: string;
    title?: string;
}

export interface ObjectBaseMixins {
    Addition: FC<ObjectAdditionProps>;
    Options: FC;
    Remove: FC<ObjectRemoveProps>;
}

export interface ObjectRemoveProps {
    title?: string;
    filter?: <T extends Partial<Record<string, any>>>(data: T) => T | null;
}

export { ObjectBase, useObject };

export default ObjectBase;
