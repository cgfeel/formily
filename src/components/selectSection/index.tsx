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
        <SchemaField.Object
          name="user-map"
          x-component="UserMapRecord"
          x-component-props={{
            theme: {
              components: {
                Select: {
                  selectorBg: "transparent",
                },
              },
              token: { boxShadowTertiary: "none" },
            },
          }}>
          <SchemaField.Void x-component="Row" x-component-props={{ className: "row-border" }}>
            <SchemaField.Void
              x-component="Card"
              x-component-props={{ bordered: false }}
              x-decorator="Col"
              x-decorator-props={{ span: 16 }}>
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
                          content:
                            "{{ '全选 (' + ($deps[1]?.length ?? 0) + '/' + ($deps[0]?.length ?? 0) + ')' }}",
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
                      dependencies: ["....#dataSource", "..search-list#value"],
                      fulfill: {
                        state: {
                          componentProps: {
                            disabled: "{{ !$deps[0]?.length || !!$deps[1] }}",
                          },
                        },
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
                    search: { ...defaultItem },
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
                      dependencies: [".search-list#value"],
                      when: "{{ !!$deps[0] && $deps[0] !== $self.data.searchKey }}",
                      fulfill: {
                        // run: 'console.log("a----eee", $deps)',
                        state: {
                          data: {
                            search:
                              "{{ filterSection($self.data.list.items, $deps[0], $deps[1]) }}",
                            searchKey: "{{ $deps[0] }}",
                          },
                        },
                      },
                    },
                    {
                      dependencies: [".search-list#value", "..toolbar.expand#value"],
                      when: "{{ !$deps[0] }}",
                      fulfill: {
                        // run: 'console.log("a----ddd", $deps)',
                        state: {
                          data: {
                            list: "{{ expandSection($self.data.list, $deps[1]) }}",
                            searchKey: "",
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
                  <SchemaField.Void
                    x-component="SectionCollapse.CollapseItem"
                    x-component-props={{ target: "user-map.expand" }}>
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
                    <SchemaField.Void
                      name="sort"
                      x-component="SectionCollapse.SortHandle"
                      x-component-props={{ className: "sort-handle" }}
                    />
                  </SchemaField.Void>
                  <SchemaField.Void name="skeleton" x-component="SectionCollapse.SelectSkeleton" />
                  <SchemaField.Void name="empty" x-component="SectionCollapse.SelectEmpty" />
                </SchemaField.Array>
              </SchemaField.Void>
            </SchemaField.Void>
            <SchemaField.Void
              x-component="Card"
              x-decorator="Col"
              x-decorator-props={{ span: 8 }}
              x-component-props={{
                bordered: false,
                title: "已选中的人",
              }}
              x-reactions={{
                dependencies: ["user-map.section#value"],
                when: "{{ !!$deps[0]?.length }}",
                fulfill: {
                  state: {
                    componentProps: {
                      title: "{{ '已选中的人 (' + ($deps[0]?.length ?? 0) + ')' }}",
                    },
                  },
                },
                otherwise: {
                  state: {
                    componentProps: {
                      title: "已选中的人",
                    },
                  },
                },
              }}>
              <SchemaField.String
                name="search-section-list"
                x-component="Input"
                x-component-props={{
                  allowClear: true,
                  placeholder: "筛选已选择",
                  suffix: <SearchOutlined />,
                }}
                x-decorator="CardHeader"
                x-reactions={{
                  dependencies: ["user-map.section#value"],
                  fulfill: {
                    state: {
                      disabled: "{{ !$deps[0]?.length }}",
                    },
                  },
                }}
              />
              <SchemaField.Void
                x-component="ScrollWapper"
                x-component-props={{
                  minHeight: 539,
                }}
                x-decorator="TipTitle"
                x-pattern="readPretty">
                <SchemaField.Array
                  name="section"
                  x-component="SectionCollapse"
                  x-data={{
                    list: { ...defaultItem },
                    search: { ...defaultItem },
                  }}
                  x-reactions={[
                    {
                      dependencies: ["user-map.section#value", "user-map.section#data.list.expand"],
                      fulfill: {
                        // run: "console.log('a---deps-map', $deps[0])",
                        state: {
                          data: {
                            list: {
                              expand: "{{ $deps[1] }}",
                              items: "{{ $deps[0] ?? [] }}",
                            },
                          },
                        },
                      },
                    },
                    {
                      dependencies: [".search-section-list#value"],
                      when: "{{ !!$deps[0] && $deps[0] !== $self.data.searchKey }}",
                      fulfill: {
                        // run: 'console.log("a----eee", $deps)',
                        state: {
                          data: {
                            search:
                              "{{ filterSection($self.data.list.items, $deps[0], $deps[1]) }}",
                            searchKey: "{{ $deps[0] }}",
                          },
                        },
                      },
                    },
                    {
                      dependencies: [".search-section-list#value"],
                      when: "{{ !$deps[0] }}",
                      fulfill: {
                        state: {
                          data: {
                            list: "{{ expandSection($self.data.list, $deps[1]) }}",
                            searchKey: "",
                          },
                        },
                      },
                    },
                  ]}>
                  <SchemaField.Void
                    x-component="SectionCollapse.CollapseItem"
                    x-component-props={{ target: "user-map.expand" }}>
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
                    <SchemaField.Void
                      name="remove"
                      x-component="SectionCollapse.Remove"
                      x-component-props={{ className: "remove-item" }}
                    />
                  </SchemaField.Void>
                  <SchemaField.Void name="skeleton" x-component="SectionCollapse.SelectSkeleton" />
                  <SchemaField.Void name="empty" x-component="SectionCollapse.SelectEmpty" />
                </SchemaField.Array>
              </SchemaField.Void>
            </SchemaField.Void>
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
