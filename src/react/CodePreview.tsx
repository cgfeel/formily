import { FC, PropsWithChildren } from "react";

const CodePreview: FC<PropsWithChildren> = ({ children }) => (
    <code className="consumer">
        <pre>{children}</pre>
    </code>
);

export default CodePreview;
