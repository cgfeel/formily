import { observer, useField } from "@formily/react";
import { FC, PropsWithChildren } from "react";

const ToolBar: FC<PropsWithChildren> = ({ children }) => {
    const field = useField();
    return (
        <>
            {children}
            {field.data && <>({field.data})</>}
        </>
    );
};

export default observer(ToolBar);
