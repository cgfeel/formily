import { FC } from "react";
import SchemaField from "./SchemaField";

const FieldReact: FC = () => (
    <SchemaField.Object name="react" title="5.1.2.被动联动" x-decorator="VoidComponent">
        <SchemaField.String name="input" title="控制者" x-component="Input" x-decorator="FormItem" />
        <SchemaField.String
            name="input2"
            title="受控者"
            x-component="Input"
            x-decorator="FormItem"
            x-reactions={{
                dependencies: [".input"],
                fulfill: {
                    state: { value: "{{$deps[0]}}" },
                },
            }}
        />
    </SchemaField.Object>
);

export default FieldReact;
