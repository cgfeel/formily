import { FC } from "react";
import CustomCard from "../components/custom/CustomCard";
import IDcard from "../components/custom/IDcard";
import PriceInterval from "../components/custom/PriceInterval";

const Custom: FC = () => (
    <>
        <IDcard />
        <PriceInterval />
        <CustomCard />
    </>
);

export default Custom;
