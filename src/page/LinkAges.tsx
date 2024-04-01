import { Tabs, TabsProps } from "antd";
import { FC } from "react";
import ChangeChainEffect from "../components/linkage/fieldChange/ChainEffect";
import ChangeChainSchema from "../components/linkage/fieldChange/ChainSchema";
import ChangeLinkEffect from "../components/linkage/fieldChange/LinkEffect";
import ChangeLinkSchema from "../components/linkage/fieldChange/LinkSchma";
import ChangeManyEffect from "../components/linkage/fieldChange/ManyEffect";
import ChangeManySchema from "../components/linkage/fieldChange/ManySchema";
import ChangeOneEffect from "../components/linkage/fieldChange/OneEffect";
import ChangeOneSchema from "../components/linkage/fieldChange/OneSchema";
const items: TabsProps["items"] = [
    {
        key: "field-change",
        label: "主动模式",
        children: (
            <>
                <ChangeOneEffect />
                <ChangeOneSchema />
                <ChangeManyEffect />
                <ChangeManySchema />
                <ChangeLinkEffect />
                <ChangeLinkSchema />
                <ChangeChainEffect />
                <ChangeChainSchema />
            </>
        ),
    },
];

const LinkAges: FC = () => <Tabs items={items} />;

export default LinkAges;
