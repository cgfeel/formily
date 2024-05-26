import { FC } from "react";
import SchemaField from "./SchemaField";

const BatchReact: FC = () => (
    <SchemaField.Object name="batch-react" title="5.3.2.批量被动联动" x-decorator="VoidComponent">
        <SchemaField.Number
            maximum={10000}
            minimum={0}
            name="price"
            title="单价"
            x-component="NumberPicker"
            x-decorator="FormItem"
        />
        <SchemaField.Number
            maximum={10000}
            minimum={0}
            name="count"
            title="数量"
            x-component="NumberPicker"
            x-decorator="FormItem"
        />
        <SchemaField.Number
            name="total"
            title="总额"
            x-component="NumberPicker"
            x-editable={false}
            x-decorator="FormItem"
            x-reactions={{
                dependencies: [".count", ".price"],
                fulfill: {
                    state: { value: "{{($deps[0] || 0) * ($deps[1] || 0)}}" },
                },
            }}
        />
    </SchemaField.Object>
);

export default BatchReact;
