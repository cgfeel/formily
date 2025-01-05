import { ISchema, observer, RecordScope, RecursionField, Schema, useField, useFieldSchema } from "@formily/react";
import { Col, Row } from "antd";
import { FC } from "react";
import { useCollapseScope, UserData, useSchemaData } from "../hooks/useSelectCollapse";
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
    const { readPretty, search } = useCollapseScope();

    const [schema, { group, section }] = useSchemaData();
    // const sectionName = section.toLowerCase();

    return (
        <Row gutter={[0, 16]}>
            {group.map(
                (name, i) =>
                    (search === "" || name.toLowerCase().indexOf(search) > -1) && (
                        <UserItem
                            basePath={field.address}
                            data={{
                                group: [name],
                                name,
                                readPretty,
                                section,
                            }}
                            key={`${name}-${i}`}
                            schema={schema}
                        />
                    ),
            )}
        </Row>
    );
};

export default observer(UserGroup);

interface UserItemProps {
    basePath: Field["address"];
    data: UserData;
    schema: Schema;
}
