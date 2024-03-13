import { createStyles } from "antd-style";
import { FC, useRef } from "react";
import Pannel from "./Pannel";
import QueryWrapper, { QueryWrapperInstance } from "./component/QueryWrapper";
import { getQueryList } from "./component/server";
import QueryForm from "./form";
import QueryTable from "./table";
import Tool from "./table/Tool";

const useStyles = createStyles(
    ({ prefixCls, css }) => css`
        width: 1000px;
        content: "${prefixCls}";
        & > div:not(:last-child) {
            margin-bottom: 12px;
        }
    `,
);

const QueryList: FC = () => {
    const wrappRef = useRef<QueryWrapperInstance | null>(null);
    const { styles } = useStyles();
    return (
        <Pannel>
            <QueryWrapper ref={wrappRef} service={value => getQueryList(value)}>
                <div className={styles}>
                    <QueryForm onSubmit={val => wrappRef.current?.query!(val)} />
                    <QueryTable tool={<Tool />} />
                </div>
            </QueryWrapper>
        </Pannel>
    );
};

export default QueryList;
