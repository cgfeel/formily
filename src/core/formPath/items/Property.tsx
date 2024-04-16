import { FC } from "react";
import SelectList from "../components/SearchList";
import SingleSchema from "../schema/method/SingleSchema";

const defaultSelect = [
    { tips: "点路径", value: "aa.bb.cc" },
    { tips: "局部匹配", value: "aa.bb.*" },
    { tips: "分组匹配", value: "*(aa,bb,cc)" },
];

const Property: FC = () => (
    <SelectList defaultSelect={defaultSelect}>
        <SingleSchema feedbackText="如果路径为非匹配型路径，则可以读取路径的长度" name="length" />
    </SelectList>
);

export default Property;
