import { FC } from "react";
import DeconstructMatch from "../components/DeconstructMatch";
import ExtendMatch from "../components/ExtendMatch";
import FullMatch from "../components/FullMatch";
import GroupMatch from "../components/GroupMatch";
import PartialMatch from "../components/PartialMatch";
import RangeMatch from "../components/RangeMatch";
import ReverseMatch from "../components/ReverseMatch";
import TransferredMatch from "../components/TransferredMatch";

const MatchPath: FC = () => (
  <>
    <FullMatch />
    <PartialMatch />
    <GroupMatch />
    <ReverseMatch />
    <ExtendMatch />
    <RangeMatch />
    <TransferredMatch />
    <DeconstructMatch />
  </>
);

export default MatchPath;
