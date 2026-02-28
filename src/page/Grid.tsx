import { FC } from "react";
import GridCom from "../components/grid";
import Markup from "../components/grid/schema/Markup";
import Json from "../components/grid/schema/Json";
import Fold from "../components/grid/Fold";

const Grid: FC = () => (
  <>
    <Markup />
    <Json />
    <GridCom />
    <Fold />
  </>
);

export default Grid;
