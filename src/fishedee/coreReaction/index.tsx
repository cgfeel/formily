import { Alert } from "antd";
import { FC } from "react";
import OnInputEffectChange from "../../components/linkage/fieldChange/OnInputEffect";
import OnInputEffectReact from "../../components/linkage/fieldReact/OnInputEffect";

const CoreReaction: FC = () => (
  <>
    <Alert
      message="主动联动，在 fish 中展示了官方文档中的循环联动，更多请查看 React 部分的 schema 联动 - 官方"
      type="warning"
    />
    <OnInputEffectChange />
    <Alert
      message="被动联动，在 fish 中展示了官方文档中的循环联动，更多请查看 React 部分的 schema 联动 - 官方"
      type="warning"
    />
    <OnInputEffectReact />
  </>
);

export default CoreReaction;
