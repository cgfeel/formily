import { createForm, registerValidateLocale } from "@formily/core";
import { ISchema } from "@formily/react";
import { FC } from "react";
import Panel from "../Panel";
import SchemaField from "../SchemaField";

registerValidateLocale({
  "zh-CN": {
    required: "定制的必填校验文案",
  },
});

const form = createForm();
const schema: ISchema = {
  type: "object",
  properties: {
    aa: {
      required: true,
      title: "AA",
      "x-component": "NumberPicker",
      "x-decorator": "FormItem",
      "x-reactions": {
        dependencies: ["bb"],
        fulfill: {
          state: {
            selfErrors: "{{$deps[0] >= $self.value ? ['AA必须大于BB'] : []}}",
          },
        },
      },
    },
    bb: {
      required: true,
      title: "BB",
      "x-component": "NumberPicker",
      "x-decorator": "FormItem",
      "x-reactions": {
        dependencies: ["aa"],
        fulfill: {
          state: {
            selfErrors: "{{$deps[0] <= $self.value ? ['AA必须大于BB'] : []}}",
          },
        },
      },
    },
  },
};

const JsonSchema: FC = () => (
  <Panel
    footer={
      <p>
        和文档不同，分别通过不同的形式进行联动，这里是通过<code>x-reactions</code>
        传递一个依赖对象进行操作
      </p>
    }
    form={form}
    header={
      <h2>
        联动校验 + 自定义文案 - <code>Json Schema</code>
      </h2>
    }
  >
    <SchemaField schema={schema} />
  </Panel>
);

export default JsonSchema;
