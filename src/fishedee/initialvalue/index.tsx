import { FC } from "react";
import Panel from "../Panel";
import HasInitialvalue from "./HasInitialvalue";
import HasValue from "./HasValue";
import NoInitialvalue from "./NoInitialvalue";
import NoValue from "./NoValue";
import OnInput from "./OnInput";
import OnInputValue from "./OnInputValue";
import { createStyles, css } from "antd-style";

const useStyles = createStyles(css`
    button {
        margin-right: 10px;
    }
`);

const TimeValue: FC = () => {
    const { styles } = useStyles();
    return (
        <Panel
            className={styles}
            footer={
                <div>
                    <p>触发函数影响的值：</p>
                    <ul>
                        <li>
                            <p>
                                <code>setInitialValue</code>
                            </p>
                            <ul>
                                <li>
                                    没有 <code>input</code>：<code>initialValue</code>、<code>value</code>
                                </li>
                                <li>
                                    有 <code>input</code>：<code>initialValue</code>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <code>setValue</code>：<code>values</code>
                        </li>
                        <li>
                            <code>onInput</code>：<code>values</code>
                        </li>
                    </ul>
                    <p>触发函数和监听函数：</p>
                    <ul>
                        <li>
                            <p>
                                <code>setInitialValue</code>
                            </p>
                            <ul>
                                <li>
                                    没有 <code>input</code>：① <code>onFieldInitialValueChange</code>、②{" "}
                                    <code>onFieldValueChange</code>
                                </li>
                                <li>
                                    有 <code>input</code>：<code>onFieldInitialValueChange</code>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <code>setValue</code>：<code>onFieldValueChange</code>
                        </li>
                        <li>
                            <code>onInput</code>：① <code>onFieldInputValueChange</code>、②{" "}
                            <code>onFieldValueChange</code>
                        </li>
                    </ul>
                    <p>
                        备注：<code>setValues</code> 后需要重置表单为 <code>initialvalue</code>，一定要先创建字段，否则{" "}
                        <code>reset</code> 没有变化
                    </p>
                </div>
            }
            header={<h2>core.1.2-1.4：初始值理解的补充</h2>}>
            <NoValue />
            <HasValue />
            <OnInput />
            <NoInitialvalue />
            <HasInitialvalue />
            <OnInputValue />
        </Panel>
    );
};

export default TimeValue;
