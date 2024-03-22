import { FormItem, Input } from "@formily/antd-v5";
import { createForm } from "@formily/core";
import { Field } from "@formily/react";
import { FC } from "react";
import Panel from "./Panel";
import { createStyles, css } from "antd-style";

const form = createForm();
const useStyles = createStyles(css`
    width: 240px;
`);

const FieldJsx: FC = () => {
    const { styles } = useStyles();
    return (
        <Panel
            form={form}
            header={
                <h2>
                    通过<code>Field Jsx</code>创建 <code>FormItem</code>
                </h2>
            }>
            <Field
                description="提示信息"
                name="name"
                title="输入框"
                component={[Input, { className: styles }]}
                decorator={[FormItem]}
                required
            />
        </Panel>
    );
};

export default FieldJsx;
