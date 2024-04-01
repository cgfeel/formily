import { Tabs, TabsProps } from "antd";
import { FC } from "react";
import ChangeAsyncEffect from "../components/linkage/fieldChange/AsyncEffect";
import ChangeAsyncSchema from "../components/linkage/fieldChange/AsyncSchema";
import ChangeChainEffect from "../components/linkage/fieldChange/ChainEffect";
import ChangeChainSchema from "../components/linkage/fieldChange/ChainSchema";
import ChangeLinkEffect from "../components/linkage/fieldChange/LinkEffect";
import ChangeLinkSchema from "../components/linkage/fieldChange/LinkSchma";
import ChangeManyEffect from "../components/linkage/fieldChange/ManyEffect";
import ChangeManySchema from "../components/linkage/fieldChange/ManySchema";
import ChangeOneEffect from "../components/linkage/fieldChange/OneEffect";
import ChangeOneSchema from "../components/linkage/fieldChange/OneSchema";
import ChangeOnInputEffect from "../components/linkage/fieldChange/OnInputEffect";
import ChangeOnInputSchema from "../components/linkage/fieldChange/OnInputSchema";
import ChangeSelfEffect from "../components/linkage/fieldChange/SelfEffect";
import ChangeSelfSchema from "../components/linkage/fieldChange/SelfSchema";

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
                <ChangeOnInputEffect />
                <ChangeOnInputSchema />
                <ChangeSelfEffect />
                <ChangeSelfSchema />
                <ChangeAsyncEffect />
                <ChangeAsyncSchema />
            </>
        ),
    },
];

const LinkAges: FC = () => <Tabs items={items} />;

export default LinkAges;
