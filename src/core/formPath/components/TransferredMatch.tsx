import { FormPath, createForm, onFieldInit } from "@formily/core";
import { FC, useMemo } from "react";
import Panel from "../Panel";
import { FilterFn, actionDisabled, checkMatchPath, matchEffect } from "../action/pathAction";
import SubscriptSchema from "../schema/SubscriptSchema";

const values = {
  group: [
    { path: "aa.\\,\\*\\{\\}\\.\\(\\).bb", text: "aa.\\,\\*\\{\\}\\.\\(\\).bb", read: true },
    { path: "aa.[[,*{}.()]].bb", text: "aa.[[,*{}.()]].bb", read: true },
  ],
};

const itemFilter: FilterFn = ([path, text]) => {
  return "" !== validator(path) || !text
    ? []
    : [path, FormPath.parse(path).match(text) ? "true" : "false"];
};

const validator = (value: string) => {
  return value.indexOf("\\") < 0 && !/\[\[.*\]\]/.test(value) ? "缺少转义符" : "";
};

const TransferredMatch: FC = () => {
  const form = useMemo(
    () =>
      createForm({
        values,
        effects: () => {
          matchEffect(itemFilter);
          onFieldInit("group.*.text", checkMatchPath);
        },
      }),
    [],
  );
  return (
    <Panel
      footer={
        <div>
          <p>
            对于路径节点中包含关键字的，我们可以使用转义语法匹配，语法 <code>\\</code> 或者{" "}
            <code>[[]]</code>。第一个例子中由于渲染过程中自动转码所以看到只有单个斜杆 <code>\</code>
          </p>
          <p>
            除了使用转义符号去匹配带有通配符 <code>*</code> 的路径之外，匹配路径只能使用数据路径语法
          </p>
        </div>
      }
      form={form}
      header={<h2>转义匹配</h2>}
    >
      <SubscriptSchema
        reactions={{
          copy: "{{actionDisabled($self, 'CopyDisabledBtn')}}",
          remove: "{{actionDisabled($self, 'RemoveDisabledBtn')}}",
        }}
        scope={{ actionDisabled }}
        pathValidator={validator}
      />
    </Panel>
  );
};

export default TransferredMatch;
