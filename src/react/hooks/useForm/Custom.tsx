import { observer, useForm } from "@formily/react";
import { FC } from "react";
import CodePreview from "../../CodePreview";

const Custom: FC = () => {
  const form = useForm();
  return <CodePreview>{JSON.stringify(form.values, null, 2)}</CodePreview>;
};

export default observer(Custom);
