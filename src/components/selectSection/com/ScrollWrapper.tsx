import { FC, PropsWithChildren } from "react";
import { ScrollWapperStyleProps, useScrollWapperStyle } from "../hooks/useStyle";

const ScrollWapper: FC<PropsWithChildren<ScrollWapperStyleProps>> = ({ children, ...props }) => {
    const { styles } = useScrollWapperStyle(props);
    return <div className={styles}>{children}</div>;
};

export default ScrollWapper;
