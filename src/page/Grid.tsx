import { FC } from "react";
import GridCom from "../components/grid";
import Fold from "../components/grid/Fold";
import Json from "../components/grid/schema/Json";
import Markup from "../components/grid/schema/Markup";

const Grid: FC = () => (
  <>
    <Markup />
    <Json />
    <GridCom />
    <Fold />
  </>
);

export default Grid;
