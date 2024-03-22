import {
    Cascader,
    DatePicker,
    FormItem,
    Input,
    NumberPicker,
    Radio,
    Select,
    Switch,
    TreeSelect,
} from "@formily/antd-v5";
import { FC } from "react";

const Title: FC<{ text: string }> = ({ text }) => <h3>{text}</h3>;

const ComponentIndex = {
    Cascader,
    DatePicker,
    FormItem,
    Input,
    NumberPicker,
    Radio,
    Select,
    Switch,
    Title,
    TreeSelect,
};

export default ComponentIndex;
