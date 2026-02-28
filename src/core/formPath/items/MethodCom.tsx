import { createForm } from "@formily/core";
import { FC, useMemo } from "react";
import { extraCode, fieldData } from "../action/methodAction";
import SchemaField from "../schema/SchemaPropertyField";
import InputSchema from "../schema/method/InputSchema";
import MatchAliasGroupSchema from "../schema/method/MatchAliasGroupSchema";
import NodeAppendSchema from "../schema/method/NodeAppendSchema";
import SingleSchema from "../schema/method/SingleSchema";
import SliceSchema from "../schema/method/SliceSchema";
import SpliceSchema from "../schema/method/SpliceSchema";
import SelectList, { searchEffects } from "../components/SearchList";

const defaultSelect = [
  { tips: "点路径", value: "aa.bb.cc" },
  { tips: "局部匹配", value: "aa.bb.*" },
  { tips: "分组匹配", value: "*(aa,bb,cc)" },
];

const MethodCom: FC = () => {
  const form = useMemo(
    () =>
      createForm({
        values: {
          path: "aa.bb.cc",
        },
        effects: () => {
          searchEffects(defaultSelect);
        },
      }),
    [],
  );
  return (
    <SelectList form={form} extraCode={extraCode} fieldData={fieldData}>
      <SingleSchema
        feedbackText="输出路径的完整字符串，支持匹配型路径与数据操作型路径"
        name="toString"
      />
      <SingleSchema
        feedbackText="输出路径的数组片段，仅支持数据操作型路径。文档没有及时更新，此方法名已修改"
        name="toArr"
      />
      <NodeAppendSchema feedbackText="连接数据操作型路径" name="concat" />
      <SliceSchema />
      <NodeAppendSchema feedbackText="往数据操作路径推入某个片段路径" name="push" />
      <SingleSchema feedbackText="从数据操作路径中弹出最后一个 key" name="pop" />
      <SpliceSchema />
      <SingleSchema feedbackText="遍历数据操作路径" name="forEach" />
      <SingleSchema feedbackText="循环映射数据操作路径" name="map" />
      <SingleSchema
        feedbackText="reduce 方法法对路径中的每个元素执行一个由您提供的 reducer 函数(升序执行)，将其结果汇总为单个返回值。"
        name="reduce"
      />
      <SingleSchema feedbackText="获取当前数据操作路径的父级路径" name="parent" />
      <InputSchema
        defaultValue="aa.bb"
        feedbackText="用于判断给定数据操作路径是否为当前数据操作路径的子路径，检测的路径可以是匹配路径语法，但子路径不可以是匹配路径语法。includes 和 match (动态方法) 的区别在于 includes 只适用于用匹配路径去匹配数据路径，反之报错"
        inputTitle="子路径"
        name="includes"
      />
      <SingleSchema feedbackText="基于正则提取数据做路径拼装" name="transform" />
      <InputSchema
        defaultValue="aa.*.cc"
        feedbackText="使用路径匹配语法匹配当前路径，匹配的路径至少有一个是数据路径，虽然 match 支持匹配或被匹配路径任意一个可以包含 *，但在开发过程中建议将解析参数为匹配路径，匹配参数为数据路径，否则在开发环境下 match 只有第一次响应是正确的"
        inputTitle="子路径"
        name="match"
      />
      <MatchAliasGroupSchema />
      <InputSchema
        defaultValue='{ "aa": { "bb": { "cc": "value" } } }'
        feedbackText="基于当前路径判断指定数据是否存在"
        inputTitle="手写 JSON"
        name="existIn"
      />
      <InputSchema
        defaultValue='{ "aa": { "bb": { "cc": "value" } } }'
        feedbackText="基于当前路径获取指定数据"
        inputTitle="手写 JSON"
        name="getIn"
      />
      <InputSchema
        defaultValue="{}"
        feedbackText="基于当前路径更新指定数据，还有一个静态方法 FormPath.setIn，区别在于 setIn 用于给路径赋值，静态方法用于给一个对象赋予 address 和 data，使 target 成为一个 FormPath 对象。"
        inputTitle="手写 JSON"
        name="setIn"
      >
        <SchemaField.String
          default="value"
          name="setIn-value"
          title="赋值"
          x-component="Input"
          x-decorator="FormItem"
        />
      </InputSchema>
      <InputSchema
        defaultValue='{ "aa": { "bb": { "cc": "value" } } }'
        feedbackText="基于当前路径删除指定数据"
        inputTitle="手写 JSON"
        name="deleteIn"
      />
      <InputSchema
        defaultValue='{ "aa": { "bb": { "cc": "value" } } }'
        feedbackText="确保某个路径下必须有数据，如果没有则创建数据"
        inputTitle="手写 JSON"
        name="ensureIn"
      />
      <InputSchema
        defaultValue="{}"
        feedbackText="确保某个路径下必须有数据，如果没有则创建数据，目前来看和 setIn 无差"
        inputTitle="手写 JSON"
        name="ensureIn"
      >
        <SchemaField.String
          default="value"
          name="ensureIn-value"
          title="赋值"
          x-component="Input"
          x-decorator="FormItem"
        />
      </InputSchema>
    </SelectList>
  );
};

export default MethodCom;
