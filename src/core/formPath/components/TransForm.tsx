import { FormPath, createForm } from "@formily/core";
import { createStyles, css } from "antd-style";
import { FC, useMemo } from "react";
import Panel from "../Panel";
import { FilterFn, actionDisabled, checkDataPath, matchEffect } from "../action/pathAction";
import SchemaField from "../schema/SchemaField";
import SubscriptSchema from "../schema/SubscriptSchema";

const values = {
  group: [{ path: "aa.0.bb", text: "\\d+", read: true }],
};

const useStyles = createStyles(css`
  padding-left: 24px;
  padding-right: 66px;
`);

const itemFilter: FilterFn = ([path, text, field]) => {
  const flags = field?.query(".flags").value();
  const regex = new RegExp(text, Array.isArray(flags) ? flags.join("") : "");

  let value = "";
  try {
    FormPath.transform(path, regex, (...args) => {
      value = args.join();
    });

    field?.setState({ title: "匹配值" });
    return [path, value];
  } catch {
    return [];
  }
};

const TransForm: FC = () => {
  const { styles } = useStyles();
  const form = useMemo(
    () =>
      createForm({
        values,
        effects: () => {
          matchEffect(itemFilter);
        },
      }),
    [],
  );
  return (
    <Panel footer={<p>正则转换路径，不支持匹配路径</p>} form={form} header={<h2>transform</h2>}>
      <SubscriptSchema
        items={
          <SchemaField.String
            name="flags"
            title="修饰符"
            x-component="Select"
            x-decorator="FormItem"
            enum={[
              { label: "g", value: "g" },
              { label: "i", value: "i" },
              { label: "m", value: "m" },
              { label: "s", value: "s" },
            ]}
            x-component-props={{
              mode: "multiple",
            }}
            x-decorator-props={{
              className: styles,
            }}
            x-reactions={{
              dependencies: [".read"],
              fulfill: {
                state: {
                  pattern: "{{$deps[0] ? 'disabled' : 'editable'}}",
                },
              },
            }}
          />
        }
        reactions={{
          copy: "{{actionDisabled($self, 'CopyDisabledBtn')}}",
          remove: "{{actionDisabled($self, 'RemoveDisabledBtn')}}",
          text: {
            fulfill: {
              state: {
                title: "正则",
              },
            },
          },
        }}
        scope={{ actionDisabled }}
        pathValidator={checkDataPath}
      />
    </Panel>
  );
};

export default TransForm;
