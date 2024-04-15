import { FC } from "react";
import SchemaField from "../SchemaPropertyField";
import SingleSchema from "./SingleSchema";

const SliceSchema: FC = () => (
    <SingleSchema feedbackText="选取数据操作路径的某个片段" name="slice">
        <SchemaField.Number
            name="slice-input"
            title="节点"
            x-component="NumberPicker"
            x-decorator="FormItem"
            x-reactions={{
                dependencies: ["path"],
                when: "{{!$self.value}}",
                fulfill: {
                    state: {
                        initialValue: 1,
                    },
                },
            }}
        />
    </SingleSchema>
);

export default SliceSchema;
