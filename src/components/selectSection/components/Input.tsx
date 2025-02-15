import { isField } from "@formily/core";
import { observer, useField } from "@formily/react";
import { FC } from "react";

const Input: FC = () => {
    const field = useField();
    const data = isField(field) ? field.data : [];

    console.log("a----dataSource", data);
    return !isField(field) ? <></> : <input value={field.value} onChange={e => field.setValue(e.target.value)} />;
};

export default observer(Input);
