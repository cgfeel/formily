import { createStyles, css } from "antd-style";
import { FC, PropsWithChildren, ReactNode } from "react";

const useStyles = createStyles(css`
    .as-actions {
        & button {
            background-color: #fff;
            border: 2px solid #d4bbbb;
            border-radius: 6px;
            cursor: pointer;
            margin-right: 5px;
            padding: 8px 20px;
            outline: none;
            transition: all 0.15s ease-in-out;
            &:hover {
                border-color: #9db8f3;
            }
        }
    }
    .as-response {
        border: 2px dashed #f0bdbd;
        border-radius: 6px;
        font-size: 14px;
        margin-top: 10px;
        padding: 8px 20px;
    }
`);

const ActionResponse: FC<PropsWithChildren<ActionResponseProps>> = ({ children, response }) => {
    const { styles } = useStyles();
    return (
        <div className={styles}>
            <div className="as-actions">{children}</div>
            {response && <div className="as-response">Response: {response}</div>}
        </div>
    );
};

export interface ActionResponseProps {
    response?: ReactNode;
}

export default ActionResponse;
