import { Space } from "@formily/antd-v5";
import { createForm } from "@formily/core";
import { Button } from "antd";
import { ISchema } from "@formily/react";
import { FC, useState } from "react";
import Form from "../../form/form";
import SchemaField from "../SchemaField";
import Wraper from "./Wraper";
import { schemaA, schemaB } from "./server";

const FormControlled: FC = () => {
  const [current, setCurrent] = useState<ISchema>({});
  const form = createForm();

  return (
    <Wraper
      footer={
        <div>
          <p>
            对于表单配置化场景会有一个需求，表单的 <code>Schema</code>
            会发生频繁改变，其实就相当于频繁创建新表单了，之前操作的状态就应该丢弃了
          </p>
          <p>实现原理：</p>
          <ul>
            <li>
              将 <code>form</code> 和 <code>schema</code> 和状态值 <code>current</code>{" "}
              绑定一起，当状态发生改变的时候，刷新表单和 <code>schema</code>
            </li>
            <li>
              当前受控模式会刷新整个 <code>form</code> 和 <code>schema</code>，所以不需要包裹{" "}
              <code>observer</code>
            </li>
          </ul>
        </div>
      }
      header={<h2>Schema 受控</h2>}
    >
      <Form layout="vertical" form={form}>
        <Space>
          <Button onClick={() => setCurrent(schemaA)}>Schema1</Button>
          <Button onClick={() => setCurrent(schemaB)}>Schema2</Button>
        </Space>
        <SchemaField schema={current} />
      </Form>
    </Wraper>
  );
};

export default FormControlled;
