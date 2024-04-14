import { FC } from "react";
import Deconstruct from "../components/Deconstruct";
import Dot from "../components/Dot";
import Relative from "../components/Relative";
import Subscript from "../components/Subscript";

const DataPath: FC = () => (
    <>
        <Dot />
        <Subscript />
        <Deconstruct />
        <Relative />
    </>
);

export default DataPath;
