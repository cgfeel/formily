import { observer } from "@formily/react";
import { FC } from "react";

const CodePretty: FC<CodePrettyProps> = ({ value }) => (
    <code>
        <pre>{value}</pre>
    </code>
);

export interface CodePrettyProps {
    value: string;
}

export default observer(CodePretty);
