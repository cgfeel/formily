import { observer, useParentForm } from "@formily/react";
import { FC } from "react";

const Custom: FC = () => {
  const form = useParentForm();
  return <p>{form.displayName}</p>;
};

export default observer(Custom);
