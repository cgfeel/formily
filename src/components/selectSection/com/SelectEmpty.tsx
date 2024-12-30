import { Empty } from "antd";
import { createStyles, css } from "antd-style";
import { FC } from "react";

const useStyle = createStyles(css`
    padding: 130px 0;
    text-align: center;
    width: 100%;
`);

const SelectEmpty: FC = () => {
    const { styles } = useStyle();
    return (
        <div className={styles}>
            <Empty description="暂无数据" />
        </div>
    );
};

export default SelectEmpty;
