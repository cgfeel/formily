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
import ReactAsyncEffect from "../components/linkage/fieldReact/AsyncEffect";
import ReactAsyncSchema from "../components/linkage/fieldReact/AsyncSchema";
import ReactChainEffect from "../components/linkage/fieldReact/ChainEffect";
import ReactChainSchema from "../components/linkage/fieldReact/ChainSchema";
import ReactLinkEffect from "../components/linkage/fieldReact/LinkEffect";
import ReactLinkSchema from "../components/linkage/fieldReact/LinkSchema";
import ReactManyEffect from "../components/linkage/fieldReact/ManyEffect";
import ReactManySchema from "../components/linkage/fieldReact/ManySchema";
import ReactOneEffect from "../components/linkage/fieldReact/OneEffect";
import ReactOneSchema from "../components/linkage/fieldReact/OneSchema";
import ReactOnInputEffect from "../components/linkage/fieldReact/OnInputEffect";
import ReactOnInputSchema from "../components/linkage/fieldReact/OnInputSchema";
import ReactSelfEffect from "../components/linkage/fieldReact/SelfEffect";
import ReactSelfSchema from "../components/linkage/fieldReact/SelfSchema";

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
  {
    key: "field-react",
    label: "被动模式",
    children: (
      <>
        <ReactOneEffect />
        <ReactOneSchema />
        <ReactManyEffect />
        <ReactManySchema />
        <ReactLinkEffect />
        <ReactLinkSchema />
        <ReactChainEffect />
        <ReactChainSchema />
        <ReactOnInputEffect />
        <ReactOnInputSchema />
        <ReactSelfEffect />
        <ReactSelfSchema />
        <ReactAsyncEffect />
        <ReactAsyncSchema />
      </>
    ),
  },
];

const LinkAges: FC = () => <Tabs items={items} />;

export default LinkAges;
