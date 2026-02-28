import { Input } from "@formily/antd-v5";
import { ObjectField } from "@formily/core";
import { Field, observer, useForm } from "@formily/react";
import { Button, Space } from "antd";
import { FC } from "react";
import useStyles from "../../style";

const ObjectFieldTypeCom: FC<ObjectFieldTypeComProps> = ({ field }) => {
  const form = useForm();
  const { styles } = useStyles();
  return (
    <>
      <div>
        {Object.keys(field.value || {}).map(key => (
          <div className={styles} key={key}>
            <Space>
              <Field name={key} component={[Input, { placeholder: key }]} />
              <Button onClick={() => field.removeProperty(key)}>Remove</Button>
            </Space>
          </div>
        ))}
      </div>
      <Space>
        <Field
          basePath=""
          name="propertyName"
          component={[Input, { placeholder: "Property Name" }]}
          required
        />
        <Button
          onClick={() => {
            const name = form.values.propertyName;
            if (name && !form.existValuesIn(`${field.path}.${name}`)) {
              field.addProperty(name, "");
              form.deleteValuesIn("propertyName");
            }
          }}
        >
          Add
        </Button>
      </Space>
    </>
  );
};

export interface ObjectFieldTypeComProps {
  field: ObjectField;
}

export default observer(ObjectFieldTypeCom);
