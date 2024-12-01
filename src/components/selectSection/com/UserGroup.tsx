import { ISchema, observer, RecursionField, useField, useFieldSchema } from "@formily/react";
import { Col, Row } from "antd";
import { FC } from "react";

const isUserCheckBox = (schema: ISchema) => schema["x-component"] === "UserCheckBox";

const UserGroup: FC = () => {
    const field = useField();
    const schema = useFieldSchema();

    const { group, section } = field.data as GroupType; // formily 不提供泛型，也没有推断，只能断言
    schema.reduceProperties((_, schema) =>
        !isUserCheckBox(schema) ? (
            <Col>section is empty.</Col>
        ) : (
            group.map(name => {
                console.log(schema);
                return <></>;
            })
        ),
    );
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
                                key={name}
                                schema={{ ...schema, ["x-data"]: { section, name } }}
                            />
                        </Col>
                    ))
                ),
            )}
        </Row>
    );
};

export default observer(UserGroup);

type GroupType = {
    group: string[];
    section: string;
};
