import { Tabs, TabsProps } from "antd";
import { FC } from "react";
import FieldSelectAsync from "../components/select/fieldJsx/SelectAsync";
import FieldSelectLinker from "../components/select/fieldJsx/SelectLinker";
import FieldSelectSync from "../components/select/fieldJsx/SelectSync";
import JsonSelectAsync from "../components/select/jsonSchema/SelectAsync";
import JsonSelectLink from "../components/select/jsonSchema/SelectLink";
import JsonSelectSync from "../components/select/jsonSchema/SelectSync";
import MarkupSelectAsync from "../components/select/markupSchema/SelectAsync";
import MarkupSelectLink from "../components/select/markupSchema/SelectLinker";
import MarkupSelectSync from "../components/select/markupSchema/SelectSync";
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
            </>
        ),
    },
];

const AsyncCom: FC = () => <Tabs items={items} />;

export default AsyncCom;
