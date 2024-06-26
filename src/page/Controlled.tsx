import { FC } from "react";
import ObserverControlled from "../components/controlled/observerControlled";
import FieldControlled from "../components/controlled/observerControlled/FieldControlled";
import WithoutObserver from "../components/controlled/observerControlled/WithoutObserver";
import ClearFormGraph from "../components/controlled/schemaControlled/ClearFormGraph";
import FormControlled from "../components/controlled/schemaControlled/FormControlled";
import CustomIndex from "../components/controlled/schemaControlled/custom";
import ValueControlled from "../components/controlled/valueControlled";

const Controlled: FC = () => (
    <>
        <ValueControlled />
        <ObserverControlled />
        <FormControlled />
        <ClearFormGraph />
        <CustomIndex />
        <FieldControlled />
        <WithoutObserver />
    </>
);

export default Controlled;
