import { ArrayField } from "@formily/core";
import { RecursionField, useField, useFieldSchema } from "@formily/react";
import { FC } from "react";

const ArrayComponent: FC = () => {
    const field = useField<ArrayField>();
    const schema = useFieldSchema();

    const items = schema.items;
    return items === undefined ? null : (
        <div>
            {field.value.map((_, index) => (
                <RecursionField schema={Array.isArray(items) ? items[0] : items} key={index} name={index} />
            ))}
        </div>
    );
};

export default ArrayComponent;
