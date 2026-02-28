import { Tabs, TabsProps } from "antd";
import { FC } from "react";
import FieldCascaderAsync from "../components/cascader/fieldJsx/CascaderAsync";
import FieldCascaderLinker from "../components/cascader/fieldJsx/CascaderLinker";
import FieldCascaderSync from "../components/cascader/fieldJsx/CascaderSync";
import JsonCascaderAsync from "../components/cascader/jsonSchema/CascaderAsync";
import JsonCascaderLinker from "../components/cascader/jsonSchema/CascaderLinker";
import JsonCascaderSync from "../components/cascader/jsonSchema/CascaderSync";
import MarkupCascaderAsync from "../components/cascader/markupSchema/CascaderAsync";
import MarkupCascaderLinker from "../components/cascader/markupSchema/CascaderLinker";
import MarkupCascaderSync from "../components/cascader/markupSchema/CascaderSync";
import FieldSelectAsync from "../components/select/fieldJsx/SelectAsync";
import FieldSelectLinker from "../components/select/fieldJsx/SelectLinker";
import FieldSelectSync from "../components/select/fieldJsx/SelectSync";
import JsonSelectAsync from "../components/select/jsonSchema/SelectAsync";
import JsonSelectLink from "../components/select/jsonSchema/SelectLink";
import JsonSelectSync from "../components/select/jsonSchema/SelectSync";
import MarkupSelectAsync from "../components/select/markupSchema/SelectAsync";
import MarkupSelectLink from "../components/select/markupSchema/SelectLinker";
import MarkupSelectSync from "../components/select/markupSchema/SelectSync";
import FieldTreeSelectAsync from "../components/treeSelect/fieldJsx/TreeSelectAsync";
import FieldTreeSelectLinker from "../components/treeSelect/fieldJsx/TreeSelectLinker";
import FieldTreeSelectSync from "../components/treeSelect/fieldJsx/TreeSelectSync";
import JsonTreeSelectAsync from "../components/treeSelect/jsonSchema/TreeSelectAsync";
import JsonTreeSelectLinker from "../components/treeSelect/jsonSchema/TreeSelectLinker";
import JsonTreeSelectSync from "../components/treeSelect/jsonSchema/TreeSelectSync";
import MarkupTreeSelectAsync from "../components/treeSelect/markupSchema/TreeSelectAsync";
import MarkupTreeSelectLinker from "../components/treeSelect/markupSchema/TreeSelectLinker";
import MarkupTreeSelectSync from "../components/treeSelect/markupSchema/TreeSelectSync";
import Select from "../components/select";

const items: TabsProps["items"] = [
  {
    key: "select",
    label: "Select",
    children: (
      <>
        <MarkupSelectSync />
        <MarkupSelectAsync />
        <MarkupSelectLink />
        <JsonSelectSync />
        <JsonSelectAsync />
        <JsonSelectLink />
        <FieldSelectSync />
        <FieldSelectAsync />
        <FieldSelectLinker />
      </>
    ),
  },
  {
    key: "tree-select",
    label: "TreeSelect",
    children: (
      <>
        <MarkupTreeSelectSync />
        <MarkupTreeSelectAsync />
        <MarkupTreeSelectLinker />
        <JsonTreeSelectSync />
        <JsonTreeSelectAsync />
        <JsonTreeSelectLinker />
        <FieldTreeSelectSync />
        <FieldTreeSelectAsync />
        <FieldTreeSelectLinker />
      </>
    ),
  },
  {
    key: "cascader",
    label: "Cascader",
    children: (
      <>
        <MarkupCascaderSync />
        <MarkupCascaderAsync />
        <MarkupCascaderLinker />
        <JsonCascaderSync />
        <JsonCascaderAsync />
        <JsonCascaderLinker />
        <FieldCascaderSync />
        <FieldCascaderAsync />
        <FieldCascaderLinker />
      </>
    ),
  },
  {
    key: "contrast",
    label: "Contrast",
    children: (
      <>
        <Select />
      </>
    ),
  },
];

const AsyncCom: FC = () => <Tabs items={items} />;

export default AsyncCom;
