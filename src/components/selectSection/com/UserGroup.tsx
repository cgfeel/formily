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
                    <RecursionField
                        name={data.name}
                        basePath={basePath}
                        schema={{ ...schema, "x-data": data }}
                        mapProperties={schema => ({ ...schema, "x-data": data })}
                    />
                ) : (
                    addition
                ),
            null,
        )}
    </Col>
);

const UserGroup: FC = () => {
    const field = useField();
    const [schema, { group, readPretty, section, values }] = useSchemaData();

    return (
        <Row gutter={[0, 16]}>
            {group.map((name, i) => (
                <UserItem
                    basePath={field.address}
                    data={{ group: [name], name, readPretty, section, values: values.indexOf(name) < 0 ? [] : [name] }}
                    key={`${name}-${i}`}
                    schema={schema}
                />
            ))}
        </Row>
    );
};

export default observer(UserGroup);

interface UserItemProps {
    basePath: Field["address"];
    data: UserData;
    schema: Schema;
}
