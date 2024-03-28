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
import SelectInput from "../components/select/contrast/SelectInput";
import SelectInputScope from "../components/select/contrast/SelectInputScope";
import SelectLoader from "../components/select/contrast/SelectLoader";
import SelectScope from "../components/select/contrast/SelectScope";
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
                <SelectLoader />
                <SelectInput />
                <MarkupSelectAsync
                    footer={
                        <p>
                            除了 <code>{"field.query({path}).value()"}</code> 添加依赖响应之外，还可以创建一个{" "}
                            <code>observable.ref</code>{" "}
                            对象，在被动联动模式中使用依赖响应对象，当响应对象的值更新后，也会再次出发响应操作
                        </p>
                    }
                    header={
                        <h2>
                            通过 <code>observable.ref</code> 创建引用劫持响应式对象
                        </h2>
                    }
                />
                <SelectScope />
                <SelectInputScope />
            </>
        ),
    },
];

const AsyncCom: FC = () => <Tabs items={items} />;

export default AsyncCom;
