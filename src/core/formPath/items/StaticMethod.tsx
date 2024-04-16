import { FC } from "react";
import DeleteIn from "../components/DeleteIn";
import EnsureIn from "../components/EnsureIn";
import ExistIn from "../components/ExistIn";
import GetIn from "../components/GetIn";
import Match from "../components/Match";
import Parse from "../components/Parse";
import SetIn from "../components/SetIn";
import TransForm from "../components/TransForm";

const StaticMethod: FC = () => (
    <>
        <Match />
        <TransForm />
        <Parse />
        <GetIn />
        <SetIn />
        <DeleteIn />
        <ExistIn />
        <EnsureIn />
    </>
);

export default StaticMethod;
