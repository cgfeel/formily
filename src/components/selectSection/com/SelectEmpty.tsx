import { Empty, EmptyProps } from "antd";
import { createStyles, css } from "antd-style";
import { FC } from "react";

const useStyle = createStyles(css`
    padding: 130px 0;
    text-align: center;
    width: 100%;
`);

const SelectEmpty: FC<EmptyProps> = ({ description = "暂无数据", ...props }) => {
    const { styles } = useStyle();
    return (
        <div className={styles}>
            <Empty {...props} description={description} />
        </div>
    );
};

export default SelectEmpty;
