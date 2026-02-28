import { Input } from "@formily/antd-v5";
import { isField } from "@formily/core";
import { Field, observer, useParentForm } from "@formily/react";
import { FC } from "react";
import Pannel, { buttonClick, fieldKeys } from "../../../components/drawer/Pannel";
import FormItem from "../../../components/formItem/form-item";

const FixedInner: FC = () => (
  <>
    {fieldKeys.map((key, i) => (
      <Field
        component={[Input]}
        decorator={[FormItem]}
        key={key}
        name={key}
        title={`输入框${i + 1}`}
        required
      />
    ))}
  </>
);

const SubForm: FC = () => {
  const form = useParentForm();
  return isField(form) ? (
    <Pannel
      onClick={() =>
        buttonClick(<FixedInner />, { [fieldKeys[0]]: "789" }, values =>
          form.setValue({ ...values }),
        )
      }
    />
  ) : (
    <></>
  );
};

export default observer(SubForm);
