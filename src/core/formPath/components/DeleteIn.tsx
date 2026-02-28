import { FormPath, createForm } from "@formily/core";
import { FC, useMemo } from "react";
import { FilterFn, actionDisabled, matchEffect } from "../action/pathAction";
import Panel from "../Panel";
import SubscriptSchema from "../schema/SubscriptSchema";

const values = {
  group: [{ path: '{"aa":{"bb":{"cc":"value"}}}', text: "aa.bb.cc", read: true }],
};

const itemFilter: FilterFn = ([path, text]) => {
  try {
    const data = JSON.parse(path);
    FormPath.deleteIn(data, text);

    return [path, JSON.stringify(data)];
  } catch {
    return [];
  }
};

const validator = (value: string) => {
  try {
    JSON.parse(value);
    return "";
  } catch {
    return "不是有效 JSON";
  }
};

const DeleteIn: FC = () => {
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
    <Panel footer={<p>基于路径删除数据</p>} form={form} header={<h2>deleteIn</h2>}>
      <SubscriptSchema
        componentProps={{
          pathProps: {
            placeholder: "请手写 JSON",
          },
        }}
        reactions={{
          copy: "{{actionDisabled($self, 'CopyDisabledBtn')}}",
          remove: "{{actionDisabled($self, 'RemoveDisabledBtn')}}",
          path: {
            fulfill: {
              state: { title: "JSON" },
            },
          },
          text: {
            fulfill: {
              state: {
                title: "路径",
                validator: value => {
                  try {
                    FormPath.parse(value);
                    return "";
                  } catch {
                    return "不是有效路径";
                  }
                },
              },
            },
          },
        }}
        scope={{ actionDisabled }}
        pathValidator={validator}
      />
    </Panel>
  );
};

export default DeleteIn;
