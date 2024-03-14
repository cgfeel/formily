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
        <Pannel
            footer={
                <div>
                    <p>目的只做演示，数据逻辑的混乱请忽略</p>
                    <p>
                        从这个例子可以看出，从组件<code>SchemaField</code>开始，就不再直接接受 React 组件，而是将其作为
                        <code>SchemaField</code>节点中的<code>x-component</code> 或 <code>x-decorator</code>属性参与提供
                    </p>
                    <p>
                        <code>ArrayTable.Column</code>被受控的时候<code>dataIndex</code>会覆盖<code>name</code>
                        ，作为路径查找请勿同时使用，或使用相同名称
                    </p>
                    <p>
                        在<code>ArrayTable.Column</code>中是没有“数据”概念存在的，填充的内容将会以表单组件（如：
                        <code>Input</code>）的形式将数据呈现出来，如果要展示的数据而并非表单组件，可设置
                        <code>x-pattern</code>为<code>readPretty</code>
                        ，在渲染时会以单纯数据展示且不可编辑，而提交的时候仍旧会带上
                    </p>
                    <p>
                        在查询表格的过程中，使用了一个自定义组件<code>PriceInterval</code>
                        ，和之前的组件不同的是，这是一个完全自定义的<code>antd</code>组件，其中会涉及到
                        <code>onChange</code>等一系列自定义事件处理
                    </p>
                </div>
            }
            header={<h2>查询列表</h2>}>
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
