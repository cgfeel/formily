import {
  ContainerOutlined,
  ControlOutlined,
  DatabaseOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { createForm, onFieldValueChange } from "@formily/core";
import { FC, useMemo } from "react";
import Panel from "./Panel";
import SchemaField from "./SchemaField";
import { FormConsumer } from "@formily/react";
import { useFakeService } from "./hooks/useFakeService";
import { createModalFormEffect } from "./event";
import { defaultItem } from "./hooks/useSelectCollapse";

const SelectSectionExample: FC = () => {
  const [request] = useFakeService(3000);
  const form = useMemo(
    () =>
      createForm({
        effects: () => {
          createModalFormEffect(request);
          onFieldValueChange("user-map.search-list", field =>
            field.setComponentProps({ suffix: !field.value ? <SearchOutlined /> : undefined }),
          );
        },
      }),
    [request],
  );

  return (
    <Panel form={form}>
      <SchemaField>
        <SchemaField.Object enum={[]} name="user-map" x-component="UserMapRecord">
          <SchemaField.Void
            x-component="FormGrid"
            x-component-props={{
              columnGap: 0,
              maxColumns: 3,
            }}>
            <SchemaField.Void
              x-component="Card"
              x-decorator="GridColumn"
              x-decorator-props={{ gridSpan: 2 }}>
              <SchemaField.String
                name="search-user"
                x-component="Input"
                x-decorator="CardHeader"
                x-component-props={{
                  allowClear: true,
                  placeholder: "输入部门或员工名称进行筛选",
                  suffix: <SearchOutlined />,
                }}
                x-reactions={{
                  dependencies: [".collapse#dataSource"],
                  fulfill: {
                    state: {
                      disabled: "{{ ($deps[0]||[]).length === 0 }}",
                    },
                  },
                }}
              />
              <SchemaField.Boolean name="tool-all" x-component="Checkbox" x-decorator="ToolBar" />
              <SchemaField.Void
                title="最近的选择"
                x-component="RecentRhoices"
                x-component-props={{ eventName: "select-user-collapse" }}
                x-decorator="TipTitle"
                x-reactions={{
                  dependencies: [".collapse"],
                  fulfill: {
                    state: {
                      data: "{{ $deps[0]||[] }}",
                    },
                  },
                }}
              />
              <SchemaField.Void
                title="部门和同事"
                x-component="ScrollWapper"
                x-decorator="TipTitle">
                <SchemaField.Array
                  name="collapse"
                  x-component="SelectCollapse"
                  x-component-props={{
                    size: "small",
                  }}
                  x-reactions={{
                    dependencies: [".search-user"],
                    fulfill: {
                      state: {
                        componentProps: { search: "{{ $deps[0] }}" },
                      },
                    },
                  }}>
                  <SchemaField.Object>
                    <SchemaField.Void
                      x-component="SelectCollapse.UserCheckBox"
                      x-decorator="SelectCollapse.PanelDecorator"
                    />
                    <SchemaField.Void x-component="SelectCollapse.UserGroup">
                      <SchemaField.Void x-component="SelectCollapse.UserCheckBox">
                        <SchemaField.Void x-component="SelectCollapse.UserCheckBox.Face" />
                      </SchemaField.Void>
                    </SchemaField.Void>
                  </SchemaField.Object>
                  <SchemaField.Void x-component="SelectCollapse.SelectSkeleton" />
                  <SchemaField.Void x-component="SelectCollapse.SelectEmpty" />
                </SchemaField.Array>
              </SchemaField.Void>
            </SchemaField.Void>
            <SchemaField.Void
              x-component="Card"
              x-decorator="GridColumn"
              x-decorator-props={{ gridSpan: 1 }}
              x-component-props={{
                title: "已选中的人",
              }}>
              <SchemaField.String
                name="search-select"
                x-component="Input"
                x-component-props={{
                  allowClear: true,
                  placeholder: "输入部门或员工名称进行筛选",
                  suffix: <SearchOutlined />,
                }}
                x-reactions={{
                  dependencies: [".collapse"],
                  fulfill: {
                    state: {
                      disabled: "{{ ($deps[0] || []).length === 0 }}",
                    },
                  },
                }}
              />
              <SchemaField.Void x-component="ScrollWapper">
                <SchemaField.Array
                  name="collapse-selected"
                  x-component="SelectCollapse"
                  x-component-props={{
                    expandIconPosition: "start",
                    size: "small",
                  }}
                  x-reactions={{
                    dependencies: [".search-select", ".collapse"],
                    fulfill: {
                      state: {
                        componentProps: { search: "{{ $deps[0] }}" },
                        value: "{{ $deps[1] }}",
                      },
                    },
                  }}
                  x-pattern="readPretty">
                  <SchemaField.Object>
                    <SchemaField.Void x-component="SelectCollapse.UserCheckBox" />
                    <SchemaField.Void x-component="SelectCollapse.UserGroup">
                      <SchemaField.Void x-component="SelectCollapse.UserCheckBox">
                        <SchemaField.Void x-component="SelectCollapse.UserCheckBox.Face" />
                      </SchemaField.Void>
                    </SchemaField.Void>
                  </SchemaField.Object>
                  <SchemaField.Void
                    x-component="SelectCollapse.UserCheckBox.Remove"
                    x-component-props={{
                      type: "select-user-collapse",
                    }}
                  />
                  <SchemaField.Void
                    x-component="SelectCollapse.SelectEmpty"
                    x-component-props={{ description: "请左侧选择员工" }}
                  />
                </SchemaField.Array>
              </SchemaField.Void>
            </SchemaField.Void>
          </SchemaField.Void>
          <SchemaField.Void
            x-component="FormGrid"
            x-component-props={{
              columnGap: 0,
              maxColumns: 3,
            }}>
            <SchemaField.Void
              x-component="Card"
              x-decorator="GridColumn"
              x-decorator-props={{ gridSpan: 2 }}>
              <SchemaField.String
                name="search-list"
                x-component="Input"
                x-component-props={{
                  allowClear: true,
                  placeholder: "输入部门或员工名称进行筛选",
                  suffix: <SearchOutlined />,
                }}
                x-decorator="CardHeader"
                x-reactions={{
                  dependencies: ["user-map#dataSource"],
                  fulfill: {
                    state: {
                      disabled: "{{ !$deps[0]?.length }}",
                    },
                  },
                }}
              />
              <SchemaField.Void name="toolbar" x-component="ToolBar">
                <SchemaField.Boolean
                  name="pick"
                  x-component="Checkbox"
                  x-reactions={[
                    {
                      dependencies: ["....#dataSource", "..section#value"],
                      fulfill: {
                        // run: "console.log('a---test', $deps)",
                        state: {
                          componentProps: {
                            checked:
                              "{{ !!$deps[0]?.length && $deps[1]?.length === $deps[0]?.length }}",
                            disabled: "{{ !$deps[0]?.length }}",
                            indeterminate:
                              "{{ !!$deps[0]?.length && !!$deps[1]?.length && $deps[1].length < $deps[0]?.length }}",
                          },
                          content: "{{ `全选 (${$deps[1]?.length || 0}/${$deps[0]?.length})` }}",
                        },
                      },
                    },
                  ]}
                />
                <SchemaField.Number
                  enum={[
                    {
                      label: (
                        <>
                          <ControlOutlined /> 手动选择
                        </>
                      ),
                      value: 0,
                    },
                    {
                      label: (
                        <>
                          <ContainerOutlined /> 全展开
                        </>
                      ),
                      value: 1,
                    },
                    {
                      label: (
                        <>
                          <DatabaseOutlined /> 全收起
                        </>
                      ),
                      value: 2,
                    },
                  ]}
                  name="expand"
                  x-component="Select"
                  x-reactions={[
                    {
                      dependencies: ["....#dataSource"],
                      fulfill: {
                        state: {
                          componentProps: {
                            disabled: "{{ !$deps[0]?.length }}",
                          },
                        },
                      },
                    },
                    {
                      effects: ["onFieldValueChange"],
                      fulfill: {
                        run: 'console.log("a----ddd", $self.value)',
                      },
                    },
                  ]}
                  x-value={0}
                />
              </SchemaField.Void>
              <SchemaField.Void
                title="最近的选择"
                x-component="RecentRhoices"
                x-component-props={{ eventName: "select-user" }}
                x-decorator="TipTitle"
                x-reactions={{
                  dependencies: [".section"],
                  fulfill: {
                    state: {
                      data: "{{ $deps[0] ?? [] }}",
                    },
                  },
                }}
              />
              <SchemaField.Void
                title="部门和同事"
                x-component="ScrollWapper"
                x-decorator="TipTitle">
                <SchemaField.Array
                  name="section"
                  x-component="SectionCollapse"
                  x-data={{
                    list: { ...defaultItem },
                  }}
                  x-reactions={[
                    {
                      dependencies: ["....#loading", "....#dataSource"],
                      fulfill: {
                        // run: "console.log('a---deps', $deps[1])",
                        state: {
                          loading: "{{ $deps[0] ?? false }}",
                          data: {
                            list: {
                              items: "{{ $deps[1] ?? [] }}",
                            },
                          },
                        },
                      },
                    },
                    {
                      dependencies: [".search-list"],
                      fulfill: {
                        state: {
                          data: {
                            search: "{{ filterSection($self.data.list.items, $deps[0]) }}",
                            searchKey: "{{ $deps[0] ?? undefined }}",
                          },
                        },
                      },
                    },
                    {
                      dependencies: ["..toolbar.pick"],
                      fulfill: {
                        // run: "console.log('a---path', $deps[0])",
                        state: {
                          value: "{{ $deps[0] ? $self.data.list.items : [] }}",
                        },
                      },
                    },
                  ]}>
                  <SchemaField.Void x-component="SectionCollapse.CollapseItem">
                    <SchemaField.Void
                      name="section-name"
                      x-component="SectionCollapse.UserCheckBox"
                      x-component-props={{ eventName: "select-user" }}
                      x-decorator="SectionCollapse.PanelDecorator">
                      <SchemaField.Void
                        x-component="SectionCollapse.UserPanel"
                        x-hidden="{{!$section}}"
                      />
                      <SchemaField.Void
                        x-component="SectionCollapse.UserFace"
                        x-hidden="{{$section}}"
                      />
                    </SchemaField.Void>
                    <SchemaField.Void name="group" x-component="SectionCollapse.UserGroup" />
                    <SchemaField.Void name="sort" x-component="SectionCollapse.SortHandle" />
                    <SchemaField.Void name="remove" x-component="SectionCollapse.Remove" />
                  </SchemaField.Void>
                  <SchemaField.Void name="skeleton" x-component="SectionCollapse.SelectSkeleton" />
                  <SchemaField.Void name="empty" x-component="SectionCollapse.SelectEmpty" />
                </SchemaField.Array>
              </SchemaField.Void>
            </SchemaField.Void>
            <SchemaField.Void
              x-component="Card"
              x-decorator="GridColumn"
              x-decorator-props={{ gridSpan: 1 }}
              x-component-props={{
                title: "已选中的人",
              }}></SchemaField.Void>
          </SchemaField.Void>
        </SchemaField.Object>
      </SchemaField>
      <code className="consumer">
        <pre>
          <FormConsumer>{form => JSON.stringify(form.values, null, 2)}</FormConsumer>
        </pre>
      </code>
    </Panel>
  );
};

export default SelectSectionExample;
