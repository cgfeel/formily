import { createForm } from "@formily/core";
import { ISchema } from "@formily/react";
import { FC } from "react";
import Panel from "./Panel";
import SchemaField from "./SchemaField";
import { countValue } from "./server";

const form = createForm<{ projects: ProjectsItem[] }>();
const schema: ISchema = {
  type: "object",
  properties: {
    projects: {
      title: "Projects",
      type: "array",
      "x-component": "ArrayTable",
      "x-decorator": "FormItem",
      items: {
        type: "object",
        properties: {
          column_1: {
            type: "void",
            "x-component": "ArrayTable.Column",
            properties: {
              sortable: {
                type: "void",
                "x-component": "ArrayTable.SortHandle",
                "x-decorator": "FormItem",
              },
            },
            "x-component-props": { align: "center", title: "Sort", width: 50 },
          },
          column_2: {
            type: "void",
            "x-component": "ArrayTable.Column",
            properties: {
              index: {
                type: "void",
                "x-component": "ArrayTable.Index",
                "x-decorator": "FormItem",
              },
            },
            "x-component-props": { align: "center", title: "Index", width: 80 },
          },
          column_3: {
            type: "void",
            "x-component": "ArrayTable.Column",
            properties: {
              price: {
                default: 0,
                required: true,
                type: "number",
                "x-component": "NumberPicker",
                "x-decorator": "Editable",
                "x-component-props": { addonAfter: "$", min: 0 },
              },
            },
            "x-component-props": { title: "Price" },
          },
          column_4: {
            type: "void",
            "x-component": "ArrayTable.Column",
            properties: {
              count: {
                default: 0,
                required: true,
                type: "number",
                "x-component": "NumberPicker",
                "x-decorator": "Editable",
                "x-component-props": { min: 0 },
              },
            },
            "x-component-props": { title: "Count" },
          },
          column_5: {
            type: "void",
            "x-component": "ArrayTable.Column",
            properties: {
              total: {
                type: "number",
                "x-component": "NumberPicker",
                "x-decorator": "FormItem",
                "x-pattern": "readPretty",
                "x-component-props": { addonAfter: "$" },
                "x-reactions": {
                  dependencies: [".count", ".price"],
                  when: "{{$deps[0] && $deps[1]}}",
                  fulfill: {
                    state: {
                      value: "{{$deps[0] * $deps[1]}}",
                    },
                  },
                  otherwise: {
                    state: {
                      value: 0,
                    },
                  },
                },
              },
            },
            "x-component-props": { title: "Total" },
          },
          column_6: {
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
            "x-component-props": {
              dataIndex: "options",
              fixed: "right",
              title: "Options",
              width: 200,
            },
          },
        },
      },
      properties: {
        add: {
          title: "Add",
          type: "void",
          "x-component": "ArrayTable.Addition",
        },
      },
      "x-component-props": { scroll: { x: 1000 } },
    },
    total: {
      title: "Total",
      type: "number",
      "x-component": "NumberPicker",
      "x-decorator": "FormItem",
      "x-pattern": "readPretty",
      "x-component-props": { addonAfter: "$" },
      "x-reactions": {
        dependencies: [".projects"],
        when: "{{$deps.length > 0}}",
        fulfill: {
          state: {
            value: "{{countValue($deps[0])}}",
          },
        },
      },
    },
  },
};

const JsonSchema: FC = () => (
  <Panel
    form={form}
    header={
      <h2>
        通过<code>Json Schema</code>联动计算
      </h2>
    }
  >
    <SchemaField schema={schema} scope={{ countValue }} />
  </Panel>
);

export default JsonSchema;
