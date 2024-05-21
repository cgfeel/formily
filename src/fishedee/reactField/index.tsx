import { FC } from "react";
import ArrayFieldCom from "../../react/components/arrayField";
import ArrayRenderProps from "../../react/components/arrayField/RenderProps";
import ObjectFieldCom from "../../react/components/objectField";
import ObjectRenderProps from "../../react/components/objectField/RenderProps";
import BaseField from "./BaseField";
import ChildrenRender from "./childrenRender";

const ReactField: FC = () => (
    <>
        <BaseField />
        <ArrayFieldCom />
        <ArrayRenderProps />
        <ObjectFieldCom />
        <ObjectRenderProps />
        <ChildrenRender />
    </>
);

export default ReactField;
