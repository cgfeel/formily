import { Button, Input, InputProps } from "antd";
import { createStyles } from "antd-style";
import { FC, useRef, useState } from "react";

const useStyles = createStyles({
    codeWrapper: {
        alignItems: "center",
        color: "#999",
        display: "flex",
        flexShrink: 0,
        height: 35,
        justifyContent: "center",
        width: 100,
    },
    input: {
        marginRight: 5,
    },
    wrapper: {
        alignItems: "center",
        display: "inline-flex",
        width: "100%",
    },
});

const VerifyCode: FC<VerifyCodeProps> = ({ className, phoneNumber, readyPost, ...props }) => {
    const [lastTime, setLastTime] = useState(0);
    const { styles, cx } = useStyles();

    const countRef = useRef({
        end: 0,
        action(limit: number = 0) {
            const now = Date.now();
            if (limit > 0) this.end = now + limit;

            setLastTime(now);
            this.end - now > 0 &&
                setTimeout(() => {
                    countRef.current.action();
                }, 1000);
        },
    });

    const now = countRef.current.end - lastTime;
    return (
        <div className={styles.wrapper}>
            <Input {...props} className={cx(styles.input, className)} />
            <div className={styles.codeWrapper}>
                {now > 0 ? (
                    <span>剩余{Math.ceil(now / 1000)}秒</span>
                ) : (
                    <Button
                        disabled={!readyPost}
                        onClick={() => {
                            countRef.current.action(20 * 1000);
                            if (phoneNumber) {
                                console.log(`post code by phone number ${phoneNumber}`);
                            }
                        }}
                        block>
                        发送验证码
                    </Button>
                )}
            </div>
        </div>
    );
};

export interface VerifyCodeProps extends InputProps {
    phoneNumber?: number;
    readyPost?: boolean;
}

export default VerifyCode;
