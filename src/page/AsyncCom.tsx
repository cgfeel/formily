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
        key: "json-schema",
        label: "Json Schema",
        children: (
            <>
                <JsonSelectSync />
            </>
        ),
    },
];

const AsyncCom: FC = () => <Tabs items={items} />;

export default AsyncCom;
