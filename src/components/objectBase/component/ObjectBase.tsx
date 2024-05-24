import { ObjectField, isObjectField } from "@formily/core";
import { RecordScope, Schema, useField, useFieldSchema } from "@formily/react";
import { Select } from "antd";
import { FC, PropsWithChildren, createContext, useContext } from "react";

function mixin<T extends object = object>(target: T): T & ObjectBaseMixins {
    return Object.assign(target, { Addition });
}

const useObject = () => {
    return useContext(ObjectBaseContext);
};

const ObjectBaseContext = createContext<IObjectBaseInstance>({} as IObjectBaseInstance);

const Addition: FC = () => <></>;

const InternalObjectBase: FC<PropsWithChildren<IObjectBaseProps>> = ({ children, ...props }) => {
    const field = useField();
    const schema = useFieldSchema();
    return !isObjectField(field) ? null : (
        <RecordScope getRecord={() => field.value}>
            <ObjectBaseContext.Provider value={{ field, schema, props }}>{children}</ObjectBaseContext.Provider>
        </RecordScope>
    );
};

const Options: FC = () => {
    const context = useObject();
    if (!context) return null;
    return (
        <Select
            options={[
                { value: "and", label: "且" },
                { value: "or", label: "或" },
            ]}
        />
    );
};

const ObjectBase = Object.assign(InternalObjectBase, {
    Addition,
    mixin,
});

export interface IObjectBaseInstance {
    field: ObjectField;
    props: IObjectBaseProps;
    schema: Schema;
}

export interface IObjectBaseProps {
    disabled?: boolean;
}

export interface ObjectBaseMixins {
    Addition: FC;
}

export { ObjectBase };

export default ObjectBase;
