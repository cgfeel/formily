import { Form, createEffectHook } from "@formily/core";
import { IProviderProps, useFormEffects } from "@formily/react";
import { createStyles, css } from "antd-style";
import { FC, PropsWithChildren, createContext, useState } from "react";
import Line from "./Line";

const FormActionContext = createContext<FormActionContextInstance>({} as FormActionContextInstance);
const useStyles = createStyles(css`
    button + button {
        margin-left: 10px;
    }
`);

const onMountField = createEffectHook("mount-field", (fields: string[], form: Form) => {
    fields.forEach(name => {
        const field = form.createField({ name });
        field.onMount();
    });
    return listener => listener();
});

const onClearGraph = createEffectHook("clear-graph", (fields: string[], form: Form) => {
    form.clearFormGraph("*");
    form.notify("field-clear");
    return listener => listener();
});

const Mount: FC<PropsWithChildren<MountProps>> = ({ children, fields, form }) => {
    const [mount, setMount] = useState(false);
    const { styles } = useStyles();

    useFormEffects(() => {
        onMountField(() => setMount(true));
        onClearGraph(() => setMount(false));
    });

    return (
        <FormActionContext.Provider value={{ form, mount }}>
            <div className={styles}>
                <Line title="挂载/回收">
                    {mount ? (
                        <button onClick={() => form.notify("clear-graph")}>回收字段</button>
                    ) : (
                        <button onClick={() => form.notify("mount-field", fields)}>挂载字段</button>
                    )}
                </Line>
                {children}
            </div>
        </FormActionContext.Provider>
    );
};

interface FormActionContextInstance {
    form: Form;
    mount: boolean;
}

export interface MountProps extends IProviderProps {
    fields: string[];
}

export { FormActionContext };

export default Mount;
