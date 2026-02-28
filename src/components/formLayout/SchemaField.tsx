import { Input, Select } from "@formily/antd-v5";
import { createSchemaField } from "@formily/react";
import { FC, PropsWithChildren } from "react";
import FormItem from "../formItem/form-item";
import FormLayout from "./form-layout";

const CustomCom: FC<PropsWithChildren<{}>> = ({ children }) => <div>{children}</div>;

const CustomSub: FC = () => (
  <p>自定义组件提示，用于证明在 SchemaField 中只能通过这种方式才能定义组件。</p>
);

const SchemaField = createSchemaField({
  components: {
    CustomCom,
    CustomSub,
    FormItem,
    FormLayout,
    Input,
    Select,
  },
});

export default SchemaField;
