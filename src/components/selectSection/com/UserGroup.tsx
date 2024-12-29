import { ISchema, observer, RecordScope, RecursionField, Schema, useField, useFieldSchema } from "@formily/react";
import { Col, Row } from "antd";
import { FC } from "react";
import { UserData, useSchemaData, useUserField } from "../hooks/useSelectCollapse";
import { Field } from "@formily/core";

const isUserCheckBox = (schema: ISchema) => schema["x-component"] === "SelectCollapse.UserCheckBox";

const UserItem: FC<UserItemProps> = ({ basePath, data, schema }) => (
    <Col span={24}>
        {schema.reduceProperties(
            (addition, schema) =>
                isUserCheckBox(schema) ? (
                    <RecursionField name={data.name} basePath={basePath} schema={{ ...schema, "x-data": data }} />
                ) : (
                    addition
                ),
            null,
        )}
    </Col>
);

const UserGroup: FC = () => {
    const field = useField();
    const [schema, { group, section, values }] = useSchemaData();
    // const schema = useFieldSchema();

    //  (isUserCheckBox(schema) ? <RecursionField name={key} basePath={field.address} schema={schema} mapProperties={schema => ({ ...schema, 'x-data': { name } })} /> : addition)

    return (
        <Row gutter={[0, 16]}>
            {group.map((name, i) => (
                <UserItem
                    basePath={field.address}
                    data={{ group: [name], name, section, values: values.indexOf(name) < 0 ? [] : [name] }}
                    key={`${name}-${i}`}
                    schema={schema}
                />
            ))}
        </Row>
    );

    /*const { group, section } = field.data as GroupType; // formily 不提供泛型，也没有推断，只能断言
    return (
        <Row>
            {schema.reduceProperties((_, schema) =>
                !isUserCheckBox(schema) ? (
                    <Col>section is empty.</Col>
                ) : (
                    group.map(name => (
                        <Col key={name} span={24}>
                            <RecursionField
                                name={name}
                                basePath={field.address}
                                key={name}
                                schema={{ ...schema, "x-data": { section, name } }}
                            />
                        </Col>
                    ))
                ),
            )}
        </Row>
    );*/
};

export default observer(UserGroup);

interface UserItemProps {
    basePath: Field["address"];
    data: UserData;
    schema: Schema;
}

type GroupType = {
    group: string[];
    section: string;
};
