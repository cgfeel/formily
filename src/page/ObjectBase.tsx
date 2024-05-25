import { FC } from "react";
import ObjectBaseExample from "../components/objectBase";
import Logic from "../components/objectBase/Logic";
import NoAction from "../components/objectBase/NoAction";
import NoOps from "../components/objectBase/NoOps";

const ObjectBase: FC = () => (
    <>
        <ObjectBaseExample />
        <NoOps />
        <NoAction />
        <Logic />
    </>
);

export default ObjectBase;
