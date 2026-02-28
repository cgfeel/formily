import { createForm } from "@formily/core";
import { ISchema } from "@formily/react";
import { FC } from "react";
import Pannel from "./Pannel";
import SchemaField from "./SchemaField";

const form = createForm();
const schema: ISchema = {
  type: "object",
  properties: {
    hideFirstColumn: {
      title: "隐藏 A2",
      type: "boolean",
      "x-component": "Switch",
      "x-decorator": "FormItem",
    },
    table_list: {
      type: "array",
      "x-component": "ArrayTable",
      "x-decorator": "FormItem",
      items: {
        type: "object",
        properties: {
          column1: {
            type: "void",
            "x-component": "ArrayTable.Column",
            properties: {
              sort: {
                type: "void",
                "x-component": "ArrayTable.SortHandle",
              },
            },
            "x-component-props": { align: "center", title: "Sort", width: 50 },
          },
          column2: {
            type: "void",
            "x-component": "ArrayTable.Column",
            properties: {
              index: {
                required: true,
                type: "void",
                "x-component": "ArrayTable.Index",
              },
            },
            "x-component-props": { align: "center", title: "Index", width: 80 },
          },
          column3: {
            type: "void",
            "x-component": "ArrayTable.Column",
            properties: {
              a0: {
                required: true,
                type: "string",
                "x-component": "Input",
                "x-decorator": "Editable",
              },
            },
            "x-component-props": { dataIndex: "a0", title: "A0", width: 200 },
          },
          column4: {
            type: "void",
            "x-component": "ArrayTable.Column",
            properties: {
              a1: {
                type: "boolean",
                "x-component": "Switch",
                "x-decorator": "FormItem",
              },
            },
            "x-component-props": { dataIndex: "a1", title: "显隐->A2", width: 100 },
          },
          column5: {
            type: "void",
            "x-component": "ArrayTable.Column",
            properties: {
              a2: {
                required: true,
                type: "string",
                "x-component": "Input",
                "x-decorator": "FormItem",
                "x-reactions": [
                  {
                    dependencies: [".a1", "hideFirstColumn"],
                    when: "{{$deps[1] || $deps[0]}}",
                    fulfill: {
                      schema: {
                        "x-visible": false,
                      },
                    },
                    otherwise: {
                      schema: {
                        "x-visible": true,
                      },
                    },
                  },
                ],
              },
            },
            "x-component-props": { title: "A2", width: 200 },
            "x-reactions": [
              {
                dependencies: ["hideFirstColumn"],
                when: "{{$deps[0]}}",
                fulfill: {
                  schema: {
                    "x-visible": false,
                  },
                },
                otherwise: {
                  schema: {
                    "x-visible": true,
                  },
                },
              },
            ],
          },
          column6: {
            type: "void",
            "x-component": "ArrayTable.Column",
            properties: {
              a3: {
                required: true,
                type: "string",
                "x-component": "Input",
                "x-decorator": "FormItem",
              },
            },
            "x-component-props": { title: "A3", width: 200 },
          },
          column7: {
            type: "void",
            "x-component": "ArrayTable.Column",
            properties: {
              item: {
                type: "void",
                "x-component": "FormItem",
                properties: {
                  remove: {
                    type: "void",
                    "x-component": "ArrayTable.Remove",
                  },
                  moveDown: {
                    type: "void",
                    "x-component": "ArrayTable.MoveDown",
                  },
                  moveUp: {
                    type: "void",
                    "x-component": "ArrayTable.MoveUp",
                  },
                },
              },
            },
            "x-component-props": { dataIndex: "operations", fixed: "right", title: "Operations" },
          },
        },
      },
      properties: {
        add: {
          title: "添加条目",
          type: "void",
          "x-component": "ArrayTable.Addition",
        },
      },
      "x-component-props": {
        pagination: { pageSize: 0 },
        scroll: { x: 1000 },
      },
    },
  },
};

const JsonSchema: FC = () => (
  <Pannel
    footer={
      <div>
        <p>
          <code>Markup Schema</code> 虚拟节点的 <code>name</code> 可以忽略，<code>Json Schema</code>{" "}
          不行，但如果要在 <code>Form</code> 的 <code>effects</code> 中进行受控就必须填写{" "}
          <code>name</code> 作为查找路径
        </p>
        <p>
          在<code>ArrayTale</code> 组件中属性 <code>item</code> 用于存放表格列表节点，属性{" "}
          <code>properties</code> 用于存放附加节点，例如：自增表格控件
        </p>
        <p>
          在<code>ArrayTale.Cloumn</code> 组件中也有属性 <code>properties</code>{" "}
          可以包含一个拥有行操作的平级虚拟节点集合；组件<code>ArrayTable.Column</code>
          是可以没有包装器的，因为它本身就是表格中的列元素，充当了包装器
        </p>
        <p>
          在示例受控中使用到了<code>when</code>，可以理解为<code>if</code>，当满足条件时执行
          <code>fulfill</code>否则就执行<code>otherwise</code>
        </p>
      </div>
    }
    form={form}
    header={
      <h2>
        通过<code>Json Schema</code>创建自增表格
      </h2>
    }
  >
    <SchemaField schema={schema} />
  </Pannel>
);

export default JsonSchema;
