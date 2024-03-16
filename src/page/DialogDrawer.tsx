import { FC } from "react";
import DialogFieldJsx from "../components/dialog/FieldJsx";
import DialogJsonSchema from "../components/dialog/JsonSchema";
import DialogMarkupSchema from "../components/dialog/MarkupSchema";
import DrawerJsonSchema from "../components/drawer/JsonSchema";
import DrawerMarkupSchema from "../components/drawer/MarkupSchema";
import DrawerFiexdJsx from "../components/drawer/FiexdJsx";
import Test from "../components/drawer/Test";

const DialogDrawer: FC = () => (
    <>
        <DialogMarkupSchema />
        <DialogJsonSchema />
        <DialogFieldJsx />
        <DrawerMarkupSchema />
        <DrawerJsonSchema />
        <DrawerFiexdJsx />
        <Test />
    </>
);

export default DialogDrawer;
