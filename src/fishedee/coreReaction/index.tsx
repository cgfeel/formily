import { Alert } from "antd";
import { FC } from "react";
import OnInputEffectChange from "../../components/linkage/fieldChange/OnInputEffect";
import OnInputEffectReact from "../../components/linkage/fieldReact/OnInputEffect";

const CoreReaction: FC = () => (
    <>
        <Alert
            message="主动联动，在 fish 文档中展示了官方文档联动中的循环联动，更多请查看 React 部分的 schema 联动"
            type="warning"
        />
        <OnInputEffectChange />
        <Alert
            message="被动联动，在 fish 文档中展示了官方文档联动中的循环联动，更多请查看 React 部分的 schema 联动"
            type="warning"
        />
        <OnInputEffectReact />
    </>
);

export default CoreReaction;
